"use client";

import { useState, useEffect } from "react";

interface Version {
  id: string;
  version_no: number;
  plain_english_changelog: string | null;
  note: string | null;
  created_at: string;
  content: string;
}

export default function VersionTimeline({ skillId }: { skillId: string }) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState<{ left: Version; right: Version } | null>(null);

  useEffect(() => {
    fetch(`/api/skills/${skillId}/versions`)
      .then((r) => r.json())
      .then((data) => {
        setVersions(data.versions || []);
        setLoading(false);
      });
  }, [skillId]);

  if (loading) {
    return <div className="text-sm text-zinc-600">Loading history...</div>;
  }

  if (versions.length === 0) {
    return <div className="text-sm text-zinc-600">No version history yet.</div>;
  }

  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
        Version History
      </h3>

      {comparing && (
        <div className="bg-[#141418] border border-zinc-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-zinc-400">
              Comparing v{comparing.left.version_no} vs v{comparing.right.version_no}
            </span>
            <button
              onClick={() => setComparing(null)}
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-600 mb-1">v{comparing.left.version_no}</p>
              <pre className="text-xs text-zinc-400 whitespace-pre-wrap bg-[#0a0a0c] rounded p-2 max-h-64 overflow-y-auto">
                {comparing.left.content}
              </pre>
            </div>
            <div>
              <p className="text-xs text-zinc-600 mb-1">v{comparing.right.version_no}</p>
              <pre className="text-xs text-zinc-400 whitespace-pre-wrap bg-[#0a0a0c] rounded p-2 max-h-64 overflow-y-auto">
                {comparing.right.content}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {versions.map((v, i) => (
          <div
            key={v.id}
            className="flex gap-3 items-start"
          >
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-[#c8f040] mt-1.5" />
              {i < versions.length - 1 && (
                <div className="w-px flex-1 bg-zinc-800 mt-1" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">
                  v{v.version_no}
                </span>
                <span className="text-xs text-zinc-700">
                  {new Date(v.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-zinc-300 mt-1">
                {v.plain_english_changelog || v.note || "No changelog."}
              </p>
              <div className="flex gap-2 mt-2">
                {i < versions.length - 1 && (
                  <button
                    onClick={() =>
                      setComparing({ left: versions[i + 1], right: v })
                    }
                    className="text-xs text-zinc-600 hover:text-zinc-300"
                  >
                    Compare
                  </button>
                )}
                <button
                  onClick={async () => {
                    if (!confirm("Restore this version? This will create a new version.")) return;
                    await fetch(`/api/skills/${skillId}/versions`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        content: v.content,
                        structured_json: null,
                        note: `Restored from v${v.version_no}`,
                      }),
                    });
                    window.location.reload();
                  }}
                  className="text-xs text-zinc-600 hover:text-zinc-300"
                >
                  Restore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
