"use client";

import { useState } from "react";
import Link from "next/link";
import { verticals } from "@/lib/verticals";
import { PersonaIcon } from "@/components/landing/PersonaIcons";

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

export function GalleryExplorer() {
  const [persona, setPersona] = useState(verticals[0].slug);
  const active = verticals.find((v) => v.slug === persona) ?? verticals[0];

  return (
    <section className="mb-14">
      <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
        Browse by role
      </p>
      <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight">
        Pick the hat you are wearing.
      </h2>

      <div className="mt-6 flex flex-wrap gap-2.5">
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
          <h3 className="mt-1 font-heading text-xl font-bold">
            {active.skillsHeading}
          </h3>
        </div>
        <Link
          href={`/for/${active.slug}`}
          className="hidden shrink-0 text-sm font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f] sm:inline"
        >
          {`See the full ${label(active.slug, active.name)} page →`}
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {active.skills.map((s) => (
          <Link
            key={s.title}
            href="/auth/login"
            className="group flex flex-col rounded-xl border border-[#E7DFCD] bg-white p-5 shadow-sm transition-colors hover:border-[#F5B62B]"
          >
            <h4 className="font-semibold">{s.title}</h4>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-[#6E685D]">
              {s.desc}
            </p>
            {s.connects && s.connects.length > 0 && (
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
            <span className="mt-3 font-mono text-xs text-[#C9512C] opacity-0 transition-opacity group-hover:opacity-100">
              Make this one &rarr;
            </span>
          </Link>
        ))}
      </div>

      <Link
        href={`/for/${active.slug}`}
        className="mt-5 inline-block text-sm font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f] sm:hidden"
      >
        {`See the full ${label(active.slug, active.name)} page →`}
      </Link>
    </section>
  );
}
