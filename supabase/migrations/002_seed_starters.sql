-- Seed the 6 starter skills (CRM + Chief of Staff packs)
-- Run AFTER 001_initial_schema.sql

-- =============================================================
-- CRM Pack
-- =============================================================

insert into public.skills (id, owner_id, title, vertical, base_content, structured_json, visibility, is_starter, revision_quota, revisions_used) values

-- 1. Overdue close dates
('00000000-0000-0000-0000-000000000001', null, 'Overdue Close Dates', 'crm',
'---
name: Overdue Close Dates
description: Find open deals whose close date has already passed
trigger: daily
tools_needed: [salesforce]
---

# Overdue Close Dates

## Purpose
Find all open opportunities whose close date is in the past, group them by owner with days overdue, and suggest either re-dating or marking closed-lost.

## Criteria
- Opportunity Stage is NOT "Closed Won" or "Closed Lost"
- Close Date is before today
- Group results by Opportunity Owner
- Calculate days overdue (today minus close date)

## Steps
1. **Query open opportunities with past close dates**
   Use the Salesforce MCP to run: SELECT Id, Name, CloseDate, StageName, Owner.Name, Amount FROM Opportunity WHERE IsClosed = false AND CloseDate < TODAY ORDER BY CloseDate ASC

2. **Group by owner and calculate overdue days**
   For each opportunity, compute days_overdue = today - CloseDate. Group the results by Owner.Name.

3. **Generate summary with recommendations**
   For each overdue deal, suggest one of: (a) update the close date to a realistic future date, or (b) mark as Closed Lost if the deal is dead. Present as a table.

4. **Present to user for review**
   Show the grouped list. Do NOT modify any records. Wait for user confirmation before suggesting specific new dates.

## Guardrails
- Read-only: never modify Salesforce records without explicit user confirmation
- Never auto-close a deal
- Never surface a secret in chat
- Present suggestions, not actions',
'{"goal": "Find open deals whose close date has already passed, grouped by owner", "when_to_use": "Daily or weekly pipeline review", "criteria": "Open opportunities (not Closed Won/Lost) where CloseDate < today, grouped by owner with days overdue", "steps": [{"title": "Query open opportunities with past close dates", "description": "Use Salesforce MCP to find all open opps with CloseDate before today", "order": 1}, {"title": "Group by owner and calculate overdue days", "description": "Compute days_overdue for each opp, group by Owner.Name", "order": 2}, {"title": "Generate summary with recommendations", "description": "Suggest re-date or closed-lost for each deal", "order": 3}, {"title": "Present to user for review", "description": "Show results, wait for user decision", "order": 4}], "tools_referenced": ["salesforce"], "guardrails": ["Read-only: never modify records without confirmation", "Never auto-close a deal", "Never surface a secret in chat"]}',
'public', true, 0, 0),

-- 2. Big-deal news watch
('00000000-0000-0000-0000-000000000002', null, 'Big-Deal News Watch', 'crm',
'---
name: Big-Deal News Watch
description: Scan news for events that could affect large open deals
trigger: daily
tools_needed: [salesforce, web_search]
---

# Big-Deal News Watch

## Purpose
For every open deal above a dollar threshold, search recent news on the account for events that could move the deal (funding, M&A, leadership changes, layoffs, earnings).

## Criteria
- Open opportunities with Amount >= $250,000 (configurable)
- Stage is NOT Closed Won or Closed Lost
- For each qualifying deal, search news on the Account name from the last 7 days

## Steps
1. **Query large open deals**
   Use Salesforce MCP: SELECT Id, Name, Amount, Account.Name, CloseDate FROM Opportunity WHERE IsClosed = false AND Amount >= 250000 ORDER BY Amount DESC

2. **Search news for each account**
   For each Account.Name, use web search to find recent news (last 7 days): funding rounds, acquisitions, mergers, executive changes, layoffs, earnings reports, major product launches.

3. **Write a brief per deal**
   For each deal with relevant news, write 2-3 sentences summarizing what happened and how it might affect the deal (positive signal, risk, or neutral context).

4. **Present the briefing**
   Show results grouped by deal, largest first. Deals with no relevant news can be listed as "No recent news."

## Guardrails
- Briefing only: no actions taken, no records modified
- Use only publicly available news sources
- Never surface a secret in chat
- Flag uncertainty: if news relevance is unclear, say so',
'{"goal": "Scan recent news for large open deals to surface risks and signals", "when_to_use": "Daily, before pipeline review or account planning", "criteria": "Open opportunities with Amount >= $250K, search news on each account from last 7 days", "steps": [{"title": "Query large open deals", "description": "Find open opps above threshold via Salesforce MCP", "order": 1}, {"title": "Search news for each account", "description": "Web search for funding, M&A, leadership changes, layoffs, earnings", "order": 2}, {"title": "Write a brief per deal", "description": "Summarize relevant news and potential deal impact", "order": 3}, {"title": "Present the briefing", "description": "Show grouped by deal, largest first", "order": 4}], "tools_referenced": ["salesforce", "web_search"], "guardrails": ["Briefing only, no records modified", "Use only public news sources", "Never surface a secret in chat", "Flag uncertainty clearly"]}',
'public', true, 0, 0),

