import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { SkillGlyph, HarnessGlyph, McpGlyph } from "@/components/landing/LearnArt";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Skill008",
  description:
    "Why we built Skill008: turn the work you repeat into a short, portable guide your AI can run, without giving up your passwords or your data.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Skill008",
    description:
      "Turn the work you repeat into a short, portable guide your AI can run.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const beliefs = [
  {
    Glyph: SkillGlyph,
    title: "Plain words beat code",
    body: "If you can explain a task to a new hire, you can make it a skill. No scripting, no setup, no jargon to learn first.",
  },
  {
    Glyph: HarnessGlyph,
    title: "Your tools, not ours",
    body: "A skill runs inside the AI app you already use. We do not host your assistant or sit in the middle of your work.",
  },
  {
    Glyph: McpGlyph,
    title: "Portable on purpose",
    body: "A skill is a text file. Take it to a different model, share it with a teammate, keep it when the tools change.",
  },
];

const audience = [
  "Revenue and ops teams keeping the CRM honest",
  "Founders and chiefs of staff clearing the inbox",
  "Trades and field service crews chasing quotes and invoices",
  "Social media managers turning notes into posts",
  "Job seekers tailoring resumes and outreach",
  "Teachers getting their evenings back",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Why we built this
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          Software should learn how you work.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
          Your AI assistant is like a sharp new hire. Eager and quick, but it
          does not know how you do things yet. Most people retype the same
          context every single time, and the assistant forgets it the moment the
          chat ends.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
          Skill008 writes the one-page training note that turns smart into
          actually helpful. You show a task once, we turn it into a short guide,
          and your assistant runs it the same way from then on.
        </p>

        {/* Beliefs */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-extrabold">
            What we believe
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
              >
                <b.Glyph className="h-7 w-7 text-[#C9512C]" />
                <h3 className="mt-3 font-heading text-base font-bold">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy stance */}
        <section className="mt-14 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-2xl font-extrabold">
            Where we stand on your data
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            We never store your passwords, your files, or your screenshots. When
            you connect a tool, the access lives between your assistant and that
            app, not with us. You can start read-only and stay in control of
            every step. That is the whole posture, and it is not going to
            change.
          </p>
          <Link
            href="/privacy"
            className="mt-4 inline-block text-sm font-semibold text-[#C9512C] hover:underline"
          >
            Read the privacy page →
          </Link>
        </section>

        {/* Audience */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-extrabold">Who it is for</h2>
          <p className="mt-2 text-[15px] text-[#6E685D]">
            Anyone who keeps redoing the same task. A few examples:
          </p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {audience.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2.5 rounded-xl border border-[#E7DFCD] bg-white px-4 py-3 text-sm text-[#56514a]"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5B62B]" />
                {a}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-[#E7DFCD] bg-white p-6 text-center shadow-sm md:p-8">
          <h2 className="font-heading text-2xl font-extrabold">
            Make your first skill.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6E685D]">
            It is free to start, and it takes about two minutes.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#F5B62B] px-5 py-2.5 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make a skill
            </Link>
            <Link
              href="/learn"
              className="rounded-lg border border-[#E7DFCD] bg-white px-5 py-2.5 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#F5B62B]"
            >
              How it works
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
