import Link from "next/link";
import {
  LearnNav,
  CompareBar,
  ConceptRead,
  LearnFooter,
} from "@/components/landing/LearnShared";

export const metadata = {
  title: "Everything on one page · Skill008",
  description:
    "The one page version. The two minute concept and the full setup, all laid out top to bottom. Scroll once and you have it.",
};

const assistants = [
  {
    name: "ChatGPT",
    by: "OpenAI",
    blurb: "Easiest place to start. Works in your browser and on your phone.",
    where: "chatgpt.com",
    href: "https://chatgpt.com",
  },
  {
    name: "Claude",
    by: "Anthropic",
    blurb: "Great with documents and longer, careful tasks.",
    where: "claude.ai",
    href: "https://claude.ai",
  },
  {
    name: "Copilot",
    by: "Microsoft and GitHub",
    blurb: "Often already built into the work tools your job uses.",
    where: "copilot.microsoft.com",
    href: "https://copilot.microsoft.com",
  },
  {
    name: "Cursor",
    by: "Anysphere",
    blurb: "Hands on, made for people who work in code. Not the place to start.",
    where: "cursor.com",
    href: "https://cursor.com",
  },
];

const setupSteps = [
  {
    t: "Make a free account",
    d: "Pick one of the assistants above and sign up with your email or your Google or Microsoft login. That account is your token. The free version is plenty to start.",
  },
  {
    t: "Find the instructions spot",
    d: "This is where your skill goes. ChatGPT or Claude: make a Project and paste the skill into its instructions. Copilot: paste it at the top of a new chat. Works everywhere: open a new chat, paste the whole skill, and say follow this.",
  },
  {
    t: "Hand it the skill",
    d: "Open the skill you made here, copy the whole thing, and paste it in. That pasted guide is the welcome guide your assistant follows.",
  },
  {
    t: "Give it a real task",
    d: "Now just ask. Try okay, do this for today. It follows the guide you gave it, step by step. If something is off, tweak the skill and paste it again.",
  },
];

const safety = [
  "On your own laptop, you make the rules. Add a connector, sign in, done.",
  "On a work machine, check with IT before connecting work email, your CRM, or company files.",
  "Only add connectors from a name you trust, and start read only where you can.",
];

export default function OnePageLearnPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <LearnNav />
      <CompareBar active="onepage" />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <ConceptRead />

        {/* Setup, all inline */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            The whole setup
          </p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold">
            Everything to get going, on one page
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            No clicking around. Pick an assistant, follow the four steps, and
            connect your tools only if you want to. It is all right here.
          </p>
        </section>

        {/* Pick an assistant */}
        <section className="mt-12">
          <h3 className="font-heading text-xl font-extrabold">
            First, pick your assistant
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#56514a]">
            Any of these work. They all run the same skill you make here. If you
            already have one through work, use that.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {assistants.map((o) => (
              <a
                key={o.name}
                href={o.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-[#E7DFCD] bg-white p-5 shadow-sm transition-colors hover:border-[#F5B62B]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-heading text-lg font-bold">{o.name}</h4>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                    by {o.by}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                  {o.blurb}
                </p>
                <p className="mt-3 font-mono text-xs text-[#C9512C]">
                  Go to {o.where}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Setup steps */}
        <section className="mt-12">
          <h3 className="font-heading text-xl font-extrabold">Then, set it up</h3>
          <div className="mt-6 space-y-6">
            {setupSteps.map((s, i) => (
              <div key={s.t} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F5B62B] font-heading text-lg font-extrabold">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h4 className="font-heading text-lg font-bold">{s.t}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#6E685D]">
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-[#E7DFCD] bg-[#FBEFD0] px-5 py-4">
            <p className="text-sm leading-relaxed text-[#56514a]">
              <span className="font-semibold text-[#20201E]">
                Want the long version?
              </span>{" "}
              The full harness walkthrough lives{" "}
              <Link
                href="/learn/harness"
                className="font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
              >
                here
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Connect tools */}
        <section className="mt-12">
          <h3 className="font-heading text-xl font-extrabold">
            Optional: connect your tools
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#56514a]">
            You can make and use a skill without connecting a single tool. When
            you are ready, MCP is the adapter that lets your assistant reach your
            email, calendar, or CRM.
          </p>
          <ul className="mt-5 space-y-2.5">
            {safety.map((s) => (
              <li key={s} className="flex gap-2 text-sm leading-relaxed text-[#56514a]">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F5B62B]" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-[#E7DFCD] bg-white p-5 font-mono text-sm leading-relaxed text-[#20201E] shadow-sm">
            Hi, I would like to connect an AI assistant to ______ using an MCP
            server, so it can help me with a repeating task. Is that allowed, and
            if so, is there an approved way to set it up?
          </div>
          <p className="mt-3 text-sm text-[#56514a]">
            See the full{" "}
            <Link
              href="/learn/mcp"
              className="font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
            >
              safety guide
            </Link>{" "}
            or browse the{" "}
            <Link
              href="/connect"
              className="font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
            >
              directory of common connectors
            </Link>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-[#E7DFCD] bg-white p-8 text-center shadow-sm">
          <h2 className="font-heading text-2xl font-extrabold">
            That&apos;s everything.
          </h2>
          <p className="mt-2 text-[#56514a]">
            Prefer to be walked through it one step at a time?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make your first skill
            </Link>
            <Link
              href="/learn/guided"
              className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              Try the guided version
            </Link>
          </div>
        </section>
      </main>

      <LearnFooter />
    </div>
  );
}