-- 3. Stalled partner-deal status check
('00000000-0000-0000-0000-000000000003', null, 'Stalled Partner Deal Status Check', 'crm',
'---
name: Stalled Partner Deal Status Check
description: Find partner deals going quiet and draft status-check messages
trigger: weekly
tools_needed: [salesforce]
---

# Stalled Partner Deal Status Check

## Purpose
Find partner-sourced deals closing in the current or next quarter whose activity has gone stale, then draft a short, friendly status-check message to the partner contact.

## Criteria
- Opportunity Source contains "Partner" (or Type = "Partner Sourced")
- Close Date is within the current quarter or next quarter
- Last Activity Date is more than 14 days ago (configurable, default 14)
- Stage is NOT Closed Won or Closed Lost

## Steps
1. **Query stalled partner deals**
   Use Salesforce MCP: SELECT Id, Name, CloseDate, StageName, LastActivityDate, Partner_Contact__c, Partner_Contact_Email__c, Account.Name FROM Opportunity WHERE (Type = ''Partner Sourced'' OR LeadSource = ''Partner'') AND IsClosed = false AND CloseDate >= THIS_QUARTER AND LastActivityDate < LAST_N_DAYS:14 ORDER BY LastActivityDate ASC

2. **Calculate staleness**
   For each deal, compute days_stale = today - LastActivityDate. Flag any over 30 days as "critical."

3. **Draft status-check messages**
   For each stalled deal, draft a short, friendly message to the partner contact: acknowledge the deal by name, note it has been quiet, ask for a quick status update. Keep it under 4 sentences. Warm tone, not accusatory.

4. **Present drafts for review**
   Show each draft with the deal context (name, amount, days stale, partner contact). User reviews, edits, and sends manually. NEVER auto-send.

## Guardrails
- Draft-only: never send messages automatically
- Never modify opportunity records
- Never surface a secret in chat
- Keep messages warm and brief, not aggressive
- User must review every draft before sending',
'{"goal": "Find partner deals with no recent activity and draft status-check messages", "when_to_use": "Weekly, typically Monday or Friday", "criteria": "Partner-sourced opps closing this/next quarter with LastActivityDate > 14 days ago", "steps": [{"title": "Query stalled partner deals", "description": "Find partner opps with no activity in 14+ days via Salesforce MCP", "order": 1}, {"title": "Calculate staleness", "description": "Compute days since last activity, flag critical (30+ days)", "order": 2}, {"title": "Draft status-check messages", "description": "Write short friendly check-in for each stalled deal", "order": 3}, {"title": "Present drafts for review", "description": "Show drafts with context, user reviews and sends manually", "order": 4}], "tools_referenced": ["salesforce"], "guardrails": ["Draft-only: never auto-send", "Never modify records", "Never surface a secret in chat", "Warm tone, not accusatory"]}',
'public', true, 0, 0);

