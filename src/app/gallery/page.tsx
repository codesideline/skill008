import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("is_starter", true)
    .order("vertical", { ascending: true });

  const crmSkills = skills?.filter((s) => s.vertical === "crm") || [];
  const cosSkills = skills?.filter((s) => s.vertical === "chief_of_staff") || [];

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold text-white">
          skill<span className="text-[#c8f040]">008</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/auth/login"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[#c8f040] mb-2">
            // Gallery
          </p>
          <h1 className="text-3xl font-bold text-white mb-3">Starter packs</h1>
          <p className="text-zinc-400">
            Grab a ready-made skill and have your assistant doing real work in
            minutes. Free, no setup.
          </p>
        </div>

        {/* CRM Pack */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-1">CRM Pack</h2>
          <p className="text-sm text-zinc-500 mb-4">
            Sales pipeline hygiene, automated.
          </p>
          {crmSkills.length > 0 ? (
            <div className="space-y-3">
              {crmSkills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/share/${skill.id}`}
                  className="block bg-[#141418] border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors"
                >
                  <h3 className="text-white font-medium">{skill.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {skill.structured_json?.goal || ""}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#141418] border border-zinc-800 rounded-lg p-8 text-center">
              <p className="text-zinc-500 text-sm">
                CRM starter skills will appear here once seeded.
              </p>
            </div>
          )}
        </section>

        {/* Chief of Staff Pack */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-1">
            Chief of Staff Pack
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            Inbox, calendar, and follow-ups handled.
          </p>
          {cosSkills.length > 0 ? (
            <div className="space-y-3">
              {cosSkills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/share/${skill.id}`}
                  className="block bg-[#141418] border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors"
                >
                  <h3 className="text-white font-medium">{skill.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {skill.structured_json?.goal || ""}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#141418] border border-zinc-800 rounded-lg p-8 text-center">
              <p className="text-zinc-500 text-sm">
                Chief of Staff starter skills will appear here once seeded.
              </p>
            </div>
          )}
        </section>

        <p className="text-xs text-zinc-600 italic">
          Everything drafts or surfaces. Nothing sends, deletes, or changes a
          record without you.
        </p>
      </main>
    </div>
  );
}
