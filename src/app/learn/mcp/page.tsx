import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { AdapterDiagram, HouseDoodle, OfficeDoodle, RouteWander, RouteSet } from "@/components/landing/McpArt";

const cautions = [
  "Only add connectors from a name you trust. A bad one can read whatever you connect it to.",
  "Read what it asks for before you say yes. It will tell you what it wants to access.",
  "Start read-only where you can. Let it look before you let it change things.",
  "Do not connect anything you would be upset to see leave your computer.",
];

const checkAllowed = [
  "Look up your company's acceptable use or IT security policy. It is usually on the intranet or in the employee handbook.",
  "Ask IT or your security team directly. A short message is enough, template below.",
  "Check for an approved tools list. Many companies keep one, and some have a request form.",
  "When in doubt, treat it as a no until you hear yes. Start with public info or your own files, not company data.",
];

export default function McpPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      {/* Nav */}
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Intro */}
        <Link
          href="/learn"
          className="font-mono text-xs text-[#6E685D] transition-colors hover:text-[#20201E]"
        >
          &larr; Back to How it works
        </Link>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Tutorial, MCP
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          Connecting your tools, safely
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
          MCP is the universal adapter that lets your assistant reach your other
          apps, like your email, your calendar, or your CRM. Setting it up is
          not hard. How careful you need to be depends on whose computer you are
          on.
        </p>

        {/* Diagram */}
        <figure className="mt-10 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm md:p-8">
          <AdapterDiagram className="mx-auto h-auto w-full max-w-xl" />
          <figcaption className="mt-5 text-center text-sm leading-relaxed text-[#6E685D]">
            One adapter. Your assistant reaches all your apps through it, instead
            of a different setup for every single one.
          </figcaption>
        </figure>

        {/* Commute analogy */}
        <section className="mt-14">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            A way to picture it
          </p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight md:text-3xl">
            Still feels abstract? Think of your commute.
          </h2>

          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#56514a]">
            <p>
              The first time you drive somewhere new with no map, you feel your
              way there. You stop for directions, double back, and hope you read
              the signs right. That is an assistant with no MCP server: it works
              out how to reach your tools from scratch every time, and it does
              not always land the same way.
            </p>
            <p>
              Your drive to work is the opposite. You know the route and the
              backup for when traffic hits. You know the speed limits and the
              spots where people get caught. Nothing is a surprise, because it
              was settled long ago.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <figure className="rounded-2xl border border-[#E7DFCD] bg-white p-5 shadow-sm">
              <RouteWander className="h-auto w-full" />
              <figcaption className="mt-3 text-sm leading-relaxed text-[#6E685D]">
                <span className="font-semibold text-[#20201E]">No map.</span>{" "}
                Feel it out and ask at every turn. A little different each time.
              </figcaption>
            </figure>
            <figure className="rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-5 shadow-sm">
              <RouteSet className="h-auto w-full" />
              <figcaption className="mt-3 text-sm leading-relaxed text-[#6E685D]">
                <span className="font-semibold text-[#20201E]">
                  Your commute.
                </span>{" "}
                A set route, with the backup, the limits, and the traps already
                known.
              </figcaption>
            </figure>
          </div>

          <p className="mt-6 rounded-xl border border-[#E7DFCD] bg-white px-5 py-4 text-[15px] leading-relaxed text-[#56514a]">
            <span className="font-semibold text-[#20201E]">
              An MCP server is that set route.
            </span>{" "}
            It is a connection between your assistant and one tool, your
            calendar, your CRM, your files, with the turns and the rules mapped
            in advance. Your assistant stops guessing how to get there and just
            goes.
          </p>
        </section>

        {/* Directory link */}
        <div className="mt-8 rounded-xl border border-[#E7DFCD] bg-[#FBEFD0] px-5 py-4">
          <p className="text-sm leading-relaxed text-[#56514a]">
            <span className="font-semibold text-[#20201E]">
              Want to see what you can connect?
            </span>{" "}
            Browse the{" "}
            <Link
              href="/connect"
              className="font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
            >
              directory of common MCP servers
            </Link>
            .
          </p>
        </div>

        {/* Two environments */}
        <section className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Personal */}
          <div className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm">
            <HouseDoodle className="h-10 w-10 text-[#E7A618]" />
            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-[#8a8478]">
              Your own machine
            </p>
            <h2 className="mt-2 font-heading text-xl font-bold">
              You are the IT department.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
              On your own laptop, you make the rules. Setting up a connector is
              usually quick: add it, sign in, done. Just stay a little careful
              about what you plug in.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-[#C9512C]">
              Be cautious of
            </p>
            <ul className="mt-2 space-y-2 text-sm text-[#56514a]">
              {cautions.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F5B62B]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div className="rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-6 shadow-sm">
            <OfficeDoodle className="h-10 w-10 text-[#C9512C]" />
            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-[#8a8478]">
              Your work computer
            </p>
            <h2 className="mt-2 font-heading text-xl font-bold">
              There are a few more guardrails.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
              Companies set rules for good reasons, like customer data and
              compliance. That is not red tape for its own sake. Connecting the
              wrong thing can break a real policy.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#56514a]">
              Do not connect work systems, your work email, your CRM, your
              company files or code, until you know it is allowed. The next
              section shows how to find out.
            </p>
          </div>
        </section>

        {/* How to check */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold">
            How to find out if you are allowed
          </h2>
          <div className="mt-6 space-y-4">
            {checkAllowed.map((step, i) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F5B62B] font-heading text-base font-extrabold">
                  {i + 1}
                </div>
                <p className="pt-1.5 text-sm leading-relaxed text-[#56514a]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ask IT template */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-extrabold">
            A message you can send IT
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            Copy this, fill in the blank, and send it to your IT or security
            team.
          </p>
          <div className="mt-4 rounded-2xl border border-[#E7DFCD] bg-white p-6 font-mono text-sm leading-relaxed text-[#20201E] shadow-sm">
            Hi, I would like to connect an AI assistant to ______ using an MCP
            server, so it can help me with a repeating task. Is that allowed,
            and if so, is there an approved way to set it up? Happy to follow
            whatever process you have.
          </div>
        </section>

        {/* Safety line */}
        <section className="mt-12 rounded-xl border border-[#E7DFCD] bg-[#FBEFD0] px-5 py-4">
          <p className="text-sm leading-relaxed text-[#56514a]">
            <span className="font-semibold text-[#20201E]">
              One thing worth repeating:
            </span>{" "}
            Skill008 never connects anything for you. You set up your own tools,
            on your own account, so you stay in control the whole way.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-[#E7DFCD] bg-white p-8 text-center shadow-sm">
          <h2 className="font-heading text-2xl font-extrabold">
            Not sure yet? That is fine.
          </h2>
          <p className="mt-2 text-[#56514a]">
            You can make and use a skill without connecting a single tool. Add
            MCP later, when you are ready.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make a skill
            </Link>
            <Link
              href="/learn"
              className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              Back to How it works
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
