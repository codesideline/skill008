import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  let user = null;
  let skills: Array<{ id: string; title: string; vertical: string | null; revisions_used: number; revision_quota: number; updated_at: string }> | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user;

    if (!user) redirect("/auth/login");

    const { data: skillsData } = await supabase
      .from("skills")
      .select("*")
      .eq("owner_id", user.id)
      .order("updated_at", { ascending: false });
    skills = skillsData;
  } catch {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Top bar */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-mono text-sm font-bold text-white">
          skill<span className="text-[#c8f040]">008</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/gallery" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Gallery
          </Link>
          <span className="text-xs text-zinc-600">{user.email}</span>
          <form action="/auth/signout" method="POST">
            <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-white">Your skills</h1>
          <Link
            href="/skill/new"
            className="bg-[#c8f040] text-[#0a0a0c] font-semibold px-4 py-2 rounded text-sm hover:bg-[#a0c030] transition-colors"
          >
            New skill
          </Link>
        </div>

        {!skills || skills.length === 0 ? (
          <div className="bg-[#141418] border border-zinc-800 rounded-lg p-12 text-center">
            <p className="text-zinc-400 mb-2">No skills yet.</p>
            <p className="text-sm text-zinc-600 mb-6">
              Describe a task or upload a screenshot to create your first skill.
            </p>
            <Link
              href="/skill/new"
              className="inline-block bg-[#c8f040] text-[#0a0a0c] font-semibold px-5 py-2.5 rounded text-sm hover:bg-[#a0c030] transition-colors"
            >
              Make your first skill
            </Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {skills.map((skill) => (
              <Link
                key={skill.id}
                href={`/skill/${skill.id}`}
                className="bg-[#141418] border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors block"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{skill.title}</h3>
                    {skill.vertical && (
                      <span className="inline-block mt-1 text-xs font-mono uppercase tracking-wider text-[#c8f040] bg-[#c8f040]/10 px-2 py-0.5 rounded">
                        {skill.vertical}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-600">
                      v{skill.revisions_used + 1} / {skill.revision_quota} revisions
                    </p>
                    <p className="text-xs text-zinc-700 mt-0.5">
                      {new Date(skill.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
