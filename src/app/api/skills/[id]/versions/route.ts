import { createClient } from "@/lib/supabase/server";
import { generateChangelog } from "@/lib/generate";
import { scanForSecrets } from "@/lib/secret-scan";
import { NextResponse } from "next/server";

// POST /api/skills/[id]/versions - save a new version
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get current skill
  const { data: skill } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single();

  if (!skill) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  // Check revision quota
  if (skill.revisions_used >= skill.revision_quota) {
    return NextResponse.json(
      { error: "Revision quota exhausted. Purchase more revisions." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { content, structured_json, note } = body;

  if (!content) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  // Secret scan
  const scan = scanForSecrets(content);
  if (!scan.passed) {
    return NextResponse.json(
      { error: "Secret detected. Cannot save." },
      { status: 422 }
    );
  }

  // Generate plain-English changelog
  let changelog = "";
  try {
    changelog = await generateChangelog(skill.base_content, content);
  } catch {
    changelog = note || "Updated skill content.";
  }

  // Get next version number
  const { data: versions } = await supabase
    .from("skill_versions")
    .select("version_no")
    .eq("skill_id", id)
    .order("version_no", { ascending: false })
    .limit(1);

  const nextVersion = (versions?.[0]?.version_no || 0) + 1;

  // Insert new version
  const { data: version, error: versionError } = await supabase
    .from("skill_versions")
    .insert({
      skill_id: id,
      version_no: nextVersion,
      content,
      structured_json,
      note,
      plain_english_changelog: changelog,
    })
    .select()
    .single();

  if (versionError) {
    return NextResponse.json({ error: versionError.message }, { status: 500 });
  }

  // Update skill base content and increment revisions_used
  await supabase
    .from("skills")
    .update({
      base_content: content,
      structured_json,
      revisions_used: skill.revisions_used + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  return NextResponse.json({ version });
}

// GET /api/skills/[id]/versions - list versions
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: versions, error } = await supabase
    .from("skill_versions")
    .select("*")
    .eq("skill_id", id)
    .order("version_no", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ versions });
}
