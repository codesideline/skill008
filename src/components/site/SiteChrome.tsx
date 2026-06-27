import Link from "next/link";

const navLinks = [
  { href: "/learn", label: "How it works" },
  { href: "/gallery", label: "Skill examples" },
  { href: "/connect", label: "MCP servers" },
  { href: "/fde", label: "FDE jobs" },
  { href: "/job-seeker-cos", label: "Career coach" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E7DFCD] bg-[#F7F3E9]/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-base font-bold tracking-tight">
          skill
          <span className="ml-0.5 rounded bg-[#F5B62B] px-1 text-[#20201E]">
            008
          </span>
        </Link>
        <div className="flex items-center gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden text-sm text-[#6E685D] transition-colors hover:text-[#20201E] sm:inline"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className="hidden text-sm text-[#6E685D] transition-colors hover:text-[#20201E] sm:inline"
          >
            Sign in
          </Link>
          <Link
            href="/auth/login"
            className="rounded-lg bg-[#F5B62B] px-4 py-2 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
          >
            Make a skill
          </Link>
        </div>
      </nav>
    </header>
  );
}

const footerColumns: {
  heading: string;
  links: { href: string; label: string }[];
}[] = [
  {
    heading: "Product",
    links: [
      { href: "/auth/login", label: "Make a skill" },
      { href: "/gallery", label: "Skill examples" },
      { href: "/connect", label: "MCP servers" },
      { href: "/fde", label: "FDE jobs" },
      { href: "/job-seeker-cos", label: "Career coach" },
      { href: "/for/job-helper", label: "Job search skills" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/learn", label: "How it works" },
      { href: "/learn/harness", label: "What is a harness" },
      { href: "/learn/mcp", label: "MCP explained" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#E7DFCD] bg-[#F7F3E9]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-mono text-base font-bold tracking-tight"
            >
              skill
              <span className="ml-0.5 rounded bg-[#F5B62B] px-1 text-[#20201E]">
                008
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#6E685D]">
              Turn the work you repeat into a short guide your AI can run. No
              passwords, no data, no screenshots stored.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#8a8478]">
                {col.heading}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#56514a] transition-colors hover:text-[#20201E]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-[#E7DFCD] pt-6 text-xs text-[#8a8478] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Skill008. Your next agent, trained.</p>
          <p>The skill runs in your tools, not ours.</p>
        </div>
      </div>
    </footer>
  );
}
