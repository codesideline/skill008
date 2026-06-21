"use client";

export function ShareActions({ content, title }: { content: string; title: string }) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="flex gap-3">
      <button
        onClick={() => navigator.clipboard.writeText(content)}
        className="rounded-lg bg-[#F5B62B] px-5 py-2.5 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
      >
        Copy
      </button>
      <button
        onClick={() => {
          const blob = new Blob([content], { type: "text/markdown" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${slug}.skill.md`;
          a.click();
          URL.revokeObjectURL(url);
        }}
        className="rounded-lg border border-[#20201E]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
      >
        Download .md
      </button>
    </div>
  );
}
