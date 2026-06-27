// Structured content for the Job Seeker Chief of Staff page at /job-seeker-cos.
// Source of truth: the agent's README (job-seeker-cos.md) and system prompt
// (system-prompt.md). Wording is kept faithful to the author's voice.

// Public repo for the agent. Left null until a public URL is confirmed, so the
// page never renders a broken "view the source" link.
export const COS_REPO_URL: string | null = null;

export const CLAUDE_DOWNLOAD_URL = "https://claude.ai/download";
export const NODEJS_URL = "https://nodejs.org";

export type CosCommand = { cmd: string; what: string };

export const cosCommands: CosCommand[] = [
  { cmd: "setup", what: "First-time setup. Creates folders, asks questions, builds your profile." },
  { cmd: "cos / morning", what: "Daily briefing. What is due, what is stale, what is today's priority." },
  { cmd: "checkin", what: "Daily mood and progress log." },
  { cmd: "review", what: "Weekly retrospective. What worked, what did not, next week's plan." },
  { cmd: "prep [company]", what: "Interview prep for a specific company." },
  { cmd: "draft [type]", what: "Draft a message: follow-up, cover letter, outreach, thank-you." },
  { cmd: "apply [url]", what: "Log a new application and get a fit assessment." },
  { cmd: "network", what: "Show networking contacts due for outreach." },
  { cmd: "score", what: "Run AIS scoring (Alignment, Impact, Signal) on target roles." },
  { cmd: "grade", what: "Grade your LinkedIn or resume against a specific job posting." },
  { cmd: "search", what: "Find open roles matching your profile (needs web search)." },
  { cmd: "status", what: "Pipeline overview: where everything stands." },
  { cmd: "phase", what: "Show which phase you are in and what to focus on." },
];

export type CosStep = {
  title: string;
  body: string;
  detail?: string[];
};

export const cosSetupSteps: CosStep[] = [
  {
    title: "Download Claude Desktop",
    body:
      "Go to claude.ai/download and install it. It is free. The free plan includes web search, file access, and projects, which is everything you need. You will hit a message limit (roughly 15 to 40 messages per 5 hours), but a daily briefing plus some grading fits fine.",
  },
  {
    title: "Enable file access",
    body:
      "This lets Claude read and write files in one folder on your computer, and only that folder. You paste a small config file once. The setup below uses a folder called job-search in your home directory.",
    detail: [
      "Mac: in Finder press Cmd+Shift+G, paste ~/Library/Application Support/Claude/, open claude_desktop_config.json, and replace its contents with the config below.",
      "Windows: press Win+R, paste %APPDATA%\\Claude\\, open claude_desktop_config.json in Notepad, and replace its contents with the config below.",
      "Swap YOURNAME for your computer's username, save, then restart Claude Desktop.",
      "If you get an npx error, install the LTS version from nodejs.org and restart Claude Desktop.",
    ],
  },
  {
    title: "Create a Project",
    body:
      "In Claude Desktop, click Projects, then New Project, and name it Job Search. Click Set custom instructions, then paste the entire system prompt (copy it below) and save.",
  },
  {
    title: "Say setup",
    body:
      "Start a new conversation inside your project and type setup. Claude will ask a few questions, create your folders, and get everything ready. Just answer honestly.",
  },
  {
    title: "Each morning, say cos",
    body:
      "That is it. From now on, open the project each morning and say cos for your daily briefing: what is due, what is stale, and the one thing to focus on today.",
  },
];

// The Mac and Windows MCP config, shown verbatim so non-technical users can copy it.
export const cosConfigMac = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/YOURNAME/job-search"]
    }
  }
}`;

export const cosConfigWindows = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\\\Users\\\\YOURNAME\\\\job-search"]
    }
  }
}`;

export type CosPhase = {
  n: number;
  name: string;
  timeline: string;
  summary: string;
};

