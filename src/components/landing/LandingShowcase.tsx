"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { verticals } from "@/lib/verticals";
import { PersonaIcon } from "./PersonaIcons";

const personaLabels: Record<string, string> = {
  "crm-hygiene": "CRM hygiene",
  "chief-of-staff": "Chief of staff",
  trades: "Trades",
  jobber: "Jobber",
  "social-media-manager": "Social media",
  "job-helper": "Job search",
  teachers: "Teachers",
};

const label = (slug: string, fallback: string) =>
  personaLabels[slug] ?? fallback;

const useCases = verticals.map((v) => ({
  slug: v.slug,
  persona: label(v.slug, v.name),
  problem: v.problem.points[0],
  fixTitle: v.skills[0].title,
  fixDesc: v.skills[0].desc,
}));

const arrowBtn =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[#E7DFCD] bg-white text-[#20201E] transition-colors hover:border-[#F5B62B]";

export function LandingShowcase() {
  // Use-case carousel
  const count = useCases.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  const go = (n: number) => setIdx((n + count) % count);

  // Persona picker + skills rail
  const [persona, setPersona] = useState(verticals[0].slug);
  const active = verticals.find((v) => v.slug === persona) ?? verticals[0];
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 });
  }, [persona]);

  const nudge = (dir: number) =>
    railRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <>
      {/* Use-case carousel */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            Problems worth handing off
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            What would you stop doing this week?
          </h2>

          <div
            className="relative mt-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-2xl border border-[#E7DFCD] bg-[#F7F3E9]">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${idx * 100}%)` }}
              >
                {useCases.map((u) => (
                  <div key={u.slug} className="w-full shrink-0 p-8 md:p-10">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                      {u.persona}
                    </p>
                    <p className="mt-3 font-heading text-xl font-bold leading-snug text-[#20201E] md:text-2xl">
                      &ldquo;{u.problem}&rdquo;
                    </p>
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#E7DFCD] bg-white p-4">
                      <span className="mt-0.5 shrink-0 rounded-md bg-[#FBEFD0] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#8a5a13]">
                        There&apos;s a skill
                      </span>
                      <div>
                        <p className="font-semibold">{u.fixTitle}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#6E685D]">
                          {u.fixDesc}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/for/${u.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
                    >
                      {`See the ${u.persona} skills →`}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-1.5">
                {useCases.map((u, i) => (
                  <button
                    key={u.slug}
                    aria-label={`Show ${u.persona}`}
                    onClick={() => go(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === idx
                        ? "w-6 bg-[#F5B62B]"
                        : "w-2 bg-[#E7DFCD] hover:bg-[#d8cfb8]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button aria-label="Previous" onClick={() => go(idx - 1)} className={arrowBtn}>
                  &larr;
                </button>
                <button aria-label="Next" onClick={() => go(idx + 1)} className={arrowBtn}>
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persona picker + skills */}
      <section className="bg-[#FBEFD0]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            Find your version
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            Who are you this week?
          </h2>
          <p className="mt-3 max-w-xl text-[15px] text-[#6E685D]">
            Pick the hat you are wearing. We will show the busywork it kills and
            the skill that does it for you.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {verticals.map((v) => {
              const on = v.slug === persona;
              return (
                <button
                  key={v.slug}
                  onClick={() => setPersona(v.slug)}
                  aria-pressed={on}
                  className={`group flex w-[104px] flex-col items-center gap-2 rounded-2xl border px-3 py-3.5 text-sm font-semibold transition-colors ${
                    on
                      ? "border-[#20201E] bg-[#20201E] text-[#F7F3E9]"
                      : "border-[#E7DFCD] bg-white text-[#6E685D] hover:border-[#F5B62B] hover:text-[#20201E]"
                  }`}
                >
                  <span
                    className={
                      on
                        ? "text-[#F5B62B]"
                        : "text-[#20201E] group-hover:text-[#E7A618]"
                    }
                  >
                    <PersonaIcon slug={v.slug} className="h-7 w-7" />
                  </span>
                  <span className="text-center leading-tight">
                    {label(v.slug, v.name)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8478]">
                {active.eyebrow}
              </p>
              <h3 className="mt-1 font-heading text-2xl font-extrabold">
                {active.skillsHeading}
              </h3>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button aria-label="Scroll left" onClick={() => nudge(-1)} className={arrowBtn}>
                &larr;
              </button>
              <button aria-label="Scroll right" onClick={() => nudge(1)} className={arrowBtn}>
                &rarr;
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {active.skills.map((s) => (
              <div
                key={s.title}
                className="flex min-h-[272px] w-72 shrink-0 snap-start flex-col rounded-2xl border border-[#E7DFCD] bg-white p-5 shadow-sm"
              >
                <h4 className="font-heading text-lg font-bold leading-tight">
                  {s.title}
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6E685D]">
                  {s.desc}
                </p>
                {s.connects && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.connects.map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-[#F7F3E9] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#8a8478]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={`/for/${active.slug}`}
              aria-label={`See the full ${label(active.slug, active.name)} page`}
              className="flex min-h-[272px] w-72 shrink-0 snap-start flex-col items-start justify-center rounded-2xl border border-dashed border-[#C9512C]/40 bg-white p-5 text-[#C9512C] transition-colors hover:border-[#C9512C]"
            >
              <span className="font-heading text-lg font-bold leading-tight">
                {`See the full ${label(active.slug, active.name)} page`}
              </span>
              <span className="mt-2 text-sm">
                All the skills, the tools, and the FAQ &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
