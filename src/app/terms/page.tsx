import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The plain-language terms for using Skill008: your account, the skills you make, pricing, and the usual fine print.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

const LAST_UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          The plain-language version
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          Terms of use
        </h1>
        <p className="mt-3 font-mono text-xs text-[#8a8478]">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-8 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-xl font-extrabold">The gist</h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            Use Skill008 to make and run skills for your own work. Be reasonable,
            do not abuse it, and remember that an AI assistant can make mistakes,
            so you stay the one who reviews and approves what it does.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              Your account
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              You are responsible for what happens under your account and for
              keeping your sign-in secure. Connect only tools you are allowed to
              connect, especially on a work computer.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              Acceptable use
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              Do not use Skill008 to break the law, to access systems you do not
              have permission to access, or to harm other people. We may pause an
              account that does.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              The skills you make
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              The skills you create are yours. They are plain text, so you can
              export them, edit them, and take them with you. You are responsible
              for what your skills do when you run them.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">Pricing</h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              Making and using a skill is free to start. Paid skills are a simple
              one-time price per skill, with no subscription. If pricing changes,
              it will not change what you already paid for.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              No warranty, and the limits
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              Skill008 is provided as is. AI output can be wrong or incomplete,
              so review before you rely on it. To the extent the law allows, we
              are not liable for losses that come from using the service or from
              what an assistant does on your instruction.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              Changes and contact
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              We may update these terms, and we will move the date above when we
              do. Questions are welcome at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "Terms question",
                )}`}
                className="font-semibold text-[#C9512C] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              , or through the{" "}
              <Link
                href="/contact"
                className="font-semibold text-[#C9512C] hover:underline"
              >
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