export const cosPhases: CosPhase[] = [
  {
    n: 1,
    name: "Pause and Breathe",
    timeline: "Days 1 to 7",
    summary:
      "Process the emotions, tell your close people, sort out unemployment, severance, and runway. Do not start applying yet. Line up 3 to 5 people who will check in on you.",
  },
  {
    n: 2,
    name: "Body and Mind",
    timeline: "Ongoing, start day 1",
    summary:
      "Set a daily routine with real start and stop times, exercise, sleep, and social time that is not networking. The 12-hour hustle burns out in two weeks and gives worse outcomes.",
  },
  {
    n: 3,
    name: "Daily Affirmations and Progress",
    timeline: "Ongoing",
    summary:
      "A short daily checkin: one thing you are grateful for, one thing you got done, today's one priority, and a feeling score. Track conversations had, not just applications sent.",
  },
  {
    n: 4,
    name: "Chief of Staff Mode",
    timeline: "Start week 2",
    summary:
      "The morning briefing kicks in: today's focus, three action items max, a pipeline snapshot, and the stale items that need attention. Weekly reviews capture what is working.",
  },
  {
    n: 5,
    name: "Reassessment",
    timeline: "Week 1 to 2",
    summary:
      "Before applying, get honest about same lane or pivot, your salary floor, what you will not compromise on, what you hated last time, and what energizes you. Everything gets measured against this.",
  },
  {
    n: 6,
    name: "Resume Upload and Targeting",
    timeline: "Week 2 to 3",
    summary:
      "Upload your resume or LinkedIn for an honest read, narrow to 5 to 7 exact titles, and run AIS scoring. Scoring is based on what is visible on your profile, not what you claim out loud.",
  },
  {
    n: 7,
    name: "Resume Optimization",
    timeline: "Week 2 to 3",
    summary:
      "Lead with impact, quantify outcomes, match the industry's language, and cut the noise. Build a tailored version for each top title.",
  },
  {
    n: 8,
    name: "Job Scanning",
    timeline: "Week 3 and on",
    summary:
      "Network first, then target company career pages, then filtered LinkedIn, then niche boards, with general boards as a last resort. Each application gets a fit score and a cold-versus-warm call.",
  },
  {
    n: 9,
    name: "Multi-Threaded Outreach",
    timeline: "Ongoing",
    summary:
      "For every serious target, find the hiring manager, a peer or two, and the recruiter. Drafts are short, specific, and genuine, with a low-commitment ask. Warm intro beats cold application every time.",
  },
  {
    n: 10,
    name: "Track and Iterate",
    timeline: "Ongoing",
    summary:
      "A pipeline grouped from considering to offer, with diagnostics: no responses points at targeting, screens but no onsites points at storytelling, onsites but no offers points at interview performance.",
  },
  {
    n: 11,
    name: "Skill Uplevel",
    timeline: "As needed",
    summary:
      "Where the signal is weak, pick one or two gaps, build a two-week learning plan, ship a small project, and practice the questions. Close the gap, do not fake it.",
  },
];

export type CosSprintDay = { day: number; focus: string; tasks: string };

export const cosSprint: CosSprintDay[] = [
  { day: 1, focus: "Foundation", tasks: "LinkedIn edits, upload resume, finalize target list" },
  { day: 2, focus: "Profile", tasks: "About section, missing role bullets" },
  { day: 3, focus: "Network", tasks: "Message 3 warm contacts" },
  { day: 4, focus: "Research", tasks: "Deep-dive 3 target companies, find hiring managers" },
  { day: 5, focus: "Network", tasks: "Message 3 more, follow up day 3" },
  { day: 6, focus: "Quick wins", tasks: "Finish certs, apply to 1 quick-close role" },
  { day: 7, focus: "Rest", tasks: "No tasks. How are you feeling?" },
  { day: 8, focus: "Apply", tasks: "Tailor resume, apply to top role with a warm intro" },
  { day: 9, focus: "Apply", tasks: "Role 2, draft follow-up for role 1" },
  { day: 10, focus: "Network", tasks: "Follow up all week 1 outreach, schedule coffees" },
  { day: 11, focus: "Prep", tasks: "Research companies for upcoming conversations" },
  { day: 12, focus: "Apply", tasks: "Roles 3 to 5, thank-you notes" },
  { day: 13, focus: "Follow up", tasks: "Ping non-responders, check pipeline" },
  { day: 14, focus: "Review", tasks: "What worked, what did not, extend or go passive" },
];

export const cosPhilosophy = [
  "Use your network.",
  "Ask for help and intros.",
  "Pick up the phone.",
  "Be intentional about where you apply.",
];
