export type Faq = { q: string; a: string };

export type FaqSection = {
  id: string;
  title: string;
  blurb: string;
  items: Faq[];
};

// Sourced from the questions people actually ask about MCP servers, agent
// harnesses, and AI assistants. Written in plain words, no jargon.
export const faqSections: FaqSection[] = [
  {
    id: "mcp-servers",
    title: "MCP servers, in plain words",
    blurb: "The part most people find foreign. It is simpler than it sounds.",
    items: [
      {
        q: "What is an MCP server, really?",
        a: "It is a small adapter that lets your AI assistant reach one of your apps, like your email, your calendar, or your CRM, in a safe and predictable way. Think of it as a universal plug between your assistant and the tools you already use.",
      },
      {
        q: "Do I need an MCP server to use a skill?",
        a: "No. A skill is just written instructions, so you can run one with zero connections. You add an MCP server only when you want the assistant to touch a real app on your behalf.",
      },
      {
        q: "What can an MCP server connect to?",
        a: "Common ones cover email, calendars, Slack and Teams, CRMs like Salesforce and HubSpot, and files in Google Drive or Notion. Our directory lists the popular ones with what each can do.",
      },
      {
        q: "Is setting one up hard?",
        a: "Usually it is a few clicks: pick the tool, sign in, done. You are not writing code, and you can stop after one connection.",
      },
      {
        q: "How is an MCP server different from a normal app integration?",
        a: "A normal integration is built once for one app. MCP is a shared standard, so the same assistant can talk to many apps the same way, without a custom build for each one.",
      },
      {
        q: "Can I build my own MCP server?",
        a: "Yes, if you are technical. Most people never need to, because they use connections that already exist.",
      },
    ],
  },
  {
    id: "skills-harnesses",
    title: "Skills and harnesses",
    blurb: "What you are actually making, and where it runs.",
    items: [
      {
        q: "What is a skill?",
        a: "A short written guide for one repeatable task. Like the welcome note you would leave a house sitter, but for your AI. You write it once, and it runs the task the same way every time.",
      },
      {
        q: "What is a harness?",
        a: "The app where your assistant lives, meaning the AI tool you already use. The skill rides along inside it. You do not install anything new from us.",
      },
      {
        q: "How is a skill different from a prompt?",
        a: "A prompt is a one-off ask that you retype each time. A skill is saved and reusable, so the steps stay consistent instead of drifting every time you explain them again.",
      },
      {
        q: "How is a skill different from an MCP server?",
        a: "A skill is the instructions, meaning what to do. An MCP server is the connection, meaning how to reach your apps. You can use a skill with a connection or without one.",
      },
      {
        q: "Will my skill work in different AI apps?",
        a: "That is the goal. A skill is plain text in a file called SKILL.md, so it is model-agnostic and portable. Take it with you if you switch assistants.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. You describe the task in your own words, or drop in a screenshot of the screen you use, and we write the file for you.",
      },
    ],
  },
  {
    id: "safety-privacy",
    title: "Safety and privacy",
    blurb: "Who can see what, and how to stay in control.",
    items: [
      {
        q: "Does Skill008 store my data?",
        a: "No. We do not store your passwords, your files, or your screenshots. The skill runs in your tools, on your account, not on ours.",
      },
      {
        q: "What can a connected app actually see?",
        a: "Only what you allow when you sign in. Most connections let you start read-only and widen access later, so you can begin small.",
      },
      {
        q: "What is prompt injection, and should I worry?",
        a: "It is when a hidden instruction sneaks into content your assistant reads and tries to make it do something you did not ask for. The defense is to only connect tools you trust and keep risky actions behind your review.",
      },
      {
        q: "Can I undo what an assistant does?",
        a: "Skills are built to draft first and show you before anything saves. You stay in the loop and approve the change, so there is a checkpoint before it acts.",
      },
      {
        q: "Who holds the access tokens?",
        a: "Your harness and the app you connect hold them, not us. We never see your tokens.",
      },
      {
        q: "What if I am on a work computer?",
        a: "Check your company policy first. Start with public info or your own files, and ask IT before connecting work systems like your company email or CRM.",
      },
    ],
  },
  {
    id: "using-skill008",
    title: "Using Skill008",
    blurb: "Cost, models, and what happens when things go sideways.",
    items: [
      {
        q: "How much does it cost?",
        a: "Making and using a skill is free to start. After that it is simple per-skill pricing, one time, with no subscription to forget about.",
      },
      {
        q: "Which AI model do I need?",
        a: "Whichever one you already use. Skills are written to work across the common assistants, so you are not locked to a single vendor.",
      },
      {
        q: "What if the skill gets something wrong?",
        a: "Edit the guide in plain English and run it again. It is a text file, so a fix takes seconds and sticks for next time.",
      },
      {
        q: "How do I get help?",
        a: "Our contact page has a direct line. Tell us the task you are stuck on and we will point you at the closest starter skill.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqSections.flatMap((s) => s.items);
