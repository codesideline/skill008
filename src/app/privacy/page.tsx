import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Skill008 handles your data: we never store your passwords, files, or screenshots, and your connected tools stay yours.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const LAST_UPDATED = "June 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          The plain-language version
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          Privacy
        </h1>
        <p className="mt-3 font-mono text-xs text-[#8a8478]">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-8 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-xl font-extrabold">
            The short version
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            We never store your passwords, your files, or your screenshots. A
            skill runs inside the AI app you already use, on your account, not on
            ours. When you connect a tool, the access lives between your
            assistant and that app. We do not sit in the middle of it.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              What we collect
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              To sign you in and keep your skills, we store the basics of your
              account, such as your email address and the skills you create. That
              is the core of it. We do not need your bank details, and we do not
              sell anything about you.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              What we do not touch
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              The data inside your connected apps, like your inbox, your CRM, or
              your documents, stays in those apps. The access tokens are held by
              your assistant and the tool you connect, not by us. We never see
              them.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              Screenshots and what you type
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              When you describe a task or drop in a screenshot, we use it to
              draft your skill in that moment. We do not keep a library of your
              screenshots, and the finished skill is plain text you can read and
              edit.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              Cookies and analytics
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              We keep this light. We use only what is needed to keep you signed
              in and to understand which pages are useful, in aggregate. No ad
              networks, no selling your activity.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">Your choices</h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              You can disconnect any tool at any time from the tool itself. You
              can delete a skill, or ask us to delete your account, and we will
              remove what we hold for you.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">
              Changes and contact
            </h2>
            <p className="mt-3 leading-relaxed text-[#56514a]">
              If this page changes in a way that matters, we will update the date
              above. Questions about your data are welcome at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "Privacy question",
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
