import type { Metadata } from "next";
import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { ShareActions } from "@/components/skill/ShareActions";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
  cosCommands,
  cosSetupSteps,
  cosConfigMac,
  cosConfigWindows,
  cosPhases,
  cosSprint,
  cosPhilosophy,
  COS_REPO_URL,
  CLAUDE_DOWNLOAD_URL,
} from "@/lib/jobSeekerCos";

const url = `${SITE_URL}/job-seeker-cos`;
const title =
  "Job Seeker Chief of Staff: an AI agent for your job search | Skill008";
const description =
  "A free, structured AI agent that runs your job search like a chief of staff, not a resume spammer. Set it up in Claude Desktop in 10 minutes: daily briefings, AIS scoring, a grade-my-LinkedIn flow, an 11-phase playbook, and a 14-day sprint.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "job search AI agent",
    "AI chief of staff job search",
    "Claude Desktop job search",
    "career transition AI",
    "AI job search system prompt",
    "LinkedIn grader",
    "job search accountability",
    "layoff job search help",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: SITE_NAME, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

function getSystemPrompt(): string {
  return readFileSync(
    join(process.cwd(), "src/content/job-seeker-cos-system-prompt.md"),
    "utf8"
  );
}

export default function JobSeekerCosPage() {
  const systemPrompt = getSystemPrompt();

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 md:pt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Upskill your career &middot; career coach
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          A chief of staff for your job search.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#56514a]">
          Not a resume spammer. A structured system that keeps you accountable,
          organized, and moving forward with intention. It runs in Claude
          Desktop, it is free to set up, and it never sleeps or judges you. The
          work, the conversations, and the relationships stay yours.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#get-it"
            className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
          >
            Get the system prompt
          </a>
          <a
            href="#setup"
            className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
          >
            How to set it up
          </a>
        </div>
      </section>

      {/* What is this */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            What is this, exactly
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            Like hiring an assistant who works for free.
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-[#56514a]">
            <p>
              Claude is an AI made by Anthropic. Claude Desktop is the app you
              install on your computer. It is like ChatGPT, with one difference:
              you can give it access to a single folder on your computer so it
              remembers your stuff between conversations.
            </p>
            <p>
              The system prompt below is a set of instructions that tells Claude
              how to be your chief of staff during a job search. You paste it in
              once. From then on it knows what you are looking for, where you
              have applied, who you have talked to, what to do today, and when
              something is falling through the cracks.
            </p>
            <p className="font-medium text-[#20201E]">
              You do not need to be technical. If you can install an app and
              follow five steps, you can use this.
            </p>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section id="setup" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Set it up in about 10 minutes
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
          Five steps, no coding.
        </h2>

        <ol className="mt-10 space-y-6">
          {cosSetupSteps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-5 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FBEFD0] font-heading text-base font-extrabold text-[#C9512C]">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-heading text-xl font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-[#56514a]">{step.body}</p>
                {step.detail && (
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-[#6E685D]">
                    {step.detail.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span aria-hidden className="text-[#C9512C]">
                          &middot;
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {i === 1 && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                        Mac config
                      </p>
                      <pre className="mt-1.5 overflow-x-auto rounded-xl border border-[#E7DFCD] bg-[#20201E] p-4 text-xs leading-relaxed text-[#F7F3E9]">
                        <code>{cosConfigMac}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                        Windows config
                      </p>
                      <pre className="mt-1.5 overflow-x-auto rounded-xl border border-[#E7DFCD] bg-[#20201E] p-4 text-xs leading-relaxed text-[#F7F3E9]">
                        <code>{cosConfigWindows}</code>
                      </pre>
                    </div>
                  </div>
                )}
                {i === 0 && (
                  <a
                    href={CLAUDE_DOWNLOAD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block font-mono text-xs font-semibold text-[#C9512C] hover:underline"
                  >
                    {"claude.ai/download \u2197"}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Commands */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            What you can say to it
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            A short list of commands.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#56514a]">
            You do not have to memorize these. Most days you just say{" "}
            <span className="font-mono text-base text-[#20201E]">cos</span>.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7DFCD]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#FBEFD0] font-mono text-xs uppercase tracking-wider text-[#56514a]">
                  <th className="px-5 py-3 font-semibold">Command</th>
                  <th className="px-5 py-3 font-semibold">What it does</th>
                </tr>
              </thead>
              <tbody>
                {cosCommands.map((c, i) => (
                  <tr
                    key={c.cmd}
                    className={i % 2 ? "bg-[#F7F3E9]" : "bg-white"}
                  >
                    <td className="whitespace-nowrap px-5 py-3 align-top font-mono font-semibold text-[#C9512C]">
                      {c.cmd}
                    </td>
                    <td className="px-5 py-3 leading-relaxed text-[#56514a]">
                      {c.what}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          The playbook
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
          Eleven phases, in roughly the right order.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#56514a]">
          This is not a rigid checklist. Some phases overlap and you can jump
          ahead. The agent meets you where you are and tells you what to focus on.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cosPhases.map((p) => (
            <div
              key={p.n}
              className="flex flex-col rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-2xl font-extrabold text-[#F5B62B]">
                  {p.n}
                </span>
                <h3 className="font-heading text-lg font-bold leading-tight">
                  {p.name}
                </h3>
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                {p.timeline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#6E685D]">
                {p.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sprint */}
      <section className="bg-[#FBEFD0]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            For when you are actively looking
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            The 14-day sprint.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#56514a]">
            Never more than three tasks a day, always one five-minute win for
            momentum, and day seven is rest. If you skipped yesterday, it moves
            one thing forward and drops the rest. Every briefing ends with the
            same question: what feels doable today?
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7DFCD] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white font-mono text-xs uppercase tracking-wider text-[#56514a]">
                  <th className="px-5 py-3 font-semibold">Day</th>
                  <th className="px-5 py-3 font-semibold">Focus</th>
                  <th className="px-5 py-3 font-semibold">Tasks</th>
                </tr>
              </thead>
              <tbody>
                {cosSprint.map((d, i) => (
                  <tr
                    key={d.day}
                    className={
                      "border-t border-[#E7DFCD] " +
                      (d.focus === "Rest"
                        ? "bg-[#FBEFD0]"
                        : i % 2
                          ? "bg-[#F7F3E9]"
                          : "bg-white")
                    }
                  >
                    <td className="whitespace-nowrap px-5 py-2.5 align-top font-heading font-bold">
                      {d.day}
                    </td>
                    <td className="whitespace-nowrap px-5 py-2.5 align-top font-semibold text-[#C9512C]">
                      {d.focus}
                    </td>
                    <td className="px-5 py-2.5 leading-relaxed text-[#56514a]">
                      {d.tasks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="rounded-2xl border border-[#E7DFCD] bg-white p-8 shadow-sm md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            The philosophy
          </p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight md:text-3xl">
            A chief of staff, not a bot.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
            Spraying your resume at every posting will not land you a role. What
            works is older and slower than that:
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {cosPhilosophy.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2.5 rounded-lg bg-[#FBEFD0] px-4 py-2.5 text-[#20201E]"
              >
                <span aria-hidden className="text-[#5AA469]">
                  &#10003;
                </span>
                <span className="font-medium">{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-heading text-xl font-bold leading-snug text-[#20201E]">
            AI is your chief of staff, not your replacement. It keeps you
            organized and accountable. The work, the conversations, and the
            relationships are still yours.
          </p>
        </div>
      </section>

      {/* Get it */}
      <section id="get-it" className="bg-[#20201E] text-[#F7F3E9]">
        <div className="mx-auto max-w-4xl scroll-mt-20 px-6 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-[#F5B62B]">
            Get it
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            Copy the system prompt, paste it into Claude.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#cfc8b8]">
            This is the whole agent. Copy it, make a Job Search project in Claude
            Desktop, paste it into the custom instructions, then say setup. Free
            to use, MIT licensed, yours to adapt.
          </p>
          <div className="mt-8">
            <ShareActions
              content={systemPrompt}
              title="job-seeker-chief-of-staff"
              filename="system-prompt.md"
              copyLabel="Copy the system prompt"
              downloadLabel="Download system-prompt.md"
            />
          </div>
          {COS_REPO_URL && (
            <a
              href={COS_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block font-mono text-sm font-semibold text-[#F5B62B] hover:underline"
            >
              {"View the source and contribute on GitHub \u2197"}
            </a>
          )}
          <details className="mt-8 rounded-xl border border-white/15 bg-white/5">
            <summary className="cursor-pointer px-5 py-3 font-mono text-xs uppercase tracking-wider text-[#cfc8b8]">
              Preview the full prompt
            </summary>
            <pre className="overflow-x-auto px-5 pb-5 text-xs leading-relaxed text-[#cfc8b8]">
              <code>{systemPrompt}</code>
            </pre>
          </details>
        </div>
      </section>

      {/* Cross-link to the vertical */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
              Want the bigger picture first
            </p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight">
              See how skills fit the whole search.
            </h2>
            <p className="mt-2 leading-relaxed text-[#56514a]">
              The job search and career page covers resume tailoring, interview
              prep, tracking, and follow-ups as portable skills you can run in
              any assistant.
            </p>
          </div>
          <Link
            href="/for/job-helper"
            className="inline-block flex-shrink-0 self-start rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40 md:self-auto"
          >
            Job search and career
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
