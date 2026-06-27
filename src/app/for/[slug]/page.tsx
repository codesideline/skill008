import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { notFound } from "next/navigation";
import { getVertical, verticals, verticalSlugs } from "@/lib/verticals";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return verticalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = getVertical(slug);
  if (!v) {
    return { title: "Not found" };
  }
  const url = `${SITE_URL}/for/${v.slug}`;
  return {
    title: v.title,
    description: v.description,
    keywords: v.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: v.title,
      description: v.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: v.title,
      description: v.description,
    },
  };
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = getVertical(slug);
  if (!v) {
    notFound();
  }

  const url = `${SITE_URL}/for/${v.slug}`;
  const others = verticals.filter((o) => o.slug !== v.slug);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: v.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: v.name, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Nav */}
      <SiteNav />

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pb-6 pt-16">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          {v.eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          {v.h1}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#56514a]">{v.subhead}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/auth/login"
            className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
          >
            Make your first skill
          </Link>
          <Link
            href="/gallery"
            className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
          >
            See the examples
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-16">
        {/* Problem */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-extrabold">
            {v.problem.heading}
          </h2>
          {v.problem.intro && (
            <p className="mt-3 leading-relaxed text-[#56514a]">{v.problem.intro}</p>
          )}
          <ul className="mt-6 space-y-3">
            {v.problem.points.map((p) => (
              <li
                key={p}
                className="flex gap-3 rounded-xl border border-[#E7DFCD] bg-white px-5 py-4 text-sm leading-relaxed text-[#56514a] shadow-sm"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9512C]" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold">{v.skillsHeading}</h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            Each one is a short written guide your AI follows. Draft-only by
            default, so nothing happens without your say-so.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {v.skills.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                  {s.desc}
                </p>
                {s.connects && s.connects.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.connects.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-[#E7DFCD] bg-[#FBEFD0] px-2.5 py-0.5 font-mono text-xs text-[#8a6a1f]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Connections */}
        <section className="mt-16 rounded-2xl border border-[#E7DFCD] bg-white p-7 shadow-sm">
          <h2 className="font-heading text-2xl font-extrabold">
            {v.connections.heading}
          </h2>
          <p className="mt-3 leading-relaxed text-[#56514a]">
            {v.connections.intro}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {v.connections.tools.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-[#E7DFCD] bg-[#F7F3E9] px-3 py-1.5 text-sm font-medium text-[#56514a]"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Segments (optional) */}
        {v.segments && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-extrabold">
              {v.segments.heading}
            </h2>
            {v.segments.intro && (
              <p className="mt-3 leading-relaxed text-[#56514a]">
                {v.segments.intro}
              </p>
            )}
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {v.segments.items.map((seg) => (
                <div
                  key={seg.name}
                  className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
                >
                  <h3 className="font-heading text-lg font-bold">{seg.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                      The pain
                    </span>
                    <br />
                    {seg.pain}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#56514a]">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#C9512C]">
                      The skill
                    </span>
                    <br />
                    {seg.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* How it works trust strip */}
        <section className="mt-16 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-7">
          <h2 className="font-heading text-xl font-extrabold">
            You bring the assistant. We bring the guide.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#56514a]">
            Skill008 does not log in for you and does not store your data. You
            show a task once, we write it up as a skill, and the AI you already
            use runs it on your own access. New to any of this?{" "}
            <Link
              href="/learn"
              className="font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
            >
              Start with how it works
            </Link>
            .
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold">
            Questions people ask
          </h2>
          <div className="mt-6 space-y-3">
            {v.faq.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-base font-bold">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-[#E7DFCD] bg-white p-8 text-center shadow-sm">
          <h2 className="font-heading text-2xl font-extrabold">{v.cta.heading}</h2>
          <p className="mt-2 text-[#56514a]">{v.cta.sub}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make your first skill
            </Link>
            <Link
              href="/gallery"
              className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              Browse the gallery
            </Link>
          </div>
        </section>

        {/* Companion deep-dive page, when present */}
        {v.companion && (
          <section className="mt-16">
            <div className="flex flex-col gap-6 rounded-2xl border border-[#F5B62B] bg-[#FBEFD0] p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-xl">
                <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
                  {v.companion.eyebrow}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight">
                  {v.companion.heading}
                </h2>
                <p className="mt-2 leading-relaxed text-[#56514a]">
                  {v.companion.body}
                </p>
              </div>
              <Link
                href={v.companion.href}
                className="inline-block flex-shrink-0 self-start rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618] md:self-auto"
              >
                {v.companion.cta}
              </Link>
            </div>
          </section>
        )}

        {/* Cross-links to other verticals */}
        <section className="mt-16">
          <h2 className="font-heading text-xl font-extrabold">
            More skills for your world
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/for/${o.slug}`}
                className="group rounded-xl border border-[#E7DFCD] bg-white px-5 py-4 shadow-sm transition-colors hover:border-[#F5B62B]"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-[#8a8478]">
                  {o.eyebrow}
                </p>
                <p className="mt-1 font-heading text-base font-bold text-[#20201E]">
                  {o.name}{" "}
                  <span className="text-[#C9512C] transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
