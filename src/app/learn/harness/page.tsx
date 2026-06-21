import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import {
  HarnessHero,
  AppGlyph,
  AccountBadgeDoodle,
} from "@/components/landing/HarnessArt";

const options = [
  {
    name: "ChatGPT",
    by: "OpenAI",
    glyph: "chatgpt" as const,
    tint: "#10A37F",
    blurb:
      "The easiest place to start if you have never used one. Works in your browser and on your phone. Good at a bit of everything.",
    where: "chatgpt.com",
    href: "https://chatgpt.com",
  },
  {
    name: "Claude",
    by: "Anthropic",
    glyph: "claude" as const,
    tint: "#CC7A57",
    blurb:
      "Great with documents and longer, careful tasks. Also in your browser and on your phone. Keeps a tidy home for your skills.",
    where: "claude.ai",
    href: "https://claude.ai",
  },
  {
    name: "Copilot",
    by: "Microsoft and GitHub",
    glyph: "copilot" as const,
    tint: "#3B6FB0",
    blurb:
      "Already built into a lot of the Microsoft and GitHub tools your job may use. If work gave you this, you are set.",
    where: "copilot.microsoft.com",
    href: "https://copilot.microsoft.com",
  },
  {
    name: "Cursor",
    by: "Anysphere",
    glyph: "cursor" as const,
    tint: "#20201E",
    blurb:
      "The hands-on option, made for people who work in code. It lives on your computer and can read and edit your files directly. Great once you are comfortable, not the place to start.",
    where: "cursor.com",
    href: "https://cursor.com",
  },
];

const steps = [
  {
    n: "1",
    t: "Pick one. Do not overthink it.",
    d: "Choose from the list above. Picking one is not a marriage, you can switch later. If you have never tried any, start with ChatGPT.",
  },
  {
    n: "2",
    t: "Make a free account.",
    d: "Go to the website, click sign up, and use your email or your Google or Microsoft login. This account is your token. The free version is plenty to start.",
  },
  {
    n: "3",
    t: "Find the instructions spot.",
    d: "This is where your skill goes. Every app has one. You are looking for a place to give it standing instructions so you stop repeating yourself.",
    sub: [
      "ChatGPT: make a Project, paste your skill into the Project instructions.",
      "Claude: make a Project, paste your skill into the project instructions.",
      "Copilot: paste your skill at the top of a new chat, or save it as a custom instruction.",
    ],
    note: "The simple way that works everywhere: open a new chat, paste the whole skill, and say follow this.",
  },
  {
    n: "4",
    t: "Hand it the skill.",
    d: "Open the skill you made here, copy the whole thing, and paste it in. That is the welcome guide your assistant follows.",
  },
  {
    n: "5",
    t: "Give it a real task.",
    d: "Now just ask. Try okay, do this for today. It follows the guide you gave it, step by step.",
  },
];

export default function HarnessPage() {
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
          Tutorial, step by step
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          Let&apos;s get you a harness
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
          A harness is just the AI app where your assistant lives. You need one
          to run your skill. Here is how to set one up. Most of it is free, and
          it takes about five minutes.
        </p>

        {/* Hero diagram */}
        <figure className="mt-10 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm md:p-8">
          <HarnessHero className="mx-auto h-auto w-full max-w-lg" />
          <figcaption className="mt-4 text-center text-sm leading-relaxed text-[#6E685D]">
            Pick any one of these. They are all a home for the same assistant,
            and they all run the same skill you make here.
          </figcaption>
        </figure>

        {/* Already have one */}
        <div className="mt-8 rounded-xl border border-[#E7DFCD] bg-[#FBEFD0] px-5 py-4">
          <p className="text-sm leading-relaxed text-[#56514a]">
            <span className="font-semibold text-[#20201E]">
              Good chance you already have one.
            </span>{" "}
            If your job gives you Copilot or ChatGPT, you are set. Skip down to
            Step 3.
          </p>
        </div>

        {/* Pick one */}
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-extrabold">
            First, pick your assistant
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            Any of these work. They all run the same skill you make here.
          </p>
          <div className="mt-6 space-y-4">
            {options.map((o) => (
              <a
                key={o.name}
                href={o.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm transition-colors hover:border-[#F5B62B]"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${o.tint}1F` }}
                  >
                    <svg viewBox="0 0 48 48" className="h-6 w-6">
                      <AppGlyph type={o.glyph} color={o.tint} />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-heading text-xl font-bold">{o.name}</h3>
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
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold">
            Then, set it up
          </h2>
          <div className="mt-6 space-y-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F5B62B] font-heading text-lg font-extrabold">
                  {s.n}
                </div>
                <div className="pt-1">
                  <h3 className="font-heading text-lg font-bold">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6E685D]">
                    {s.d}
                  </p>
                  {s.sub && (
                    <ul className="mt-3 space-y-1.5 border-l-2 border-[#E7DFCD] pl-4 text-sm text-[#56514a]">
                      {s.sub.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}
                  {s.note && (
                    <p className="mt-3 rounded-lg bg-[#FBEFD0] px-3 py-2 text-sm text-[#56514a]">
                      <span className="font-semibold text-[#20201E]">
                        Easiest:
                      </span>{" "}
                      {s.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Token / key demystified */}
        <section className="mt-16">
          <AccountBadgeDoodle className="h-10 w-10 text-[#C9512C]" />
          <h2 className="mt-3 font-heading text-2xl font-extrabold">
            What about a &ldquo;token&rdquo; or &ldquo;key&rdquo;?
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            You might hear someone say go get a token, or bring your own key. Do
            not let it scare you. For most people, that just means: make an
            account at one of the places above. That is the whole thing.
          </p>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            A real API key is a different, more technical thing for wiring AI
            into other software. You can ignore it until you ever need it, and
            most people never do.
          </p>
        </section>

        {/* Free vs paid */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-extrabold">Free or paid?</h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            Free plans are great for trying this out. Paid plans give you more
            room and the Projects feature, which is the tidiest place to keep a
            skill. Start free, upgrade only if you find yourself using it every
            day.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-[#E7DFCD] bg-white p-8 text-center shadow-sm">
          <h2 className="font-heading text-2xl font-extrabold">
            Got your assistant? Good.
          </h2>
          <p className="mt-2 text-[#56514a]">Now make a skill and hand it over.</p>
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
