import Link from "next/link";
import {
  LearnNav,
  CompareBar,
  ConceptRead,
  LearnFooter,
} from "@/components/landing/LearnShared";
import SetupStepper from "@/components/landing/SetupStepper";

export const metadata = {
  title: "Set it up, step by step · Skill008",
  description:
    "The guided version. Read the two minute concept, then drive your own setup one step at a time. Check each step off as you go.",
};

export default function GuidedLearnPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <LearnNav />
      <CompareBar active="guided" />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <ConceptRead />

        {/* Setup, driven */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            Now you drive
          </p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold">
            Let&apos;s set it up, one step at a time
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            Open a step, do it, check it off. Go at your own pace. The full
            walkthroughs are one click away whenever you want more.
          </p>
          <div className="mt-8">
            <SetupStepper />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-[#E7DFCD] bg-white p-8 text-center shadow-sm">
          <h2 className="font-heading text-2xl font-extrabold">
            Prefer it all on one screen?
          </h2>
          <p className="mt-2 text-[#56514a]">
            Same setup, laid out top to bottom with nothing to click.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make your first skill
            </Link>
            <Link
              href="/learn/onepage"
              className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              See the one page version
            </Link>
          </div>
        </section>
      </main>

      <LearnFooter />
    </div>
  );
}
