import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SkillEditor from "@/components/skill/SkillEditor";
import VersionTimeline from "@/components/skill/VersionTimeline";
import ExportPanel from "@/components/skill/ExportPanel";

export default async function SkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: skill } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (!skill) redirect("/dashboard");

  const { data: connectors } = await supabase
    .from("skill_connectors")
    .select("connector_key")
    .eq("skill_id", id);

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="font-mono text-sm font-bold text-white"
        >
          skill<span className="text-[#c8f040]">008</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#c8f040] mb-2">
            // Skill
          </p>
          <h1 className="text-2xl font-bold text-white">{skill.title}</h1>
          {skill.vertical && (
            <span className="inline-block mt-2 text-xs font-mono uppercase tracking-wider text-[#c8f040] bg-[#c8f040]/10 px-2 py-0.5 rounded">
              {skill.vertical}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main editor */}
          <div className="lg:col-span-2">
            <SkillEditor skill={skill} connectors={connectors || []} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ExportPanel skillId={id} />
            <VersionTimeline skillId={id} />
          </div>
        </div>
      </main>
    </div>
  );
}
