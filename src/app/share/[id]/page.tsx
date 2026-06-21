import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteChrome";
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
      <div className="flex min-h-screen items-center justify-center bg-[#F7F3E9]">
        <p className="text-[#6E685D]">Skill not found or is private.</p>
      </div>
    );
  }

  const { data: connectors } = await supabase
    .from("skill_connectors")
    .select("connector_key")
    .eq("skill_id", id);

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E7DFCD] bg-[#F7F3E9]/85 px-6 py-4 backdrop-blur-md">
        <Link href="/" className="font-mono text-base font-bold tracking-tight">
          skill<span className="ml-0.5 rounded bg-[#F5B62B] px-1 text-[#20201E]">008</span>
        </Link>
        <Link
          href="/auth/login"
          className="text-sm text-[#6E685D] transition-colors hover:text-[#20201E]"
        >
          Sign in to fork
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            Shared skill
          </p>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight">
            {skill.title}
          </h1>
          {skill.vertical && (
            <span className="mt-2 inline-block rounded bg-[#FBEFD0] px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-[#C9512C]">
              {skill.vertical}
            </span>
          )}
        </div>

        {/* Connectors */}
        {connectors && connectors.length > 0 && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-[#E7DFCD] bg-white px-4 py-2.5">
            <span className="text-xs text-[#8a8478]">Needs in your AI:</span>
            {connectors.map((c) => (
              <span
                key={c.connector_key}
                className="rounded bg-[#EFE9DB] px-2 py-0.5 font-mono text-xs text-[#56514a]"
              >
                {c.connector_key}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="mb-6 rounded-xl border border-[#E7DFCD] bg-white p-6 shadow-sm">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-[#3a3631]">
            {skill.base_content}
          </pre>
        </div>

        {/* Actions */}
        <ShareActions content={skill.base_content} title={skill.title} />

        <p className="mt-6 text-xs text-[#8a8478]">
          Skills are only as good as the data and access behind them. If a
          connector is missing or your CRM fields are messy, the results will be
          too.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

// Client-side buttons are in a separate component below
