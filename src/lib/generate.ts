import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

export function hasAnthropicKey(): boolean {
  const k = process.env.ANTHROPIC_API_KEY;
  return !!k && k.startsWith("sk-ant");
}

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

const SYSTEM_PROMPT = `You are Skill008, a tool that converts task descriptions into portable AI agent skills. 

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

export async function generateSkillFromDescription(
  description: string
): Promise<GeneratedSkill> {
  const response = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Generate a skill from this task description:\n\n${description}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const structured = JSON.parse(text);
  const markdown = renderSkillMarkdown(structured);

  return { ...structured, markdown };
}

export async function generateSkillFromScreenshot(
  base64Image: string,
  mediaType: "image/png" | "image/jpeg" | "image/webp" = "image/png"
): Promise<GeneratedSkill> {
  const response = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType, data: base64Image },
          },
          {
            type: "text",
            text: "Analyze this screenshot. Identify the task, the application shown, the filter criteria or report logic visible, and generate a skill. Extract criteria VERBATIM from what you see (field names, operators, values). Be precise.",
          },
        ],
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const structured = JSON.parse(text);
  const markdown = renderSkillMarkdown(structured);

  return { ...structured, markdown };
}

export async function generateSkillFromFrames(
  frames: string[],
  mediaType: "image/jpeg" | "image/png" = "image/jpeg",
  note?: string
): Promise<GeneratedSkill> {
  const images = frames.slice(0, 8).map((data) => ({
    type: "image" as const,
    source: { type: "base64" as const, media_type: mediaType, data },
  }));

  const noteLine =
    note && note.trim()
      ? `\n\nThe person also described what they are doing: "${note.trim()}". Use it to disambiguate the workflow, but extract concrete criteria from the frames.`
      : "";

  const response = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          ...images,
          {
            type: "text",
            text:
              "These frames are a screen recording of someone doing a task, in time order. Reconstruct the workflow: which app(s) they use, the filter or selection criteria visible, and each step in order. Then generate a skill. Extract criteria, field names, operators, and thresholds verbatim where you can see them." +
              noteLine,
          },
        ],
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const structured = JSON.parse(text);
  const markdown = renderSkillMarkdown(structured);

  return { ...structured, markdown };
}

export async function generateChangelog(
  oldContent: string,
  newContent: string
): Promise<string> {
  const response = await anthropic.messages.create({
    model,
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `Write a brief, plain-English changelog (1-2 sentences) describing what changed between these two skill versions. No technical jargon.\n\nOLD:\n${oldContent}\n\nNEW:\n${newContent}`,
      },
    ],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}

export function getSampleSkill(): GeneratedSkill {
  const structured = {
    title: "Stale Deal Status Check",
    goal: "Surface open deals with no recent activity so they get a follow-up before they go cold.",
    when_to_use: "Every Monday morning, or before a pipeline review.",
    criteria:
      "Open opportunities where the stage is not Closed and the last activity was more than 14 days ago, sorted by amount with the largest first.",
    steps: [
      {
        title: "Pull open deals",
        description:
          "Use the CRM connector to list opportunities that are still open (stage is not Closed Won or Closed Lost).",
        order: 1,
      },
      {
        title: "Filter to stale ones",
        description: "Keep only deals with no logged activity in the last 14 days.",
        order: 2,
      },
      {
        title: "Rank by value",
        description: "Sort the remaining deals from largest amount to smallest.",
        order: 3,
      },
      {
        title: "Draft a nudge",
        description:
          "For the top deals, draft a short, friendly check-in for the deal owner. Do not send it.",
        order: 4,
      },
    ],
    tools_referenced: ["salesforce"],
    guardrails: [
      "Never auto-send or change a record without the user confirming first",
      "Never surface a secret, password, or API key in chat",
      "Only draft messages; the user decides what actually goes out",
    ],
  };

  const markdown = renderSkillMarkdown(structured);
  return { ...structured, markdown };
}

function renderSkillMarkdown(skill: Omit<GeneratedSkill, "markdown">): string {
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
