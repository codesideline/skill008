import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { CompareBar } from "@/components/landing/LearnShared";
import {
  SkillFlowDiagram,
  SpeechDoodle,
  GuideDoodle,
  SkillGlyph,
  HarnessGlyph,
  McpGlyph,
} from "@/components/landing/LearnArt";

const glossary = [
  {
    term: "Harness",
    plain: "Just the AI app you already use. Copilot, Claude, ChatGPT, Cursor. Your harness is wherever your assistant lives.",
    href: "/learn/harness",
    linkText: "Don't have one yet? Let's get you a harness",
  },
  {
    term: "Bring your own key (BYOK)",
    plain: "You use your own AI account. We never hold your login or your password. The skill runs on your side, with your access, not ours.",
  },
  {
    term: "Skill",
    plain: "The welcome guide. A short file that tells your AI exactly how you do one specific task, so you never have to explain it again.",
  },
  {
    term: "Agent",
    plain: "Your AI once it has the guide. Same assistant you already have, except now it actually knows your job.",
  },
  {
    term: "MCP",
    plain: "A common way for your assistant to plug into your other apps, like your email, your calendar, or your CRM. Think of it as a universal adapter: one standard plug instead of a special cable for every app.",
    href: "/learn/mcp",
    linkText: "Setting one up? Read this first",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      {/* Nav */}
      <SiteNav />

      <CompareBar active="original" />

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Intro */}
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Start here
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          What is this, really?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
          Two minutes, no jargon. By the end you will know exactly when Skill008
          helps you, and when it does not. Here ya go.
        </p>

        {/* Hero diagram */}
        <figure className="mt-10 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm md:p-8">
          <SkillFlowDiagram className="mx-auto h-auto w-full max-w-xl" />
          <figcaption className="mt-4 text-center text-sm leading-relaxed text-[#6E685D]">
            That is the whole thing. A task you keep doing turns into a short
            written guide, and the AI you already use follows it.
          </figcaption>
        </figure>

        {/* Three words quick strip */}
        <section className="mt-10 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8a8478]">
            The only three words you might bump into
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            <div>
              <HarnessGlyph className="h-7 w-7 text-[#C9512C]" />
              <h3 className="mt-2 font-heading text-base font-bold">Harness</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6E685D]">
                Where your assistant lives. The AI app you use.
              </p>
            </div>
            <div>
              <SkillGlyph className="h-7 w-7 text-[#C9512C]" />
              <h3 className="mt-2 font-heading text-base font-bold">Skill</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6E685D]">
                The welcome guide. What to do, written once.
              </p>
            </div>
            <div>
              <McpGlyph className="h-7 w-7 text-[#C9512C]" />
              <h3 className="mt-2 font-heading text-base font-bold">MCP</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6E685D]">
                The universal adapter. How it plugs into your apps.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-[#56514a]">
            We explain each one in plain English below. No test at the end.
          </p>
        </section>

        {/* The Airbnb test */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-extrabold">The Airbnb test</h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            The easiest way to know if something should be a skill: would you
            write it down for someone else?
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm">
              <SpeechDoodle className="h-9 w-9 text-[#b8b2a4]" />
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                A friend crashes one night
              </p>
              <h3 className="mt-2 font-heading text-xl font-bold">
                You just tell them the wifi.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                It happens once. You say it out loud and move on. No guide
                needed. That is a one off.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-6 shadow-sm">
              <GuideDoodle className="h-9 w-9 text-[#C9512C]" />
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                You run an Airbnb
              </p>
              <h3 className="mt-2 font-heading text-xl font-bold">
                You print a welcome guide.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                Wifi, trash day, how the coffee maker works. You write it once so
                you never reexplain it. That is a skill.
              </p>
            </div>
          </div>
          <p className="mt-6 text-lg font-medium">
            If you keep explaining the same task to your AI, that is your welcome
            guide waiting to be written.
          </p>
        </section>

        {/* When you need one */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold">
            So when do you actually need one?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#b8b2a4]" />
                <p className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                  One off stuff, skip it
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[#56514a]">
                <li>Quick research you will only do once</li>
                <li>&ldquo;Summarize this one email&rdquo;</li>
                <li>&ldquo;What does this word mean?&rdquo;</li>
                <li>Anything you will not ask twice</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F5B62B]" />
                <p className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                  Repeatable tasks, make a skill
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[#56514a]">
                <li>The report your boss asks for every Monday</li>
                <li>Sorting your inbox the same way each morning</li>
                <li>Flagging every invoice over $5,000</li>
                <li>Chasing the follow ups you always forget</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-[#E7DFCD] bg-[#FBEFD0] px-5 py-4">
            <p className="text-center font-medium">
              Repeatable + predictable + you don&apos;t want to reexplain it ={" "}
              <span className="text-[#C9512C]">make it a skill.</span>
            </p>
          </div>
        </section>

        {/* Glossary */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold">
            The words people throw around
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            You might hear these. Here is what they actually mean.
          </p>
          <div className="mt-6 space-y-3">
            {glossary.map((g) => (
              <div
                key={g.term}
                className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-lg font-bold">{g.term}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6E685D]">
                  {g.plain}
                </p>
                {g.href && (
                  <Link
                    href={g.href}
                    className="mt-3 inline-block font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
                  >
                    {g.linkText} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Get a harness callout */}
        <section className="mt-10 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-7 text-center">
          <h2 className="font-heading text-xl font-extrabold">
            No assistant yet? That&apos;s the only thing you need.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#56514a]">
            Getting a harness just means making an account at one of these
            places. We will walk you through it, step by step.
          </p>
          <Link
            href="/learn/harness"
            className="mt-5 inline-block rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
          >
            Let&apos;s get you a harness
          </Link>
        </section>

        {/* How a skill gets made */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold">
            And making one is easy
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                n: "1",
                t: "Show it once",
                d: "Type what you do, drop in a screenshot, or record your screen while you do it.",
              },
              {
                n: "2",
                t: "Check it reads right",
                d: "We say the steps back in plain English. You fix anything that is off.",
              },
              {
                n: "3",
                t: "Hand it to your AI",
                d: "You get a tidy guide. Give it to the assistant you already use, and it runs.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F5B62B] font-heading text-lg font-extrabold">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">{s.t}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#6E685D]">
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-[#E7DFCD] bg-white p-8 text-center shadow-sm">
          <h2 className="font-heading text-2xl font-extrabold">
            That&apos;s the whole idea.
          </h2>
          <p className="mt-2 text-[#56514a]">
            Ready to write your first welcome guide?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make your first skill
            </Link>
            <Link
              href="/gallery"
              className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              See the examples
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
