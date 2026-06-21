import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { SalesforceLogo, HubSpotLogo } from "@/components/landing/Doodles";
import { ClipboardDoodle, CompassDoodle } from "@/components/landing/GalleryArt";

type Curated = { title: string; goal: string };

const fallbackCrm: Curated[] = [
  {
    title: "Catch deals going quiet",
    goal: "Flag open opportunities with no activity in two weeks, before they slip.",
  },
  {
    title: "Fix the missing fields",
    goal: "Find records missing an amount, close date, or stage, and list what to clean up.",
  },
  {
    title: "Monday pipeline summary",
    goal: "What moved, what stalled, and what needs a nudge, ready before the standup.",
  },
  {
    title: "Notes to the right deal",
    goal: "Turn a meeting note into a tidy activity logged on the matching record.",
  },
];

const fallbackCos: Curated[] = [
  {
    title: "Sort my inbox before 9am",
    goal: "Group overnight email into reply now, read later, and ignore.",
  },
  {
    title: "Meeting notes to action items",
    goal: "Pull the owners and the due dates out of messy notes, nothing forgotten.",
  },
  {
    title: "Chase the follow-ups I owe",
    goal: "Resurface the promises I made over the last week so none go cold.",
  },
  {
    title: "My week in a status update",
    goal: "Draft a short update from my sent mail and calendar, in my voice.",
  },
];

const careerCoach: Curated[] = [
  {
    title: "Tell my story straight",
    goal: "Turn my experience into a clear story I can use in interviews and intros, not just a resume.",
  },
  {
    title: "Prep me for this interview",
    goal: "Research the role, line up the likely questions, and practice answers in my voice.",
  },
  {
    title: "A soft landing after a layoff",
    goal: "A steady next-steps plan, plus a kind note to let my network know I am looking.",
  },
  {
    title: "Reconnect without the cringe",
    goal: "Draft warm, genuine notes to people I have lost touch with, no awkward ask.",
  },
  {
    title: "Make the case for a raise",
    goal: "Gather my wins and turn them into calm talking points for the conversation.",
  },
  {
    title: "Land the first 90 days",
    goal: "A simple 30, 60, 90 plan for once the offer is signed.",
  },
];

function CuratedGrid({ items }: { items: Curated[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((s) => (
        <Link
          key={s.title}
          href="/auth/login"
          className="group block rounded-xl border border-[#E7DFCD] bg-white p-5 shadow-sm transition-colors hover:border-[#F5B62B]"
        >
          <h3 className="font-semibold">{s.title}</h3>
          <p className="mt-1 text-sm text-[#6E685D]">{s.goal}</p>
          <p className="mt-3 font-mono text-xs text-[#C9512C] opacity-0 transition-opacity group-hover:opacity-100">
            Make this one &rarr;
          </p>
        </Link>
      ))}
    </div>
  );
}

export default async function GalleryPage() {
  let crmSkills: Array<{ id: string; title: string; structured_json: { goal?: string } | null }> = [];
  let cosSkills: Array<{ id: string; title: string; structured_json: { goal?: string } | null }> = [];

  try {
    const supabase = await createClient();
    const { data: skills } = await supabase
      .from("skills")
      .select("*")
      .eq("is_starter", true)
      .order("vertical", { ascending: true });

    crmSkills = skills?.filter((s) => s.vertical === "crm") || [];
    cosSkills = skills?.filter((s) => s.vertical === "chief_of_staff") || [];
  } catch {
    // Supabase not connected yet - curated starters below fill in
  }

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            Free starter packs
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight">
            Borrow one we already made.
          </h1>
          <p className="mt-3 max-w-xl text-lg text-[#56514a]">
            Grab a ready-made skill and have your AI doing real work in minutes.
            Free, no setup, no account needed to look.
          </p>
        </div>

        {/* CRM Pack */}
        <section className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <SalesforceLogo className="h-6 w-6" />
            <HubSpotLogo className="h-5 w-5" />
            <div>
              <h2 className="font-heading text-xl font-bold">CRM Pack</h2>
              <p className="text-sm text-[#6E685D]">
                Sales pipeline hygiene, on autopilot.
              </p>
            </div>
          </div>
          {crmSkills.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {crmSkills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/share/${skill.id}`}
                  className="block rounded-xl border border-[#E7DFCD] bg-white p-5 shadow-sm transition-colors hover:border-[#F5B62B]"
                >
                  <h3 className="font-semibold">{skill.title}</h3>
                  <p className="mt-1 text-sm text-[#6E685D]">
                    {skill.structured_json?.goal || ""}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <CuratedGrid items={fallbackCrm} />
          )}
        </section>

        {/* Chief of Staff Pack */}
        <section className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <ClipboardDoodle className="h-7 w-7 text-[#C9512C]" />
            <div>
              <h2 className="font-heading text-xl font-bold">Chief of Staff Pack</h2>
              <p className="text-sm text-[#6E685D]">
                Inbox, calendar, and follow-ups handled.
              </p>
            </div>
          </div>
          {cosSkills.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {cosSkills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/share/${skill.id}`}
                  className="block rounded-xl border border-[#E7DFCD] bg-white p-5 shadow-sm transition-colors hover:border-[#F5B62B]"
                >
                  <h3 className="font-semibold">{skill.title}</h3>
                  <p className="mt-1 text-sm text-[#6E685D]">
                    {skill.structured_json?.goal || ""}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <CuratedGrid items={fallbackCos} />
          )}
        </section>

        {/* Career Coach Pack */}
        <section className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <CompassDoodle className="h-7 w-7 text-[#C9512C]" />
            <div>
              <h2 className="font-heading text-xl font-bold">Career Coach Pack</h2>
              <p className="text-sm text-[#6E685D]">
                In your corner, not just a resume builder.
              </p>
            </div>
          </div>
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-[#56514a]">
            Leveling up, switching lanes, or hit by a layoff? This one helps with
            the whole thing, the story, the outreach, the prep, and the steady
            next step, not only the document.
          </p>
          <CuratedGrid items={careerCoach} />
        </section>

        <p className="text-xs italic text-[#8a8478]">
          Everything drafts or surfaces. Nothing sends, deletes, or changes a
          record without you.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