-- =============================================================
-- Chief of Staff Pack
-- =============================================================

insert into public.skills (id, owner_id, title, vertical, base_content, structured_json, visibility, is_starter, revision_quota, revisions_used) values

-- 4. Morning brief
('00000000-0000-0000-0000-000000000004', null, 'Morning Brief', 'chief_of_staff',
'---
name: Morning Brief
description: Summarize overnight email and today''s calendar into a prioritized brief
trigger: daily (morning)
tools_needed: [gmail, google_calendar]
---

# Morning Brief

## Purpose
Produce a prioritized summary of overnight email and today''s calendar so the user knows what needs attention first thing.

## Criteria
- Emails received since last brief (or since 6 PM previous day)
- Calendar events for today
- Prioritize: urgent replies > meetings needing prep > FYIs

## Steps
1. **Pull overnight emails**
   Use the email connector to fetch all messages received since 6 PM yesterday. Categorize each as: needs-reply-today, meeting-related, FYI, or can-wait.

2. **Pull today''s calendar**
   Fetch all calendar events for today. Note any conflicts or double-bookings. For each meeting, note if there are related emails or prep needed.

3. **Build the brief**
   Structure as: (1) Needs reply today (most urgent first), (2) Today''s meetings with prep notes, (3) Conflicts/double-bookings flagged, (4) FYIs (skimmable).

4. **Present the brief**
   Show the structured brief. Do not send, archive, or modify any emails.

## Guardrails
- Read-only: never send, delete, or archive emails
- Never surface a secret in chat
- Never modify calendar events
- If unsure about priority, err on the side of flagging it',
'{"goal": "Summarize overnight email + today''s calendar into a prioritized morning brief", "when_to_use": "Every morning, first thing", "criteria": "Emails since 6 PM yesterday + all calendar events today, prioritized by urgency", "steps": [{"title": "Pull overnight emails", "description": "Fetch emails since 6 PM yesterday, categorize by urgency", "order": 1}, {"title": "Pull today''s calendar", "description": "Get all events, note conflicts and prep needs", "order": 2}, {"title": "Build the brief", "description": "Structure: urgent replies, meetings+prep, conflicts, FYIs", "order": 3}, {"title": "Present the brief", "description": "Show structured brief, no modifications", "order": 4}], "tools_referenced": ["gmail", "google_calendar"], "guardrails": ["Read-only: never send or delete emails", "Never surface a secret in chat", "Never modify calendar events"]}',
'public', true, 0, 0),

-- 5. Inbox triage
('00000000-0000-0000-0000-000000000005', null, 'Inbox Triage + Reply Drafts', 'chief_of_staff',
'---
name: Inbox Triage + Reply Drafts
description: Classify inbox and draft replies for routine items
trigger: daily
tools_needed: [gmail]
---

# Inbox Triage + Reply Drafts

## Purpose
Classify unread emails into actionable categories and draft replies for routine items in the user''s voice. Flag judgment calls for the user.

## Criteria
- All unread emails in inbox
- Classify into: needs-reply, FYI, waiting-on-others, archivable
- Draft replies only for routine/straightforward items

## Steps
1. **Fetch unread emails**
   Use the email connector to get all unread messages in the inbox.

2. **Classify each email**
   For each message, assign one category: (a) needs-reply: requires a response from the user, (b) FYI: informational, no action needed, (c) waiting-on: user is waiting for someone else to respond, (d) archivable: newsletters, notifications, no value.

3. **Draft replies for routine items**
   For emails in "needs-reply" that are straightforward (scheduling, confirmations, simple questions), draft a brief reply in the user''s voice. Keep drafts short and professional.

4. **Present triage results**
   Show the classified inbox with drafts inline. Flag any email that requires judgment (complex decisions, sensitive topics) for manual handling. NEVER send any draft.

## Guardrails
- Draft-only: never send any email automatically
- Never surface a secret in chat
- Flag judgment calls explicitly
- Match the user''s writing voice and tone
- When uncertain about classification, default to "needs-reply"',
'{"goal": "Classify inbox and draft replies for routine emails", "when_to_use": "Daily, after morning brief or when inbox is overwhelming", "criteria": "All unread inbox emails, classified into needs-reply/FYI/waiting-on/archivable", "steps": [{"title": "Fetch unread emails", "description": "Get all unread messages via email connector", "order": 1}, {"title": "Classify each email", "description": "Assign category: needs-reply, FYI, waiting-on, archivable", "order": 2}, {"title": "Draft replies for routine items", "description": "Write short replies for straightforward needs-reply items", "order": 3}, {"title": "Present triage results", "description": "Show classified inbox with drafts, flag judgment calls", "order": 4}], "tools_referenced": ["gmail"], "guardrails": ["Draft-only: never send emails", "Never surface a secret in chat", "Flag judgment calls", "Match user''s voice"]}',
'public', true, 0, 0),

