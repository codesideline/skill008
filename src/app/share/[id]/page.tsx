import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ShareActions } from "@/components/skill/ShareActions";

export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (!skill || skill.visibility === "private") {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <p className="text-zinc-400">Skill not found or is private.</p>
      </div>
    );
  }

  const { data: connectors } = await supabase
    .from("skill_connectors")
    .select("connector_key")
    .eq("skill_id", id);

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold text-white">
          skill<span className="text-[#c8f040]">008</span>
        </Link>
        <Link
          href="/auth/login"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Sign in to fork
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[#c8f040] mb-2">
            // Shared skill
          </p>
          <h1 className="text-2xl font-bold text-white">{skill.title}</h1>
          {skill.vertical && (
            <span className="inline-block mt-2 text-xs font-mono uppercase tracking-wider text-[#c8f040] bg-[#c8f040]/10 px-2 py-0.5 rounded">
              {skill.vertical}
            </span>
          )}
        </div>

        {/* Connectors */}
        {connectors && connectors.length > 0 && (
          <div className="flex items-center gap-2 mb-6 px-4 py-2.5 bg-[#141418] border border-zinc-800 rounded-lg">
            <span className="text-xs text-zinc-500">Needs in your harness:</span>
            {connectors.map((c) => (
              <span
                key={c.connector_key}
                className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded"
              >
                {c.connector_key}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="bg-[#141418] border border-zinc-800 rounded-lg p-6 mb-6">
          <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
            {skill.base_content}
          </pre>
        </div>

        {/* Actions */}
        <ShareActions content={skill.base_content} title={skill.title} />

        <p className="text-xs text-zinc-700 mt-6">
          Skills are only as good as the data and access behind them. If a
          connector is missing or your CRM fields are messy, the results will be
          too.
        </p>
      </main>
    </div>
  );
}

// Client-side buttons are in a separate component below
