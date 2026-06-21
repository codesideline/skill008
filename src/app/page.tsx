import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 py-4 flex items-center justify-between bg-[#0a0a0c]/90 backdrop-blur-md border-b border-zinc-800/50 z-50">
        <div className="font-mono text-sm font-bold">
          skill<span className="text-[#c8f040]">008</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/gallery" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Gallery
          </Link>
          <Link href="/auth/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-2xl mx-auto px-6 pt-40 pb-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
          Bring your own AI.<br />We teach it your job.
        </h1>
        <p className="text-lg text-zinc-400 max-w-lg mx-auto mb-10 leading-relaxed">
          Skill008 turns the work you do by hand into a skill your AI agent runs for you.
          Any assistant you already use. Your keys, never ours.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/auth/login"
            className="bg-[#c8f040] text-[#0a0a0c] font-semibold px-6 py-3 rounded-md text-sm hover:bg-[#a0c030] transition-colors"
          >
            Make your first skill — free
          </Link>
          <Link
            href="/gallery"
            className="border border-zinc-700 text-zinc-300 px-6 py-3 rounded-md text-sm hover:border-zinc-500 hover:text-white transition-colors"
          >
            Browse gallery
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#c8f040] mb-4">
          // How it works
        </p>
        <h2 className="text-2xl font-bold mb-8">Three steps. That&apos;s it.</h2>
        <div className="space-y-6">
          {[
            { n: "1", title: "Show it.", desc: "Describe your task or screenshot the CRM filter you already use." },
            { n: "2", title: "Confirm it.", desc: "We read the criteria and say them back in plain English. You fix or approve." },
            { n: "3", title: "Run it.", desc: "Get a skill that works in your assistant. Drop it in, run it forever." },
          ].map((step) => (
            <div key={step.n} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#c8f040]/30 bg-[#c8f040]/10 flex items-center justify-center font-mono text-xs font-bold text-[#c8f040]">
                {step.n}
              </div>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-zinc-400 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#c8f040] mb-4">
          // Why it&apos;s different
        </p>
        <div className="space-y-4">
          {[
            { title: "Bring your own harness.", desc: "Works with whatever AI you already pay for. You\u2019re never locked in." },
            { title: "We never touch your keys.", desc: "We only write the instructions. Your assistant does the work with your access." },
            { title: "Built for people, not terminals.", desc: "No code. No git. Screenshot, confirm, done." },
          ].map((f) => (
            <div key={f.title} className="bg-[#141418] border border-zinc-800 rounded-lg p-5">
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold mb-3">
          You already have the agent.<br />Hand it the dossier.
        </h2>
        <Link
          href="/auth/login"
          className="inline-block mt-6 bg-[#c8f040] text-[#0a0a0c] font-semibold px-6 py-3 rounded-md text-sm hover:bg-[#a0c030] transition-colors"
        >
          Make your first skill — free
        </Link>
        <p className="font-mono text-xs text-zinc-600 mt-4">Skill008 — skills, issued.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        We never store your passwords, your data, or your screenshots. The skill runs in your tools, not ours.
      </footer>
    </div>
  );
}
