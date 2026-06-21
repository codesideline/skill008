import type { Metadata } from "next";
import Link from "next/link";
import { LearnNav, LearnFooter } from "@/components/landing/LearnShared";
import { ConnectorLogo } from "@/components/landing/ConnectorLogo";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
  connectorCategories,
  availabilityLabels,
  connectorCount,
  connectorSlug,
  type Availability,
} from "@/lib/connectors";

const url = `${SITE_URL}/connect`;
const title = "MCP servers for the apps you use | Skill008";
const description =
  "A plain English directory of MCP servers for popular business apps: email, chat, meetings, CRM, accounting, and the trades. See what is official, what is community, and how to connect safely.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "MCP servers",
    "MCP directory",
    "Model Context Protocol",
    "Slack MCP server",
    "Gmail MCP server",
    "QuickBooks MCP",
    "Jobber MCP",
    "Salesforce MCP",
    "connect AI to your apps",
  ],
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

function Badge({ availability }: { availability: Availability }) {
  const meta = availabilityLabels[availability];
  const isOfficial = availability === "official";
  return (
    <span
      title={meta.hint}
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider " +
        (isOfficial
          ? "border-[#F5B62B] bg-[#FBEFD0] text-[#8a5a13]"
          : "border-[#E7DFCD] bg-white text-[#8a8478]")
      }
    >
      <span
        className={
          "h-1.5 w-1.5 rounded-full " +
          (isOfficial ? "bg-[#C9512C]" : "bg-[#b8b2a4]")
        }
      />
      {meta.label}
    </span>
  );
}

export default function ConnectPage() {
  const total = connectorCount();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Connect your tools", item: url },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MCP servers for popular business apps",
    itemListElement: connectorCategories
      .flatMap((c) => c.connectors)
      .map((connector, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: connector.name,
      })),
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <LearnNav />

      <main className="mx-auto max-w-5xl px-6 py-16">
        {/* Hero */}
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Connect your tools
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          What your assistant can plug into
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#56514a]">
          MCP is the universal adapter that lets your assistant reach your other
          apps. Here are {total} of the most common ones, from email and chat to
          your accounting and your field service software. It is a map of what
          exists, not a setup you have to do.
        </p>

        {/* Logo map: quick jump */}
        <div className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8a8478]">
            Jump to an app
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {connectorCategories
              .flatMap((c) => c.connectors)
              .map((connector) => (
                <a
                  key={connector.name}
                  href={`#${connectorSlug(connector.name)}`}
                  title={connector.name}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#E7DFCD] bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition-colors hover:border-[#F5B62B] hover:bg-[#FBEFD0]"
                >
                  <ConnectorLogo name={connector.name} size="sm" />
                  <span className="text-sm font-medium">{connector.name}</span>
                </a>
              ))}
          </div>
        </div>

        {/* Legend + safety */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E7DFCD] bg-white p-5 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-[#8a8478]">
              What the labels mean
            </p>
            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-3">
                <Badge availability="official" />
                <p className="text-sm leading-relaxed text-[#6E685D]">
                  {availabilityLabels.official.hint}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge availability="community" />
                <p className="text-sm leading-relaxed text-[#6E685D]">
                  {availabilityLabels.community.hint}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-5 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-[#8a8478]">
              Before you connect anything
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#56514a]">
              This list moves fast, so treat it as a starting point, not an
              endorsement. On a work machine, check with IT first. When in
              doubt, start read only and connect your own files before company
              data.
            </p>
            <Link
              href="/learn/mcp"
              className="mt-3 inline-block font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
            >
              Read the two minute safety guide &rarr;
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-14 space-y-12">
          {connectorCategories.map((category) => (
            <section key={category.id}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-2xl font-extrabold">
                  {category.title}
                </h2>
                <span className="font-mono text-xs text-[#8a8478]">
                  {category.connectors.length}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                {category.blurb}
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.connectors.map((connector) => (
                  <div
                    key={connector.name}
                    id={connectorSlug(connector.name)}
                    className="flex scroll-mt-24 flex-col rounded-2xl border border-[#E7DFCD] bg-white p-5 shadow-sm [&:target]:ring-2 [&:target]:ring-[#F5B62B] [&:target]:ring-offset-2 [&:target]:ring-offset-[#F7F3E9]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <ConnectorLogo name={connector.name} />
                        <h3 className="font-heading text-lg font-bold leading-tight">
                          {connector.name}
                        </h3>
                      </div>
                      <Badge availability={connector.availability} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                      {connector.use}
                    </p>
                    {connector.note && (
                      <p className="mt-2 font-mono text-xs text-[#8a8478]">
                        {connector.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Not listed */}
        <section className="mt-14 rounded-2xl border border-[#E7DFCD] bg-white p-7 shadow-sm">
          <h2 className="font-heading text-xl font-extrabold">
            Don&apos;t see your app?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#56514a]">
            New servers show up every week, and the aggregators above reach
            hundreds of tools that have none of their own. To check the latest,
            browse the official registry.
          </p>
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-semibold text-[#C9512C] underline decoration-[#F5B62B] decoration-2 underline-offset-2 hover:text-[#a83f1f]"
          >
            modelcontextprotocol.io &rarr;
          </a>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-8 text-center shadow-sm">
          <h2 className="font-heading text-2xl font-extrabold">
            You don&apos;t need a single connector to start.
          </h2>
          <p className="mt-2 text-[#56514a]">
            Make a skill first. Add a tool later, only when you are ready.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#F5B62B] px-6 py-3 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
            >
              Make your first skill
            </Link>
            <Link
              href="/learn/mcp"
              className="rounded-lg border border-[#20201E]/15 bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
            >
              How to connect safely
            </Link>
          </div>
        </section>
      </main>

      <LearnFooter />
    </div>
  );
}
