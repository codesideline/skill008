"use client";

export function ShareActions({ content, title }: { content: string; title: string }) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="flex gap-3">
      <button
        onClick={() => navigator.clipboard.writeText(content)}
        className="bg-[#c8f040] text-[#0a0a0c] font-semibold px-5 py-2.5 rounded text-sm hover:bg-[#a0c030] transition-colors"
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
        className="border border-zinc-700 text-zinc-300 px-5 py-2.5 rounded text-sm hover:border-zinc-500 transition-colors"
      >
        Download .md
      </button>
    </div>
  );
}
