import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { DoodleArrow, SalesforceLogo, HubSpotLogo } from "@/components/landing/Doodles";
import { LandingShowcase } from "@/components/landing/LandingShowcase";
import { verticals } from "@/lib/verticals";

const steps = [
  {
    n: "1",
    title: "Show it once",
    desc: "Type what you do in your own words, or drop in a screenshot of the screen you use. No setup.",
  },
  {
    n: "2",
    title: "Check it reads right",
    desc: "We say the steps back to you in plain English. Tweak anything that's not quite how you'd do it.",
  },
  {
    n: "3",
    title: "Put it to work",
    desc: "You get a tidy little instruction file. Hand it to your AI and it runs the task, every time.",
  },
];

const examples = [
  "Sort my inbox before 9 am",
  "Pull the Monday sales report",
  "Flag invoices over $5,000",
  "Find deals going quiet",
  "Draft replies in my voice",
  "Chase the follow ups I owe",
  "Tidy up the job schedule",
  "Sum up the team's updates",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      {/* Nav */}
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-16 md:grid-cols-2 md:pb-24 md:pt-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E7DFCD] bg-white px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#F5B62B]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#6E685D]">
              Upskill your agent
            </span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Teach it once. It does the rest.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#56514a]">
            You already have an AI helper on your computer. Skill008 teaches it
            the things you repeat every week, like checking the report or sorting
            your inbox, so you can stop doing them by hand.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make your first skill, it is free
            </Link>
            <Link
              href="/gallery"
              className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              See the examples
            </Link>
          </div>
          <p className="mt-5 font-mono text-xs text-[#8a8478]">
            No code · No passwords · No catch
          </p>
          <p className="mt-3 text-sm text-[#6E685D]">
            New to this?{" "}
            <Link
              href="/learn"
              className="font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
            >
              Start here, it takes 2 minutes
            </Link>
          </p>
        </div>

        {/* Agent badge card */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm rotate-1 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-[0_12px_40px_-12px_rgba(32,32,30,0.25)]">
            <span className="absolute -right-3 -top-3 rotate-12 rounded-md border-2 border-[#C9512C] px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-[#C9512C] opacity-90">
              Issued
            </span>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5B62B] text-xl">
                <span aria-hidden>{"•‿•"}</span>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#8a8478]">
                  Agent
                </p>
                <p className="font-heading text-2xl font-extrabold leading-none">
                  008
                </p>
                <p className="mt-1 text-sm text-[#6E685D]">Your AI, trained</p>
              </div>
            </div>
            <div className="my-5 border-t border-dashed border-[#E7DFCD]" />
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                  Assignment
                </dt>
                <dd className="text-right font-medium">Monday sales report</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                  Status
                </dt>
                <dd className="flex items-center gap-1.5 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#5AA469]" />
                  On duty
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                  Your data
                </dt>
                <dd className="font-medium text-[#20201E]">stays yours</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <LandingShowcase />

      {/* Two ways in */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Where do you fit?
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
          Two easy ways to start.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* CRM card */}
          <div className="rounded-2xl border border-[#E7DFCD] bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <SalesforceLogo className="h-8 w-8" />
              <HubSpotLogo className="h-7 w-7" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                works with your CRM
              </span>
            </div>
            <h3 className="mt-5 font-heading text-2xl font-extrabold">
              CRM hygiene? We get it.
            </h3>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              Keep your pipeline clean without the manual upkeep. Catch deals going
              quiet, fix the missing fields, and chase the updates your boss asks
              about, on autopilot.
            </p>
            <div className="mt-7 flex items-center gap-2">
              <Link
                href="/gallery"
                className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
              >
                Start here
              </Link>
              <DoodleArrow className="h-9 w-16 flex-shrink-0 text-[#C9512C]" />
              <span className="-rotate-3 font-mono text-xs text-[#C9512C]">
                we mean it, start here
              </span>
            </div>
          </div>

          {/* Chief of Staff card */}
          <div className="rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-8 shadow-sm">
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
              for everyone else
            </p>
            <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight">
              Solo founder? Working parent? Tired of doing more with less?
            </h3>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              You need a Chief of Staff. Get one that sorts your inbox before
              9 am, preps your day, and remembers the follow ups you forget.
            </p>
            <Link
              href="/gallery"
              className="mt-7 inline-block rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              Meet your Chief of Staff
            </Link>
          </div>
        </div>
      </section>

      {/* Train your agent: 3 steps */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Train your agent
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
          Three steps. Ten minutes. Done.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B62B] font-heading text-lg font-extrabold text-[#20201E]">
                {step.n}
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Think of it like this (compact) */}
      <section className="bg-[#FBEFD0]">
        <div className="mx-auto max-w-3xl px-6 py-10 text-center">
          <h2 className="font-heading text-xl font-bold">Think of it like this.</h2>
          <p className="mx-auto mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56514a]">
            Your AI assistant is like a sharp new hire. Eager and quick, but it
            does not know how you do things yet. Skill008 writes the one-page
            training note that turns &ldquo;smart&rdquo; into &ldquo;actually
            helpful,&rdquo; and hands it over for you.
          </p>
        </div>
      </section>

      {/* What can it learn */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            What can it learn
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            If you do it every week, it can learn it.
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {examples.map((ex) => (
              <div
                key={ex}
                className="flex items-center gap-3 rounded-xl border border-[#E7DFCD] bg-[#F7F3E9] px-4 py-4"
              >
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#F5B62B]" />
                <span className="text-sm font-medium">{ex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it's safe */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Why it is safe
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
          We never see your stuff.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "No passwords",
              desc: "We never ask for a login to your email, your CRM, or anything else.",
            },
            {
              title: "No data",
              desc: "Your files and screenshots stay on your computer. They never reach us.",
            },
            {
              title: "Your account, not ours",
              desc: "The skill runs inside the AI you already use, with your own access.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg text-[#56514a]">
          What we keep about your work:{" "}
          <span className="font-bold text-[#20201E] [background:linear-gradient(transparent_55%,#F5B62B_55%)]">
            absolutely nothing
          </span>
          .
        </p>
      </section>

      {/* Starter packs + pricing */}
      <section className="bg-[#FBEFD0]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
              Free starter packs
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight">
              Borrow one we already made.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
              Not sure where to start? Grab a ready-made skill, see how it works,
              and make it yours. No account needed to look.
            </p>
            <Link
              href="/gallery"
              className="mt-6 inline-block rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              Browse the gallery
            </Link>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
              Simple pricing
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight">
              Start free.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
              Make your first skills on us. When you are ready for more, it is $7 a
              skill. One-time. No subscription to forget about.
            </p>
            <Link
              href="/auth/login"
              className="mt-6 inline-block rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make your first skill
            </Link>
          </div>
        </div>
      </section>

      {/* Built for your world */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            Built for the way you work
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight">
            Pick the version that sounds like your week.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v) => (
            <Link
              key={v.slug}
              href={`/for/${v.slug}`}
              className="group flex flex-col rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm transition-colors hover:border-[#F5B62B]"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                {v.eyebrow}
              </p>
              <h3 className="mt-2 font-heading text-xl font-bold">
                {v.name}{" "}
                <span className="text-[#C9512C] transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                {v.subhead}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* The spine: it is all upskilling */}
      <section className="bg-[#20201E] text-[#F7F3E9]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[#F5B62B]">
              The whole idea
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
              It is all upskilling.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#cfc8b8]">
              The work is changing fast. Skill008 helps you stay ahead of it two
              ways, and they rhyme: get the agent you already have better at your
              job, and get yourself ready for the next one.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {/* Path 1: upskill your agent */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                Skills for your next agent
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold">
                Upskill your agent.
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-[#cfc8b8]">
                Teach the AI you already have to handle your weekly routine.
                Describe a task once, get a skill, hand it over. That is
                everything above.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/auth/login"
                  className="rounded-lg bg-[#F5B62B] px-5 py-2.5 text-sm font-semibold text-[#20201E] transition-colors hover:bg-[#E7A618]"
                >
                  Make a skill
                </Link>
                <Link
                  href="/gallery"
                  className="text-sm font-semibold text-[#F7F3E9] underline decoration-[#F5B62B] decoration-2 underline-offset-4 hover:text-white"
                >
                  See the examples
                </Link>
              </div>
            </div>

            {/* Path 2: upskill your career */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                Skills for your next job
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold">
                Upskill your career.
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-[#cfc8b8]">
                Step into the jobs this shift is creating. See why Forward
                Deployed Engineer is taking off and who is hiring, then put a
                career coach in your corner for the search.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/fde"
                  className="rounded-lg bg-[#F5B62B] px-5 py-2.5 text-sm font-semibold text-[#20201E] transition-colors hover:bg-[#E7A618]"
                >
                  See the FDE path
                </Link>
                <Link
                  href="/job-seeker-cos"
                  className="text-sm font-semibold text-[#F7F3E9] underline decoration-[#F5B62B] decoration-2 underline-offset-4 hover:text-white"
                >
                  Meet the career coach
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight md:text-5xl">
          Upskill your agent.
          <br />
          Upskill yourself.
        </h2>
        <Link
          href="/auth/login"
          className="mt-8 inline-block rounded-lg bg-[#F5B62B] px-7 py-3.5 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
        >
          Make your first skill, it is free
        </Link>
        <p className="mt-6 font-mono text-xs text-[#8a8478]">
          skill008 · your next agent, trained.
        </p>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
