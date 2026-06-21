import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { faqSections, allFaqs } from "@/lib/faqs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ: MCP servers, skills, and staying safe",
  description:
    "Plain-language answers about MCP servers, agent skills and harnesses, privacy, and using Skill008. No jargon.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "Skill008 FAQ",
    description:
      "Plain-language answers about MCP servers, agent skills, privacy, and using Skill008.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Questions and answers
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          The questions people actually ask.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
          New to skills, harnesses, and MCP servers? Start here. Short answers,
          no jargon, written for someone who has never set one up.
        </p>

        {/* Section jump links */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {faqSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-[#E7DFCD] bg-white px-4 py-2 text-sm font-semibold text-[#6E685D] transition-colors hover:border-[#F5B62B] hover:text-[#20201E]"
            >
              {s.title}
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className="mt-14 space-y-14">
          {faqSections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-heading text-2xl font-extrabold">{s.title}</h2>
              <p className="mt-2 text-[15px] text-[#6E685D]">{s.blurb}</p>
              <div className="mt-6 space-y-3">
                {s.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-[#E7DFCD] bg-white p-5 shadow-sm open:border-[#F5B62B]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="font-heading text-base font-bold">
                        {item.q}
                      </span>
                      <span className="font-mono text-lg text-[#C9512C] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-[#56514a]">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-16 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-6 text-center shadow-sm md:p-8">
          <h2 className="font-heading text-2xl font-extrabold">
            Still have a question?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6E685D]">
            Tell us the task you are stuck on. We will point you at the closest
            starter skill.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-[#F5B62B] px-5 py-2.5 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Contact us
            </Link>
            <Link
              href="/gallery"
              className="rounded-lg border border-[#E7DFCD] bg-white px-5 py-2.5 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#F5B62B]"
            >
              Browse the gallery
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
