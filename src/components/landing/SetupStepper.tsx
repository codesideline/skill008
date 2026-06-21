"use client";

import { useState } from "react";
import Link from "next/link";

type Step = {
  title: string;
  blurb: string;
  detail: string[];
  link?: { href: string; text: string };
};

const steps: Step[] = [
  {
    title: "Pick the AI you'll use",
    blurb:
      "Your harness is just the app your assistant lives in. Pick one, free is fine.",
    detail: [
      "Never used one? Start with ChatGPT at chatgpt.com.",
      "If work gave you Copilot or ChatGPT, you already have a harness.",
      "Make a free account. That account is your token, nothing more technical needed.",
    ],
    link: { href: "/learn/harness", text: "Walk me through getting one" },
  },
  {
    title: "Find the instructions spot",
    blurb:
      "Every app has a place for standing instructions. That is where your skill goes.",
    detail: [
      "ChatGPT or Claude: make a Project, paste the skill into the project instructions.",
      "Copilot: paste the skill at the top of a new chat.",
      "Works everywhere: open a new chat, paste the whole skill, say follow this.",
    ],
  },
  {
    title: "Hand it the skill",
    blurb:
      "Open the skill you made here, copy the whole thing, and paste it in.",
    detail: [
      "That pasted guide is the welcome guide your assistant follows.",
      "No install, no setup. Paste is the whole step.",
    ],
  },
  {
    title: "Give it a real task",
    blurb: "Just ask. Try okay, do this for today.",
    detail: [
      "It follows the guide you gave it, step by step.",
      "If something is off, tweak the skill and paste it again.",
    ],
  },
  {
    title: "Connect your tools, when ready",
    blurb:
      "Optional. MCP lets your assistant reach your email, calendar, or CRM.",
    detail: [
      "You can make and use a skill without connecting anything.",
      "On your own laptop you make the rules. On a work machine, check with IT first.",
    ],
    link: { href: "/learn/mcp", text: "How to connect tools safely" },
  },
];

export default function SetupStepper() {
  const [open, setOpen] = useState(0);
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));

  const doneCount = done.filter(Boolean).length;
  const allDone = doneCount === steps.length;

  function toggleDone(i: number) {
    setDone((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  function completeAndAdvance(i: number) {
    setDone((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
    const nextUndone = steps.findIndex((_, idx) => idx > i && !done[idx]);
    setOpen(nextUndone === -1 ? -1 : nextUndone);
  }

  return (
    <div>
      {/* Progress */}
      <div className="rounded-2xl border border-[#E7DFCD] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-bold">
            {allDone ? "You're all set." : "Your setup"}
          </p>
          <p className="font-mono text-xs text-[#8a8478]">
            {doneCount} of {steps.length} done
          </p>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F1E9D6]">
          <div
            className="h-full rounded-full bg-[#F5B62B] transition-all duration-300"
            style={{ width: `${(doneCount / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <ol className="mt-5 space-y-3">
        {steps.map((s, i) => {
          const isOpen = open === i;
          const isDone = done[i];
          return (
            <li
              key={s.title}
              className={
                "overflow-hidden rounded-2xl border shadow-sm transition-colors " +
                (isDone
                  ? "border-[#E7DFCD] bg-[#FBEFD0]/50"
                  : "border-[#E7DFCD] bg-white")
              }
            >
              <div className="flex items-stretch">
                {/* Check toggle */}
                <button
                  type="button"
                  onClick={() => toggleDone(i)}
                  aria-pressed={isDone}
                  aria-label={isDone ? "Mark step not done" : "Mark step done"}
                  className="flex items-center pl-5 pr-1"
                >
                  <span
                    className={
                      "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors " +
                      (isDone
                        ? "border-[#F5B62B] bg-[#F5B62B] text-[#20201E]"
                        : "border-[#d8cfb9] bg-white text-transparent hover:border-[#F5B62B]")
                    }
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 10.5l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Header */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex flex-1 items-center justify-between gap-3 py-4 pr-5 text-left"
                >
                  <span>
                    <span className="font-mono text-xs text-[#8a8478]">
                      Step {i + 1}
                    </span>
                    <span
                      className={
                        "block font-heading text-lg font-bold " +
                        (isDone ? "text-[#8a8478]" : "text-[#20201E]")
                      }
                    >
                      {s.title}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className={
                      "h-5 w-5 flex-shrink-0 text-[#8a8478] transition-transform " +
                      (isOpen ? "rotate-180" : "")
                    }
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div className="px-5 pb-5 pl-[3.75rem]">
                  <p className="text-sm leading-relaxed text-[#56514a]">
                    {s.blurb}
                  </p>
                  <ul className="mt-3 space-y-2 border-l-2 border-[#E7DFCD] pl-4 text-sm text-[#6E685D]">
                    {s.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {!isDone && (
                      <button
                        type="button"
                        onClick={() => completeAndAdvance(i)}
                        className="rounded-lg bg-[#F5B62B] px-4 py-2 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
                      >
                        {i === steps.length - 1
                          ? "Mark done"
                          : "Mark done and continue"}
                      </button>
                    )}
                    {s.link && (
                      <Link
                        href={s.link.href}
                        className="text-sm font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
                      >
                        {s.link.text} &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Done state */}
      {allDone && (
        <div className="mt-6 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-6 text-center shadow-sm">
          <h3 className="font-heading text-xl font-extrabold">
            That&apos;s the whole setup.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#56514a]">
            Your assistant has the guide and knows the task. Go make your first
            one.
          </p>
          <Link
            href="/auth/login"
            className="mt-5 inline-block rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
          >
            Make your first skill
          </Link>
        </div>
      )}
    </div>
  );
}
