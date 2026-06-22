// Shared, runtime-agnostic skill helpers used by the generate Edge Function.
// Kept in sync with src/lib/generate.ts (the Next.js fallback path).

export interface GeneratedSkill {
  title: string;
  goal: string;
  when_to_use: string;
  criteria: string;
  steps: { title: string; description: string; order: number }[];
  tools_referenced: string[];
  guardrails: string[];
  markdown: string;
}

export const SYSTEM_PROMPT =
  `You are Skill008, a tool that converts task descriptions into portable AI agent skills. 

Your job: take the user's task description (or the criteria extracted from a screenshot) and produce a structured, model-agnostic skill that any AI assistant can follow.

Rules:
- Never include any secrets, API keys, passwords, or tokens in the output
- Never instruct the skill to surface, echo, or paste credentials into chat
- Always reference connectors/MCPs by name (e.g., "use the Salesforce MCP") rather than embedding auth
- All skills must be draft-only: they surface information or draft messages, never auto-send or auto-modify records without user confirmation
- Add "never surface a secret in chat" as a guardrail on every skill
- Be specific about filter criteria, thresholds, and logic
- Write steps that any AI assistant (Claude, Copilot, Cursor, Gemini) could follow

Output ONLY valid JSON matching this schema:
{
  "title": "Short skill name",
  "goal": "What this skill accomplishes",
  "when_to_use": "When/how often to run this",
  "criteria": "The exact filter logic / selection criteria in plain English",
  "steps": [{"title": "Step name", "description": "What to do", "order": 1}],
  "tools_referenced": ["salesforce", "gmail", etc.],
  "guardrails": ["never auto-send", "never surface a secret in chat", etc.]
}`;

export function renderSkillMarkdown(
  skill: Omit<GeneratedSkill, "markdown">,
): string {
  const lines: string[] = [];

  lines.push("---");
  lines.push(`name: ${skill.title}`);
  lines.push(`description: ${skill.goal}`);
  lines.push(`trigger: ${skill.when_to_use}`);
  lines.push(`tools_needed: [${skill.tools_referenced.join(", ")}]`);
  lines.push("---");
  lines.push("");
  lines.push(`# ${skill.title}`);
  lines.push("");
  lines.push("## Purpose");
  lines.push(skill.goal);
  lines.push("");
  lines.push("## Criteria");
  lines.push(skill.criteria);
  lines.push("");
  lines.push("## Steps");
  for (const step of skill.steps) {
    lines.push(`${step.order}. **${step.title}**`);
    lines.push(`   ${step.description}`);
  }
  lines.push("");
  lines.push("## Guardrails");
  for (const g of skill.guardrails) {
    lines.push(`- ${g}`);
  }
  lines.push("");

  return lines.join("\n");
}