-- 6. Loop-closer
('00000000-0000-0000-0000-000000000006', null, 'Loop Closer', 'chief_of_staff',
'---
name: Loop Closer
description: Find open loops where someone owes you or you owe them
trigger: weekly
tools_needed: [gmail]
---

# Loop Closer

## Purpose
Find email threads where the user owes a reply, or where they asked something and got no answer in N days. List each open loop with a suggested nudge draft.

## Criteria
- Threads where the last message is FROM someone else and user has not replied (user owes reply)
- Threads where the last message is FROM the user and no response in 3+ days (they owe user)
- Look back 14 days (configurable)

## Steps
1. **Find threads where user owes a reply**
   Search for threads where the most recent message is from someone else, received 2+ days ago, and the user has not responded. These are "you owe them" loops.

2. **Find threads where others owe the user**
   Search for threads where the most recent message is from the user, sent 3+ days ago, with no reply received. These are "they owe you" loops.

3. **Draft nudge messages**
   For "they owe you" threads, draft a brief, friendly follow-up nudge. Keep it to 1-2 sentences. For "you owe them" threads, just flag them (no draft needed, user needs to think about the reply).

4. **Present open loops**
   Show two sections: "You owe them" (with thread subject, who, days waiting) and "They owe you" (with thread subject, who, days waiting, nudge draft). NEVER send any message.

## Guardrails
- Draft-only: never send any message automatically
- Never surface a secret in chat
- Keep nudges brief and warm, not passive-aggressive
- If a thread looks sensitive or complex, flag it without drafting',
'{"goal": "Surface open loops and draft follow-up nudges", "when_to_use": "Weekly, or when inbox feels chaotic", "criteria": "Threads with no reply in 2-3+ days, both directions, looking back 14 days", "steps": [{"title": "Find threads where user owes a reply", "description": "Threads with unanswered inbound messages 2+ days old", "order": 1}, {"title": "Find threads where others owe the user", "description": "Threads where user sent last message 3+ days ago with no reply", "order": 2}, {"title": "Draft nudge messages", "description": "Brief friendly follow-ups for they-owe-you threads", "order": 3}, {"title": "Present open loops", "description": "Two sections: you-owe-them and they-owe-you with drafts", "order": 4}], "tools_referenced": ["gmail"], "guardrails": ["Draft-only: never send messages", "Never surface a secret in chat", "Keep nudges warm, not passive-aggressive", "Flag sensitive threads without drafting"]}',
'public', true, 0, 0);

-- =============================================================
-- Seed skill_connectors for starters
-- =============================================================
insert into public.skill_connectors (skill_id, connector_key) values
  ('00000000-0000-0000-0000-000000000001', 'salesforce'),
  ('00000000-0000-0000-0000-000000000002', 'salesforce'),
  ('00000000-0000-0000-0000-000000000002', 'web_search'),
  ('00000000-0000-0000-0000-000000000003', 'salesforce'),
  ('00000000-0000-0000-0000-000000000004', 'gmail'),
  ('00000000-0000-0000-0000-000000000004', 'google_calendar'),
  ('00000000-0000-0000-0000-000000000005', 'gmail'),
  ('00000000-0000-0000-0000-000000000006', 'gmail');
