import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import {
  SeatsGlyph,
  MeterGlyph,
  TokenGlyph,
  ShiftArrow,
  DoorGlyph,
} from "@/components/landing/FdeArt";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
  fdeGroups,
  fdeShift,
  fdePilotStat,
  fdeCompanyCount,
} from "@/lib/fde";

const url = `${SITE_URL}/fde`;
const title = "Forward Deployed Engineer: the job that makes AI stick | Skill008";
const description =
  "Forward Deployed Engineer is one of the fastest-growing jobs in tech, and the title is just a new name for work a lot of people already do. Here is why it exists, why you may already be qualified, and 40+ companies hiring right now.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "forward deployed engineer",
    "FDE jobs",
    "forward deployed engineer hiring",
    "AI deployment jobs",
    "implementation engineer",
    "solutions engineer AI",
    "career change into AI",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: SITE_NAME, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const shiftGlyphs = [SeatsGlyph, MeterGlyph, TokenGlyph];

export default function FdePage() {
  const total = fdeCompanyCount();

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 md:pt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Upskill your career
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          The job is making it stick.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#56514a]">
          Forward Deployed Engineer. Hundreds of roles open. The title is a new
          name for something a lot of people already do: run the
          implementation, own the rollout, make the thing actually work in the
          real world. We obsessed over the prompt, then the model, then the
          agents. None of it was the bottleneck. The deployment was.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#hiring"
            className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
          >
            See who is hiring
          </a>
          <Link
            href="/for/job-helper"
            className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
          >
            Get FDE-ready with the career coach
          </Link>
        </div>
      </section>

      {/* The pricing shift */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            Why the job exists now
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            Software stopped selling by the seat.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#56514a]">
            When you pay for what the work consumes instead of how many chairs
            you bought, someone has to make the work happen. That someone is the
            forward deployed engineer.
          </p>

          <div className="mt-12 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {fdeShift.map((beat, i) => {
              const Glyph = shiftGlyphs[i];
              const isLast = i === fdeShift.length - 1;
              return (
                <div key={beat.key} className="contents">
                  <div
                    className={
                      "flex flex-col rounded-2xl border p-6 shadow-sm " +
                      (isLast
                        ? "border-[#F5B62B] bg-[#FBEFD0]"
                        : "border-[#E7DFCD] bg-[#F7F3E9]")
                    }
                  >
                    <Glyph className="h-12 w-12 text-[#C9512C]" />
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                      {beat.label}
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-bold">
                      {beat.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                      {beat.body}
                    </p>
                  </div>
                  {!isLast && (
                    <div className="flex items-center justify-center py-2 md:py-0">
                      <ShiftArrow className="h-6 w-14 rotate-90 text-[#b8b2a4] md:rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The stat */}
      <section className="bg-[#20201E] text-[#F7F3E9]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
          <p className="font-heading text-6xl font-extrabold tracking-tight text-[#F5B62B] md:text-8xl">
            {fdePilotStat.figure}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed md:text-2xl">
            {fdePilotStat.claim}
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#b8b2a4]">
            It is almost never the model. It is the deployment. That gap is the
            whole reason the role is hiring.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[#8a8478]">
            {fdePilotStat.source}
          </p>
        </div>
      </section>

      {/* What makes it stick */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          What actually makes it stick
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
          A framework people can run themselves, with guardrails.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#56514a]">
          Pilots die when the answer is &ldquo;hire a consultant every time.&rdquo;
          They stick when the people doing the work can self-serve their own
          solutions, inside guardrails that keep the data and the systems sane.
          That is the same thing Skill008 does on a small scale.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E7DFCD] bg-white p-7 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
              The framework
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold">
              Self-serve, not bespoke every time
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
              Turn a repeated task into a short, portable skill anyone on the
              team can read, run, and adjust. The expertise stops living in one
              person&apos;s head.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E7DFCD] bg-white p-7 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
              The guardrails
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold">
              Structure the data and systems together
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
              Nothing sends, deletes, or changes a record without a human. Work
              starts read-only, on your own access, with your own data. That is
              how a rollout earns trust instead of a security review.
            </p>
          </div>
        </div>
      </section>

      {/* Already qualified */}
      <section className="bg-[#FBEFD0]">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center md:py-16">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            You might already be qualified.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#56514a]">
            If you have ever shipped an implementation, owned a rollout, or sat
            with a customer until their thing worked, you have done the job. Most
            people good at it were doing it under another title for years. Anyone
            who can write code and talk to a human can grow into it.
          </p>
        </div>
      </section>

      {/* Hiring list */}
      <section id="hiring" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Who is hiring right now
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
          {total}+ companies, three places to look.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#56514a]">
          Open counts move week to week, so these point at live careers pages,
          not a number that goes stale. Frontier labs, the consulting
          integrators, and a few you would not guess.
        </p>

        <div className="mt-12 space-y-12">
          {fdeGroups.map((group) => (
            <section key={group.id}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-2xl font-extrabold">
                  {group.title}
                </h3>
                <span className="font-mono text-xs text-[#8a8478]">
                  {group.companies.length}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6E685D]">
                {group.blurb}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.companies.map((c) => (
                  <a
                    key={c.name}
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${c.name} careers, opens in a new tab`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-[#E7DFCD] bg-white px-4 py-3.5 shadow-sm transition-colors hover:border-[#F5B62B] hover:bg-[#FBEFD0]"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="font-mono text-xs text-[#C9512C] transition-transform group-hover:translate-x-0.5">
                      {"careers \u2197"}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-8 shadow-sm md:p-10">
            <div className="flex items-start gap-4">
              <DoorGlyph className="hidden h-12 w-12 flex-shrink-0 text-[#C9512C] sm:block" />
              <div>
                <h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl">
                  Go get the job.
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-[#56514a]">
                  The career coach agent tailors your resume to FDE roles, preps
                  your rollout and implementation stories, and tracks the
                  applications. Then make a skill or two to show in the
                  interview, proof you can make a thing stick.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/job-seeker-cos"
                    className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
                  >
                    Meet the career coach
                  </Link>
                  <Link
                    href="/auth/login"
                    className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
                  >
                    Make a skill to show
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
