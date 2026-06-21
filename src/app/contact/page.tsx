import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Skill008",
  description:
    "Get in touch with Skill008. Questions about MCP servers, help building a skill, or privacy and data, we are one email away.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Skill008",
    description: "Questions, help with a skill, or privacy. One email away.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

const routes = [
  {
    label: "General questions",
    desc: "Not sure where to start, or just curious how it works.",
    subject: "Hello from the site",
  },
  {
    label: "Help with a skill",
    desc: "Stuck building or running one. Tell us the task and we will help.",
    subject: "Help with a skill",
  },
  {
    label: "Privacy and data",
    desc: "Anything about what is stored, access, or your account.",
    subject: "Privacy question",
  },
];

const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
          Get in touch
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
          Tell us what you are stuck on.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#56514a]">
          A real person reads these. The more you can tell us about the task you
          keep redoing, the faster we can point you at the right starter skill.
        </p>

        {/* Primary email card */}
        <div className="mt-10 rounded-2xl border border-[#E7DFCD] bg-white p-6 shadow-sm md:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8a8478]">
            Email us
          </p>
          <a
            href={mailto("Hello from the site")}
            className="mt-2 block font-heading text-2xl font-extrabold text-[#20201E] hover:text-[#C9512C]"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={mailto("Hello from the site")}
            className="mt-5 inline-block rounded-lg bg-[#F5B62B] px-5 py-2.5 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
          >
            Start an email
          </a>
        </div>

        {/* Routes */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-extrabold">
            Pick the right line
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {routes.map((r) => (
              <a
                key={r.label}
                href={mailto(r.subject)}
                className="group rounded-2xl border border-[#E7DFCD] bg-white p-5 shadow-sm transition-colors hover:border-[#F5B62B]"
              >
                <h3 className="font-heading text-base font-bold">{r.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6E685D]">
                  {r.desc}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-[#C9512C]">
                  Email about this →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12 rounded-2xl border border-[#E7DFCD] bg-[#FBEFD0] p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-xl font-extrabold">
            What helps us help you
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#56514a]">
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5B62B]" />
              The task you keep repeating, in your own words.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5B62B]" />
              The tools it touches, like your email, CRM, or files.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5B62B]" />
              Which AI app you use, if you know it.
            </li>
          </ul>
        </section>

        {/* FAQ nudge */}
        <p className="mt-10 text-center text-sm text-[#6E685D]">
          Quick question? It may already be answered on the{" "}
          <Link href="/faq" className="font-semibold text-[#C9512C] hover:underline">
            FAQ
          </Link>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
