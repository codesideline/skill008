-- Skill008 database schema
-- Run this in your Supabase SQL editor or as a migration

-- Enable UUID generation

-- =============================================================
-- CONNECTORS (seeded registry of known integrations)
-- =============================================================
create table public.connectors (
  id uuid primary key default gen_random_uuid(),
  key text unique not null, -- e.g. 'salesforce', 'gmail'
  display_name text not null,
  category text not null, -- e.g. 'CRM', 'Email', 'Messaging'
  setup_snippets jsonb not null default '{}', -- per-harness setup instructions
  created_at timestamptz not null default now()
);

-- Seed connectors
insert into public.connectors (key, display_name, category, setup_snippets) values
  ('salesforce', 'Salesforce', 'CRM', '{"claude_code": "Add the Salesforce MCP server to your claude_desktop_config.json", "copilot": "Install the Salesforce extension for GitHub Copilot", "cursor": "Add the Salesforce MCP to your Cursor settings"}'),
  ('hubspot', 'HubSpot', 'CRM', '{"claude_code": "Add the HubSpot MCP server to your config", "copilot": "Install the HubSpot connector", "cursor": "Add HubSpot MCP to Cursor settings"}'),
  ('gmail', 'Gmail', 'Email', '{"claude_code": "Add the Google Workspace MCP server", "copilot": "Install the Gmail extension", "cursor": "Add Google Workspace MCP"}'),
  ('google_calendar', 'Google Calendar', 'Calendar', '{"claude_code": "Add the Google Workspace MCP server (includes Calendar)", "copilot": "Install the Google Calendar extension", "cursor": "Add Google Workspace MCP"}'),
  ('google_workspace', 'Google Workspace', 'Productivity', '{"claude_code": "Add the Google Workspace MCP server", "copilot": "Install Google Workspace extensions", "cursor": "Add Google Workspace MCP"}'),
  ('m365', 'Microsoft 365', 'Productivity', '{"claude_code": "Add the Microsoft 365 MCP server", "copilot": "Built-in with GitHub Copilot", "cursor": "Add Microsoft 365 MCP"}'),
  ('slack', 'Slack', 'Messaging', '{"claude_code": "Add the Slack MCP server", "copilot": "Install the Slack extension", "cursor": "Add Slack MCP to Cursor settings"}'),
  ('web_search', 'Web Search', 'Research', '{"claude_code": "Built-in with Claude Code (uses tool_use)", "copilot": "Built-in with Copilot (Bing search)", "cursor": "Built-in web search tool"}');

-- =============================================================
-- SKILLS
-- =============================================================
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  title text not null,
  vertical text, -- 'crm', 'chief_of_staff', null for custom
  base_content text not null default '',
  structured_json jsonb, -- parsed skill structure
  visibility text not null default 'private' check (visibility in ('private', 'unlisted', 'public')),
  is_starter boolean not null default false,
  revision_quota integer not null default 3, -- free tier default
  revisions_used integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================================
-- SKILL VERSIONS (every save = new row)
-- =============================================================
create table public.skill_versions (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references public.skills(id) on delete cascade not null,
  version_no integer not null,
  content text not null,
  structured_json jsonb,
  note text,
  plain_english_changelog text,
  created_at timestamptz not null default now(),
  unique (skill_id, version_no)
);

-- =============================================================
-- SKILL VARIANTS (model-tuned versions)
-- =============================================================
create table public.skill_variants (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references public.skills(id) on delete cascade not null,
  variant_label text not null, -- 'claude', 'gpt', 'fast'
  content text not null,
  created_at timestamptz not null default now()
);

-- =============================================================
-- CAPTURES (sanitized input traces)
-- =============================================================
create table public.captures (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  input_type text not null check (input_type in ('description', 'screenshot', 'recording')),
  sanitized_trace jsonb, -- structured extraction (never raw image)
  observed_apps text[] default '{}',
  secret_scan_passed boolean not null default false,
  created_at timestamptz not null default now()
);

-- =============================================================
-- SKILL <-> CONNECTOR join table
-- =============================================================
create table public.skill_connectors (
  skill_id uuid references public.skills(id) on delete cascade not null,
  connector_key text references public.connectors(key) on delete cascade not null,
  primary key (skill_id, connector_key)
);

-- =============================================================
-- PURCHASES (Stripe)
-- =============================================================
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  skill_id uuid references public.skills(id) on delete cascade not null,
  stripe_session_id text unique not null,
  amount integer not null default 700, -- cents
  created_at timestamptz not null default now()
);

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================

-- Skills: owners can CRUD their own; public/unlisted readable by anyone
alter table public.skills enable row level security;

create policy "Users can manage their own skills"
  on public.skills for all
  using (auth.uid() = owner_id);

create policy "Public skills are readable by anyone"
  on public.skills for select
  using (visibility in ('public', 'unlisted') or is_starter = true);

-- Skill versions: same as parent skill
alter table public.skill_versions enable row level security;

create policy "Users can manage versions of their own skills"
  on public.skill_versions for all
  using (
    exists (
      select 1 from public.skills
      where skills.id = skill_versions.skill_id
      and skills.owner_id = auth.uid()
    )
  );

create policy "Public skill versions are readable"
  on public.skill_versions for select
  using (
    exists (
      select 1 from public.skills
      where skills.id = skill_versions.skill_id
      and (skills.visibility in ('public', 'unlisted') or skills.is_starter = true)
    )
  );

-- Skill variants: same pattern
alter table public.skill_variants enable row level security;

create policy "Users can manage variants of their own skills"
  on public.skill_variants for all
  using (
    exists (
      select 1 from public.skills
      where skills.id = skill_variants.skill_id
      and skills.owner_id = auth.uid()
    )
  );

create policy "Public skill variants are readable"
  on public.skill_variants for select
  using (
    exists (
      select 1 from public.skills
      where skills.id = skill_variants.skill_id
      and (skills.visibility in ('public', 'unlisted') or skills.is_starter = true)
    )
  );

-- Captures: owner only
alter table public.captures enable row level security;

create policy "Users can manage their own captures"
  on public.captures for all
  using (auth.uid() = owner_id);

-- Skill connectors: readable if skill is readable
alter table public.skill_connectors enable row level security;

create policy "Skill connectors follow skill visibility"
  on public.skill_connectors for select
  using (
    exists (
      select 1 from public.skills
      where skills.id = skill_connectors.skill_id
      and (skills.owner_id = auth.uid() or skills.visibility in ('public', 'unlisted') or skills.is_starter = true)
    )
  );

create policy "Users can manage connectors on their own skills"
  on public.skill_connectors for all
  using (
    exists (
      select 1 from public.skills
      where skills.id = skill_connectors.skill_id
      and skills.owner_id = auth.uid()
    )
  );

-- Connectors: public read-only registry
alter table public.connectors enable row level security;

create policy "Connectors are publicly readable"
  on public.connectors for select
  using (true);

-- Purchases: owner only
alter table public.purchases enable row level security;

create policy "Users can view their own purchases"
  on public.purchases for select
  using (auth.uid() = owner_id);
