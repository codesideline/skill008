"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface GeneratedSkill {
  title: string;
  goal: string;
  when_to_use: string;
  criteria: string;
  steps: { title: string; description: string; order: number }[];
  tools_referenced: string[];
  guardrails: string[];
  markdown: string;
}

export default function NewSkillPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"describe" | "screenshot">("describe");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<GeneratedSkill | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    try {
      const payload: Record<string, string> =
        tab === "describe"
          ? { type: "description", description }
          : { type: "screenshot", screenshot: screenshotData, mediaType: screenshotType };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      setGenerated(data.skill);
      setConfirming(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmAndSave() {
    if (!generated) return;
    setLoading(true);

    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generated.title,
          base_content: generated.markdown,
          structured_json: {
            goal: generated.goal,
            when_to_use: generated.when_to_use,
            criteria: generated.criteria,
            steps: generated.steps,
            tools_referenced: generated.tools_referenced,
            guardrails: generated.guardrails,
          },
          connectors: generated.tools_referenced,
          input_type: tab,
          original_input: description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      router.push(`/skill/${data.skill.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  // Screenshot state
  const [screenshotData, setScreenshotData] = useState("");
  const [screenshotType, setScreenshotType] = useState("image/png");
  const [screenshotName, setScreenshotName] = useState("");

  function handleScreenshot(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setScreenshotName(file.name);
    setScreenshotType(file.type as "image/png");

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip data URL prefix to get base64
      setScreenshotData(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }

  // Confirmation view
  if (confirming && generated) {
    return (
      <div className="min-h-screen bg-[#0a0a0c]">
        <header className="border-b border-zinc-800 px-6 py-4">
          <span className="font-mono text-sm font-bold text-white">
            skill<span className="text-[#c8f040]">008</span>
          </span>
        </header>

        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-[#c8f040] mb-2">
              // Confirm criteria
            </p>
            <h1 className="text-2xl font-bold text-white mb-2">{generated.title}</h1>
            <p className="text-sm text-zinc-400">
              Review the extracted criteria below. Fix anything that looks wrong.
            </p>
          </div>

          {/* Criteria confirmation */}
          <div className="bg-[#141418] border border-zinc-800 rounded-lg p-6 mb-6">
            <h3 className="text-sm font-semibold text-white mb-3">
              Here&apos;s how I&apos;ll decide which items match:
            </h3>
            <p className="text-zinc-300 leading-relaxed">{generated.criteria}</p>
            <p className="text-zinc-500 text-sm mt-4 italic">Right?</p>
          </div>

          {/* Steps preview */}
          <div className="bg-[#141418] border border-zinc-800 rounded-lg p-6 mb-6">
            <h3 className="text-sm font-semibold text-white mb-3">Steps:</h3>
            <div className="space-y-3">
              {generated.steps.map((step) => (
                <div key={step.order} className="flex gap-3">
                  <span className="text-[#c8f040] font-mono text-xs mt-1">
                    {step.order}.
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{step.title}</p>
                    <p className="text-zinc-400 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connectors */}
          {generated.tools_referenced.length > 0 && (
            <div className="bg-[#141418] border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">
                Needs in your harness:
              </h3>
              <div className="flex flex-wrap gap-2">
                {generated.tools_referenced.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-1 rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Guardrails */}
          <div className="bg-[#141418] border border-zinc-800 rounded-lg p-6 mb-8">
            <h3 className="text-sm font-semibold text-white mb-3">Guardrails:</h3>
            <ul className="space-y-1">
              {generated.guardrails.map((g, i) => (
                <li key={i} className="text-sm text-zinc-400 flex gap-2">
                  <span className="text-zinc-600">-</span> {g}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <p className="text-sm text-red-400 mb-4">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleConfirmAndSave}
              disabled={loading}
              className="bg-[#c8f040] text-[#0a0a0c] font-semibold px-5 py-2.5 rounded text-sm hover:bg-[#a0c030] transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Looks good \u2014 save it"}
            </button>
            <button
              onClick={() => {
                setConfirming(false);
                setGenerated(null);
              }}
              className="border border-zinc-700 text-zinc-300 px-5 py-2.5 rounded text-sm hover:border-zinc-500 transition-colors"
            >
              Fix this
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <header className="border-b border-zinc-800 px-6 py-4">
        <span className="font-mono text-sm font-bold text-white">
          skill<span className="text-[#c8f040]">008</span>
        </span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#c8f040] mb-2">
            // New skill
          </p>
          <h1 className="text-2xl font-bold text-white">Show us the task</h1>
          <p className="text-sm text-zinc-400 mt-2">
            Describe what you do, or screenshot the filter/report you check.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[#141418] p-1 rounded-lg w-fit">
          <button
            onClick={() => setTab("describe")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              tab === "describe"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Describe it
          </button>
          <button
            onClick={() => setTab("screenshot")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              tab === "screenshot"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Screenshot it
          </button>
        </div>

        {/* Describe tab */}
        {tab === "describe" && (
          <div className="space-y-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Every Monday I check Salesforce for partner deals with no activity in 14 days, then draft a status check email to the partner contact..."
              rows={6}
              className="w-full bg-[#141418] border border-zinc-800 rounded-lg px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#c8f040] transition-colors resize-y"
            />
            <p className="text-xs text-zinc-600">
              Be specific about: what you check, the criteria/filters, what you do with the results.
            </p>
          </div>
        )}

        {/* Screenshot tab */}
        {tab === "screenshot" && (
          <div className="space-y-4">
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center hover:border-[#c8f040] transition-colors">
                {screenshotName ? (
                  <p className="text-[#c8f040] text-sm">{screenshotName}</p>
                ) : (
                  <>
                    <p className="text-zinc-400 text-sm mb-1">
                      Drop a screenshot here or click to upload
                    </p>
                    <p className="text-xs text-zinc-600">
                      PNG, JPG, or WEBP. Crop to the filter/criteria if possible.
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleScreenshot}
                className="hidden"
              />
            </label>
            <p className="text-xs text-zinc-600">
              Tip: crop to show just the filter panel, not the full data. We extract the criteria and discard the image immediately.
            </p>
          </div>
        )}

        {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={
            loading ||
            (tab === "describe" && !description.trim()) ||
            (tab === "screenshot" && !screenshotData)
          }
          className="mt-6 bg-[#c8f040] text-[#0a0a0c] font-semibold px-5 py-2.5 rounded text-sm hover:bg-[#a0c030] transition-colors disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate skill"}
        </button>

        <p className="text-xs text-zinc-700 mt-4">
          Demo mode: generation requires an Anthropic API key configured on the server.
        </p>
      </main>
    </div>
  );
}
