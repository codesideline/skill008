"use client";

import { useState } from "react";

export function ShareActions({
  content,
  title,
  filename,
  copyLabel = "Copy",
  downloadLabel = "Download .md",
}: {
  content: string;
  title: string;
  filename?: string;
  copyLabel?: string;
  downloadLabel?: string;
}) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const downloadName = filename ?? `${slug}.skill.md`;
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex gap-3">
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(content);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="rounded-lg bg-[#F5B62B] px-5 py-2.5 text-sm font-semibold text-[#20201E] shadow-sm transition-colors hover:bg-[#E7A618]"
      >
        {copied ? "Copied" : copyLabel}
      </button>
      <button
        onClick={() => {
          const blob = new Blob([content], { type: "text/markdown" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = downloadName;
          a.click();
          URL.revokeObjectURL(url);
        }}
        className="rounded-lg border border-[#20201E]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#20201E] transition-colors hover:border-[#20201E]/40"
      >
        {downloadLabel}
      </button>
    </div>
  );
}
