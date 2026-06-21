export type Availability = "official" | "community";

export type Connector = {
  name: string;
  use: string;
  availability: Availability;
  note?: string;
};

export type ConnectorCategory = {
  id: string;
  title: string;
  blurb: string;
  connectors: Connector[];
};

export const availabilityLabels: Record<
  Availability,
  { label: string; hint: string }
> = {
  official: {
    label: "Official",
    hint: "Built and run by the company that makes the app.",
  },
  community: {
    label: "Community",
    hint: "Built by someone outside the company. Check who made it before you connect anything sensitive.",
  },
};

export const connectorCategories: ConnectorCategory[] = [
  {
    id: "email",
    title: "Email",
    blurb: "Let your assistant read, draft, and sort your mail.",
    connectors: [
      {
        name: "Gmail",
        use: "Search, read, draft, and label your email.",
        availability: "official",
      },
      {
        name: "Outlook",
        use: "Read, draft, and organize mail across Microsoft 365.",
        availability: "official",
      },
    ],
  },
  {
    id: "chat",
    title: "Chat and messaging",
    blurb: "Pull in threads, post updates, keep up with channels.",
    connectors: [
      {
        name: "Slack",
        use: "Read channels, follow threads, post updates.",
        availability: "official",
      },
      {
        name: "Microsoft Teams",
        use: "Messages and channels across your Teams.",
        availability: "official",
      },
    ],
  },
  {
    id: "meetings",
    title: "Meetings and calendar",
    blurb: "See your schedule, book time, find what was said.",
    connectors: [
      {
        name: "Google Calendar",
        use: "See your schedule, book and move events.",
        availability: "official",
      },
      {
        name: "Zoom",
        use: "Meetings, recordings, and participants.",
        availability: "community",
      },
    ],
  },
  {
    id: "docs",
    title: "Docs and knowledge",
    blurb: "Find files, read documents, keep notes in sync.",
    connectors: [
      {
        name: "Notion",
        use: "Pages and databases, read and write.",
        availability: "official",
      },
      {
        name: "Google Drive and Docs",
        use: "Find files, read docs and sheets.",
        availability: "official",
      },
      {
        name: "Atlassian (Jira and Confluence)",
        use: "Issues, pages, and your team's work graph.",
        availability: "official",
      },
      {
        name: "Airtable",
        use: "Bases and records as a light database.",
        availability: "official",
      },
    ],
  },
  {
    id: "projects",
    title: "Projects and engineering",
    blurb: "Track work, issues, and code.",
    connectors: [
      {
        name: "GitHub",
        use: "Repos, issues, and pull requests.",
        availability: "official",
      },
      {
        name: "Linear",
        use: "Issues and project tracking.",
        availability: "official",
      },
      {
        name: "Asana",
        use: "Tasks and projects.",
        availability: "community",
      },
    ],
  },
  {
    id: "crm",
    title: "CRM and sales",
    blurb: "Keep contacts, deals, and pipeline tidy.",
    connectors: [
      {
        name: "HubSpot",
        use: "Contacts, deals, and marketing.",
        availability: "community",
      },
      {
        name: "Salesforce",
        use: "Accounts, leads, and automation.",
        availability: "community",
        note: "First-party server announced, not yet shipped.",
      },
      {
        name: "monday.com",
        use: "Boards, items, and CRM pipelines, read and write.",
        availability: "official",
      },
      {
        name: "Gong",
        use: "Pull call recordings and transcripts into your notes and CRM.",
        availability: "community",
        note: "Community servers run on the Gong API; one exports transcripts to markdown.",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance and billing",
    blurb: "Invoices, payments, and the books.",
    connectors: [
      {
        name: "Stripe",
        use: "Payments, billing, and customers.",
        availability: "official",
      },
      {
        name: "QuickBooks",
        use: "Invoices, expenses, and bookkeeping.",
        availability: "community",
      },
      {
        name: "Xero",
        use: "Accounting and financial ops.",
        availability: "official",
      },
    ],
  },
  {
    id: "support",
    title: "Support and commerce",
    blurb: "Customer conversations, tickets, and orders.",
    connectors: [
      {
        name: "Shopify",
        use: "Orders, products, and inventory.",
        availability: "official",
      },
      {
        name: "Intercom",
        use: "Customer conversations and support.",
        availability: "official",
      },
      {
        name: "Zendesk",
        use: "Tickets and help desk.",
        availability: "community",
      },
    ],
  },
  {
    id: "trades",
    title: "Field service and trades",
    blurb: "Quotes, jobs, scheduling, and invoicing for the trades.",
    connectors: [
      {
        name: "Jobber",
        use: "Quotes, jobs, scheduling, and invoicing.",
        availability: "community",
      },
      {
        name: "ServiceTitan",
        use: "Dispatch, jobs, and invoicing.",
        availability: "community",
      },
      {
        name: "Housecall Pro",
        use: "Scheduling and customer jobs.",
        availability: "community",
      },
    ],
  },
  {
    id: "aggregators",
    title: "Connect almost anything",
    blurb:
      "One connection that reaches hundreds of apps. Handy when a tool has no server of its own.",
    connectors: [
      {
        name: "Zapier MCP",
        use: "Thousands of apps as actions, through your Zaps.",
        availability: "official",
      },
      {
        name: "Composio",
        use: "One connection, many SaaS tools.",
        availability: "official",
      },
      {
        name: "Pipedream",
        use: "Workflows and triggers across hundreds of APIs.",
        availability: "official",
      },
    ],
  },
];

export function connectorCount(): number {
  return connectorCategories.reduce(
    (total, category) => total + category.connectors.length,
    0
  );
}

export function connectorSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
