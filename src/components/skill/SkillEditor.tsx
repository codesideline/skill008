"use client";

import { useState } from "react";

interface SkillStep {
  title: string;
  description: string;
  order: number;
}

interface SkillEditorProps {
  skill: {
    id: string;
    title: string;
    base_content: string;
    structured_json: {
      goal: string;
      when_to_use: string;
      criteria: string;
      steps: SkillStep[];
      tools_referenced: string[];
      guardrails: string[];
    } | null;
    revision_quota: number;
    revisions_used: number;
  };
  connectors: { connector_key: string }[];
}

export default function SkillEditor({ skill, connectors }: SkillEditorProps) {
  const [view, setView] = useState<"editor" | "raw">("editor");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const structure = skill.structured_json;

  const [steps, setSteps] = useState<SkillStep[]>(structure?.steps || []);
  const [guardrails, setGuardrails] = useState<string[]>(structure?.guardrails || []);
  const [criteria, setCriteria] = useState(structure?.criteria || "");
  const [rawContent, setRawContent] = useState(skill.base_content);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    const updatedStructure = {
      ...structure,
      criteria,
      steps,
      guardrails,
    };

    // Rebuild markdown from structure
    const lines: string[] = [];
    lines.push("---");
    lines.push(`name: ${skill.title}`);
    lines.push(`description: ${structure?.goal || ""}`);
    lines.push(`trigger: ${structure?.when_to_use || ""}`);
    lines.push(`tools_needed: [${structure?.tools_referenced?.join(", ") || ""}]`);
    lines.push("---");
    lines.push("");
    lines.push(`# ${skill.title}`);
    lines.push("");
    lines.push("## Purpose");
    lines.push(structure?.goal || "");
    lines.push("");
    lines.push("## Criteria");
    lines.push(criteria);
    lines.push("");
    lines.push("## Steps");
    for (const step of steps) {
      lines.push(`${step.order}. **${step.title}**`);
      lines.push(`   ${step.description}`);
    }
    lines.push("");
    lines.push("## Guardrails");
    for (const g of guardrails) {
      lines.push(`- ${g}`);
    }

    const content = view === "raw" ? rawContent : lines.join("\n");

    try {
      const res = await fetch(`/api/skills/${skill.id}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          structured_json: updatedStructure,
          note: "Edited in card editor",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Save failed");
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  function moveStep(index: number, direction: -1 | 1) {
    const newSteps = [...steps];
    const target = index + direction;
    if (target < 0 || target >= newSteps.length) return;
    [newSteps[index], newSteps[target]] = [newSteps[target], newSteps[index]];
    // Reorder
    setSteps(newSteps.map((s, i) => ({ ...s, order: i + 1 })));
  }

  function updateStep(index: number, field: "title" | "description", value: string) {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  }

  function removeStep(index: number) {
    setSteps(steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 })));
  }

  function addStep() {
    setSteps([...steps, { title: "", description: "", order: steps.length + 1 }]);
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-[#141418] p-1 rounded-lg">
          <button
            onClick={() => setView("editor")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              view === "editor" ? "bg-zinc-800 text-white" : "text-zinc-500"
            }`}
          >
            Card editor
          </button>
          <button
            onClick={() => setView("raw")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              view === "raw" ? "bg-zinc-800 text-white" : "text-zinc-500"
            }`}
          >
            Raw markdown
          </button>
        </div>

        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-[#c8f040]">Saved</span>}
          <span className="text-xs text-zinc-600">
            {skill.revisions_used}/{skill.revision_quota} revisions used
          </span>
          <button
            onClick={handleSave}
            disabled={saving || skill.revisions_used >= skill.revision_quota}
            className="bg-[#c8f040] text-[#0a0a0c] font-semibold px-4 py-2 rounded text-xs hover:bg-[#a0c030] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save version"}
          </button>
        </div>
      </div>

      {/* Connectors strip */}
      {connectors.length > 0 && (
        <div className="flex items-center gap-2 mb-6 px-4 py-2.5 bg-[#141418] border border-zinc-800 rounded-lg">
          <span className="text-xs text-zinc-500">Needs:</span>
          {connectors.map((c) => (
            <span
              key={c.connector_key}
              className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded"
            >
              {c.connector_key}
            </span>
          ))}
        </div>
      )}

      {view === "editor" ? (
        <div className="space-y-4">
          {/* Criteria card */}
          <div className="bg-[#141418] border border-zinc-800 rounded-lg p-5">
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Criteria
            </label>
            <textarea
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              rows={3}
              className="w-full bg-[#0a0a0c] border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c8f040] resize-y"
            />
          </div>

          {/* Steps cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-zinc-500">Steps</span>
              <button
                onClick={addStep}
                className="text-xs text-[#c8f040] hover:underline"
              >
                + Add step
              </button>
            </div>

            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-[#141418] border border-zinc-800 rounded-lg p-4 group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1 pt-1">
                    <button
                      onClick={() => moveStep(i, -1)}
                      className="text-zinc-600 hover:text-zinc-300 text-xs"
                    >
                      &#9650;
                    </button>
                    <span className="text-[#c8f040] font-mono text-xs text-center">
                      {step.order}
                    </span>
                    <button
                      onClick={() => moveStep(i, 1)}
                      className="text-zinc-600 hover:text-zinc-300 text-xs"
                    >
                      &#9660;
                    </button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      value={step.title}
                      onChange={(e) => updateStep(i, "title", e.target.value)}
                      placeholder="Step title"
                      className="w-full bg-transparent border-b border-zinc-800 text-white text-sm font-medium pb-1 focus:outline-none focus:border-[#c8f040]"
                    />
                    <textarea
                      value={step.description}
                      onChange={(e) => updateStep(i, "description", e.target.value)}
                      placeholder="What to do..."
                      rows={2}
                      className="w-full bg-[#0a0a0c] border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-[#c8f040] resize-y"
                    />
                  </div>
                  <button
                    onClick={() => removeStep(i)}
                    className="text-zinc-700 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &#10005;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Guardrails */}
          <div className="bg-[#141418] border border-zinc-800 rounded-lg p-5">
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Guardrails
            </label>
            <div className="space-y-2">
              {guardrails.map((g, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-zinc-600 text-xs">-</span>
                  <input
                    value={g}
                    onChange={(e) => {
                      const newG = [...guardrails];
                      newG[i] = e.target.value;
                      setGuardrails(newG);
                    }}
                    className="flex-1 bg-transparent border-b border-zinc-800 text-sm text-zinc-300 pb-0.5 focus:outline-none focus:border-[#c8f040]"
                  />
                  <button
                    onClick={() => setGuardrails(guardrails.filter((_, j) => j !== i))}
                    className="text-zinc-700 hover:text-red-400 text-xs"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
              <button
                onClick={() => setGuardrails([...guardrails, ""])}
                className="text-xs text-[#c8f040] hover:underline"
              >
                + Add guardrail
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Raw markdown view */
        <textarea
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          className="w-full h-[500px] bg-[#141418] border border-zinc-800 rounded-lg px-4 py-3 font-mono text-xs text-zinc-300 focus:outline-none focus:border-[#c8f040] resize-y"
        />
      )}
    </div>
  );
}
