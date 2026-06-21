export type Visibility = "private" | "unlisted" | "public";
export type InputType = "description" | "screenshot" | "recording";
export type VariantLabel = "claude" | "gpt" | "fast";
export type Vertical = "crm" | "chief_of_staff";

export interface Connector {
  id: string;
  key: string;
  display_name: string;
  category: string;
  setup_snippets: Record<string, string>;
}

export interface Skill {
  id: string;
  owner_id: string | null;
  title: string;
  vertical: Vertical | null;
  base_content: string;
  structured_json: SkillStructure | null;
  visibility: Visibility;
  is_starter: boolean;
  revision_quota: number;
  revisions_used: number;
  created_at: string;
  updated_at: string;
}

export interface SkillStructure {
  goal: string;
  when_to_use: string;
  criteria: string;
  steps: SkillStep[];
  tools_referenced: string[];
  guardrails: string[];
}

export interface SkillStep {
  title: string;
  description: string;
  order: number;
}

export interface SkillVersion {
  id: string;
  skill_id: string;
  version_no: number;
  content: string;
  structured_json: SkillStructure | null;
  note: string | null;
  plain_english_changelog: string | null;
  created_at: string;
}

export interface SkillVariant {
  id: string;
  skill_id: string;
  variant_label: VariantLabel;
  content: string;
  created_at: string;
}

export interface Capture {
  id: string;
  owner_id: string;
  input_type: InputType;
  sanitized_trace: Record<string, unknown> | null;
  observed_apps: string[];
  secret_scan_passed: boolean;
  created_at: string;
}

export interface SkillConnector {
  skill_id: string;
  connector_key: string;
}

export interface Purchase {
  id: string;
  owner_id: string;
  skill_id: string;
  stripe_session_id: string;
  amount: number;
  created_at: string;
}

// Harness targets for export
export type Harness = "claude_code" | "copilot" | "copilot_agent" | "cursor" | "agents_md";

export interface ExportTarget {
  harness: Harness;
  label: string;
  path: string;
  description: string;
}

export const EXPORT_TARGETS: ExportTarget[] = [
  {
    harness: "claude_code",
    label: "Claude Code",
    path: ".claude/skills/<name>/SKILL.md",
    description: "Drop into your Claude Code skills directory",
  },
  {
    harness: "copilot",
    label: "GitHub Copilot",
    path: ".github/skills/<name>/SKILL.md",
    description: "Works with Copilot Agent Mode",
  },
  {
    harness: "copilot_agent",
    label: "Copilot Custom Agent",
    path: "<name>.agent.md",
    description: "Standalone agent file for Copilot",
  },
  {
    harness: "cursor",
    label: "Cursor",
    path: ".cursor/skills/<name>/SKILL.md",
    description: "Add to your Cursor skills",
  },
  {
    harness: "agents_md",
    label: "AGENTS.md snippet",
    path: "AGENTS.md",
    description: "Append to any AGENTS.md for cross-tool use",
  },
];
