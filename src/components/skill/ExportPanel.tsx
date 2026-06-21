"use client";

import { useState } from "react";
import { EXPORT_TARGETS, type Harness } from "@/types";

export default function ExportPanel({ skillId }: { skillId: string }) {
  const [loading, setLoading] = useState(false);
  const [exportData, setExportData] = useState<{
    harness: string;
    path: string;
    content: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleExport(harness: Harness) {
    setLoading(true);
    try {
      const res = await fetch(`/api/skills/${skillId}/export?harness=${harness}`);
      const data = await res.json();
      setExportData(data);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!exportData) return;
    navigator.clipboard.writeText(exportData.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!exportData) return;
    const blob = new Blob([exportData.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportData.path.split("/").pop() || "SKILL.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
        Export
      </h3>

      <div className="space-y-2">
        {EXPORT_TARGETS.map((target) => (
          <button
            key={target.harness}
            onClick={() => handleExport(target.harness)}
            disabled={loading}
            className="w-full text-left bg-[#141418] border border-zinc-800 rounded-lg p-3 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">{target.label}</p>
                <p className="text-xs text-zinc-600 font-mono mt-0.5">
                  {target.path}
                </p>
              </div>
              <span className="text-xs text-zinc-600">&#9654;</span>
            </div>
          </button>
        ))}
      </div>

      {exportData && (
        <div className="mt-4 bg-[#141418] border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono text-zinc-400">{exportData.path}</p>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="text-xs text-[#c8f040] hover:underline"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="text-xs text-[#c8f040] hover:underline"
              >
                Download
              </button>
            </div>
          </div>
          <pre className="text-xs text-zinc-400 whitespace-pre-wrap bg-[#0a0a0c] rounded p-3 max-h-48 overflow-y-auto">
            {exportData.content}
          </pre>
        </div>
      )}
    </div>
  );
}
