import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Download a skill's SKILL.md. Owners get a short-lived signed URL straight
// from the skill-exports Storage bucket (exercising Storage + RLS); for anyone
// else, or before the file exists, we stream the stored markdown directly.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("skills")
    .select("id, owner_id, title, base_content, visibility, is_starter")
    .eq("id", id)
    .single();

  if (!skill) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  const slug =
    skill.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "skill";

  const path = `${skill.owner_id}/${skill.id}.md`;
  const { data: signed } = await supabase.storage
    .from("skill-exports")
    .createSignedUrl(path, 60, { download: `${slug}.md` });

  if (signed?.signedUrl) {
    return NextResponse.redirect(signed.signedUrl);
  }

  return new NextResponse(skill.base_content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.md"`,
    },
  });
}
