import { createClient } from "@/lib/supabase/server";
import { scanForSecrets } from "@/lib/secret-scan";
import { isQuotaError } from "@/lib/quota";
import { NextResponse } from "next/server";

// POST /api/skills - save a confirmed skill
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, base_content, structured_json, connectors, vertical } = body;

  if (!title || !base_content) {
    return NextResponse.json(
      { error: "Title and content required" },
      { status: 400 }
    );
  }

  // Final secret scan
  const scan = scanForSecrets(base_content);
  if (!scan.passed) {
    return NextResponse.json(
      { error: "Secret detected. Cannot save." },
      { status: 422 }
    );
  }

  // Determine quota
  const isWorkEmail = !user.email?.match(
    /@(gmail|yahoo|hotmail|outlook|aol|icloud|protonmail|mail)\./i
  );
  const revision_quota = isWorkEmail ? 5 : 3;

  // Insert skill
  const { data: skill, error: skillError } = await supabase
    .from("skills")
    .insert({
      owner_id: user.id,
      title,
      vertical: vertical || null,
      base_content,
      structured_json,
      revision_quota,
    })
    .select()
    .single();

  if (skillError) {
    // The quota trigger raises this when the free limit is reached.
    if (isQuotaError(skillError.message)) {
      return NextResponse.json(
        {
          error:
            "Free skill limit reached. Purchase additional skills for $7 each.",
        },
        { status: 403 },
      );
    }
    return NextResponse.json({ error: skillError.message }, { status: 500 });
  }

  // Insert first version
  await supabase.from("skill_versions").insert({
    skill_id: skill.id,
    version_no: 1,
    content: base_content,
    structured_json,
    note: "Initial generation",
    plain_english_changelog: "Skill created from scratch.",
  });

  // Insert connectors
  if (connectors && connectors.length > 0) {
    const connectorRows = connectors.map((key: string) => ({
      skill_id: skill.id,
      connector_key: key,
    }));
    await supabase.from("skill_connectors").insert(connectorRows);
  }

  // Store capture metadata (never raw image)
  await supabase.from("captures").insert({
    owner_id: user.id,
    input_type: body.input_type || "description",
    sanitized_trace: { description: body.original_input?.substring(0, 500) },
    observed_apps: connectors || [],
    secret_scan_passed: true,
  });

  // Persist a downloadable SKILL.md to Storage (owner-scoped, served later via
  // signed URLs). Best-effort: the bucket may not exist before the migration.
  try {
    await supabase.storage
      .from("skill-exports")
      .upload(`${user.id}/${skill.id}.md`, base_content, {
        upsert: true,
        contentType: "text/markdown",
      });
  } catch {
    // skill is already saved; the export file is a convenience
  }

  // Embed the skill so it can surface in semantic search once made public.
  try {
    const embedText = [title, structured_json?.goal, structured_json?.criteria]
      .filter(Boolean)
      .join("\n");
    const { data: emb } = await supabase.functions.invoke("embed", {
      body: { text: embedText },
    });
    if (emb?.embedding) {
      await supabase
        .from("skills")
        .update({ embedding: emb.embedding })
        .eq("id", skill.id);
    }
  } catch {
    // embedding is best-effort; search simply won't include this skill yet
  }

  return NextResponse.json({ skill });
}
