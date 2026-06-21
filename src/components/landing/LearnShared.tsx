import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import {
  SkillFlowDiagram,
  SpeechDoodle,
  GuideDoodle,
  SkillGlyph,
  HarnessGlyph,
  McpGlyph,
} from "@/components/landing/LearnArt";

export function LearnNav() {
  return <SiteNav />;
}

const variants = [
  { key: "original", href: "/learn", label: "The full read", sub: "Concept first, links out" },
  { key: "guided", href: "/learn/guided", label: "Guided steps", sub: "You drive, one step at a time" },
  { key: "onepage", href: "/learn/onepage", label: "All on one page", sub: "Everything, top to bottom" },
];

export function CompareBar({ active }: { active: string }) {
  return (
    <div className="border-b border-[#E7DFCD] bg-[#FBEFD0]/60">
      <div className="mx-auto max-w-3xl px-6 py-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#8a8478]">
          Same lesson, three ways. Pick the one that fits you.
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {variants.map((v) => {
            const isActive = v.key === active;
            return (
              <Link
                key={v.key}
                href={v.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "rounded-xl border px-4 py-2.5 transition-colors " +
                  (isActive
                    ? "border-[#F5B62B] bg-white shadow-sm"
                    : "border-[#E7DFCD] bg-white/40 hover:border-[#F5B62B] hover:bg-white")
                }
              >
                <span className="flex items-center gap-2">
                  <span
                    className={
                      "h-2 w-2 rounded-full " +
                      (isActive ? "bg-[#C9512C]" : "bg-[#d8cfb9]")
                    }
                  />
                  <span className="font-heading text-sm font-bold">{v.label}</span>
                </span>
                <span className="mt-0.5 block pl-4 text-xs text-[#6E685D]">
                  {v.sub}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ConceptRead() {
  return (
    <>
      {/* Intro */}
      <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
        Two minute read
      </p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
        What is this, really?
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
        No jargon. A task you keep redoing turns into a short written guide, and
        the AI you already use follows it. That is the whole idea.
      </p>

      {/* Hero diagram */}
      <figure className="mt-10 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm md:p-8">
        <SkillFlowDiagram className="mx-auto h-auto w-full max-w-xl" />
        <figcaption className="mt-4 text-center text-sm leading-relaxed text-[#6E685D]">
          A task you keep doing becomes a short guide, and your assistant runs
          it for you.
        </figcaption>
      </figure>

      {/* Airbnb test */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-extrabold">
          When is it worth it?
        </h2>
        <p className="mt-3 leading-relaxed text-[#56514a]">
          Easy test: would you write it down for someone else?
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
              It happens once. You say it and move on. That is a one off, no
              guide needed.
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
              Wifi, trash day, the coffee maker. Written once so you never
              reexplain it. That is a skill.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-[#E7DFCD] bg-[#FBEFD0] px-5 py-4">
          <p className="text-center font-medium">
            Repeatable + predictable + you don&apos;t want to reexplain it ={" "}
            <span className="text-[#C9512C]">make it a skill.</span>
          </p>
        </div>
      </section>

      {/* Three words */}
      <section className="mt-12 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm">
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
      </section>
    </>
  );
}

export function LearnFooter() {
  return <SiteFooter />;
}
