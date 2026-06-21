// Content for the per-vertical SEO landing pages rendered at /for/[slug].
// Each entry is a self-contained landing page: SEO metadata, a problem frame,
// four to five concrete skills, the tools it connects to, optional audience
// segments, and an FAQ that also powers FAQ structured data.

export type VerticalSkill = {
  title: string;
  desc: string;
  connects?: string[];
};

export type VerticalSegment = {
  name: string;
  pain: string;
  fix: string;
};

export type VerticalFaq = {
  q: string;
  a: string;
};

export type Vertical = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  subhead: string;
  problem: {
    heading: string;
    intro?: string;
    points: string[];
  };
  skillsHeading: string;
  skills: VerticalSkill[];
  connections: {
    heading: string;
    intro: string;
    tools: string[];
  };
  segments?: {
    heading: string;
    intro?: string;
    items: VerticalSegment[];
  };
  faq: VerticalFaq[];
  cta: {
    heading: string;
    sub: string;
  };
};

export const verticals: Vertical[] = [
  {
    slug: "crm-hygiene",
    name: "CRM hygiene",
    eyebrow: "For revenue and ops teams",
    title: "CRM Hygiene Skills for the AI You Already Use | Skill008",
    description:
      "Turn the cleanup you keep putting off into repeatable skills. Flag stale deals, dedupe contacts, fill missing fields, and nudge reps, run by the AI you already use. Draft-only, your data stays yours.",
    keywords: [
      "CRM hygiene",
      "CRM data cleanup",
      "Salesforce data quality",
      "HubSpot deduplication",
      "stale deal report",
      "AI for RevOps",
    ],
    h1: "Your CRM is only as good as the data in it.",
    subhead:
      "Skill008 turns the cleanup you keep postponing into repeatable skills your AI runs for you. No new tool to learn, and nothing leaves your stack.",
    problem: {
      heading: "The pipeline lies to you",
      intro:
        "Bad data does not announce itself. It just quietly bends your forecast and wastes your reps' time.",
      points: [
        "Deals sit untouched for months, but the forecast still counts them.",
        "The same company exists three times under three spellings.",
        "Half your contacts are missing a title, a phone, or an owner.",
        "Reps update the CRM right before the review, if at all.",
      ],
    },
    skillsHeading: "Skills that keep the data honest",
    skills: [
      {
        title: "Call-notes catch-up",
        desc: "Turn a Gong call recording or your scribbled notes into a drafted activity log and the field updates it implies, ready for you to review before anything saves.",
        connects: ["Gong", "Salesforce", "HubSpot", "Monday"],
      },
      {
        title: "Stale deal sweep",
        desc: "Find open deals with no activity in the last X days, ranked by amount, and draft a nudge to each owner, so the next call always wins without the pipeline rotting.",
        connects: ["Salesforce", "HubSpot"],
      },
      {
        title: "Missing-field auditor",
        desc: "Before a pipeline review, list the open deals missing the fields their stage requires, grouped by owner, so the review is not a scramble.",
        connects: ["Salesforce", "HubSpot"],
      },
      {
        title: "Close-date reality check",
        desc: "Flag deals whose close date has already slipped past, or no longer matches the last activity, and suggest a realistic date or a close-lost.",
        connects: ["Salesforce"],
      },
      {
        title: "Pre-1:1 hygiene report",
        desc: "Before each forecast call, roll up the stale deals, missing fields, and slipped dates into one summary that says exactly who owns what.",
        connects: ["Salesforce", "HubSpot", "Slack"],
      },
    ],
    connections: {
      heading: "Plugs into the CRM you already run",
      intro:
        "Skill008 never holds your login. Each skill runs through the AI assistant and connectors you already have, on your own access.",
      tools: ["Salesforce", "HubSpot", "Monday", "Gong", "Slack", "Email", "Calendar"],
    },
    faq: [
      {
        q: "Does Skill008 change my CRM records automatically?",
        a: "No. Every skill is draft-only by default. It surfaces what is wrong and proposes the fix, and you approve before anything changes.",
      },
      {
        q: "Where does my CRM data go?",
        a: "Nowhere new. The skill runs inside the AI assistant and connectors you already use. We never store your records.",
      },
      {
        q: "Do I need to be technical to set this up?",
        a: "No. You describe the cleanup once in plain English, and the skill is written for you.",
      },
    ],
    cta: {
      heading: "Give your pipeline a spring clean.",
      sub: "Write your first CRM hygiene skill in a couple of minutes.",
    },
  },
  {
    slug: "chief-of-staff",
    name: "Chief of Staff",
    eyebrow: "For busy operators and managers",
    title: "Build an AI Chief of Staff: Inbox, Calendar, Follow-ups | Skill008",
    description:
      "Get a Chief of Staff that sorts your inbox before 9 am, preps your day, and remembers the follow ups you forget. Built on the AI and calendar you already use.",
    keywords: [
      "AI chief of staff",
      "inbox triage AI",
      "daily prep brief",
      "follow up reminders",
      "AI executive assistant",
      "meeting recap automation",
    ],
    h1: "Everyone needs a Chief of Staff. Now you can build one.",
    subhead:
      "Skill008 turns the things a great assistant would do into skills your AI runs every morning. Triage, prep, and follow-through, without hiring anyone.",
    problem: {
      heading: "The job behind the job",
      intro:
        "The real work keeps getting pushed by the work about the work.",
      points: [
        "Your inbox sets your agenda before you do.",
        "You walk into meetings you have not had time to prep for.",
        "The follow ups you promised slip through by Friday.",
        "Status updates eat the time you meant to spend on real work.",
      ],
    },
    skillsHeading: "Skills that run your morning",
    skills: [
      {
        title: "Morning inbox triage",
        desc: "Before 9 am, sort overnight email into reply now, read later, and ignore, each with a two-line summary of what matters.",
        connects: ["Outlook", "Gmail"],
      },
      {
        title: "Daily prep brief",
        desc: "Pull today's meetings, attendees, and the last thread with each, so you walk in ready instead of cold.",
        connects: ["Calendar", "Email"],
      },
      {
        title: "Follow-up memory",
        desc: "Track what you and others promised in meetings and email, the action items that fall into a black hole, and resurface anything still open.",
        connects: ["Email", "Calendar"],
      },
      {
        title: "Weekly status draft",
        desc: "Chase the section owners, then roll their updates and your week of activity into one tight status, ready to edit and send.",
        connects: ["Email", "Calendar"],
      },
      {
        title: "Recording to action items",
        desc: "After a call, turn the recording or your notes into the decisions, owners, and action items, plus the follow-up emails that need to go out.",
        connects: ["Email", "Calendar"],
      },
    ],
    connections: {
      heading: "Works with your calendar and inbox",
      intro:
        "No new inbox, no new calendar. Skill008 runs on the accounts you already have, and drafts into the tools you already check.",
      tools: ["Outlook", "Gmail", "Google Calendar", "Slack", "Teams"],
    },
    faq: [
      {
        q: "Is this another app I have to check?",
        a: "No. The skills run in the AI assistant you already use, and they draft into your normal email and calendar.",
      },
      {
        q: "Will it send email on my behalf?",
        a: "Only if you tell it to. By default it drafts the message and you press send.",
      },
      {
        q: "Does it read all of my email?",
        a: "It works on your own access, on your machine. Nothing is stored by us.",
      },
    ],
    cta: {
      heading: "Hire a Chief of Staff you build yourself.",
      sub: "Start with morning triage and add from there.",
    },
  },
  {
    slug: "trades",
    name: "Trades and field service",
    eyebrow: "For plumbers, HVAC, electricians, and contractors",
    title: "AI Skills for Trades: Quotes, Invoices, Scheduling | Skill008",
    description:
      "Turn site visits into quotes, chase unpaid invoices, revive dead estimates, and fill cancellations. AI skills that plug into your field-service app, QuickBooks, email, and your calendar. Stay on the tools, not the paperwork.",
    keywords: [
      "AI for tradespeople",
      "field service automation",
      "contractor invoicing AI",
      "HVAC scheduling software",
      "plumber quote automation",
      "electrician job management",
    ],
    h1: "You bought the tools. Let's make them work together.",
    subhead:
      "Your field-service app, QuickBooks, your inbox, and your calendar each hold a piece of every job. Skill008 connects them with AI skills that draft your quotes, chase your invoices, and fill your schedule, so you spend the day running the business, not doing paperwork at 9 pm.",
    problem: {
      heading: "The second shift nobody pays you for",
      intro:
        "The job on site is only half of it. The other half is the quoting, the chasing, and the scheduling, usually after hours.",
      points: [
        "Quotes you mean to send sit in your head until the lead goes cold.",
        "Invoices go out late, and the ones that are late get later.",
        "Estimates that did not close never get a second look.",
        "A cancellation leaves a hole in the day you could have filled.",
      ],
    },
    skillsHeading: "Skills for the work after the work",
    skills: [
      {
        title: "Site visit to quote",
        desc: "Talk through the job in a voice note or a recorded walkthrough and get a clean, itemized, multi-option quote drafted, ready to send before you leave the driveway.",
        connects: ["Field service app", "Email"],
      },
      {
        title: "Invoice chaser",
        desc: "Find invoices past due and draft a firm but friendly reminder for each, escalating the longer they sit.",
        connects: ["Field service app", "QuickBooks", "Email", "SMS"],
      },
      {
        title: "Dead estimate revival",
        desc: "Each week, surface estimates that never converted and draft a no-pressure follow up to win some back.",
        connects: ["Field service app", "Email"],
      },
      {
        title: "Cancellation and sick-day filler",
        desc: "When a job cancels or a tech calls in sick, find nearby pending or waitlisted work, propose who covers what, and draft the customer notices, so a hole in the day does not turn into chaos.",
        connects: ["Field service app", "Calendar", "SMS"],
      },
      {
        title: "Review request",
        desc: "After a job is marked complete, draft a review request to the customer while the work is still fresh.",
        connects: ["Field service app", "Email", "SMS"],
      },
    ],
    connections: {
      heading: "Plugs into the tools on your truck",
      intro:
        "Skill008 runs through the accounts you already pay for. It never logs in for you, and it never holds your data.",
      tools: ["Jobber", "ServiceTitan", "Housecall Pro", "QuickBooks", "Email", "Calendar", "SMS"],
    },
    segments: {
      heading: "Built for your trade",
      intro:
        "Same idea, tuned to the headache your trade knows best.",
      items: [
        {
          name: "Plumbers",
          pain: "Emergency and after-hours calls wreck your schedule and your evening.",
          fix: "A dispatch-triage skill sorts true emergencies from what can wait until morning, and drafts the customer reply either way.",
        },
        {
          name: "HVAC",
          pain: "Demand swings with the seasons, and maintenance contracts are easy to let lapse.",
          fix: "A renewal skill flags maintenance agreements coming due and drafts the renewal plus the tune-up booking.",
        },
        {
          name: "Electricians",
          pain: "Permits, inspections, and code sign-offs add a paperwork trail to every job.",
          fix: "A job-checklist skill tracks which jobs need a permit or inspection and reminds you before the install, not after.",
        },
        {
          name: "General contractors",
          pain: "You are the hub for subs, change orders, and progress billing across several jobs at once.",
          fix: "A coordination skill drafts sub check-ins, logs change orders, and preps each progress invoice by stage.",
        },
      ],
    },
    faq: [
      {
        q: "Do I need to be techy to use this?",
        a: "No. You describe the job in plain words, or just talk it through, and the skill does the typing.",
      },
      {
        q: "Does it connect to Jobber and QuickBooks?",
        a: "It works through the assistant and connectors you set up. You stay in control of what it can see and what it can do.",
      },
      {
        q: "Will it text or email my customers automatically?",
        a: "Only with your say-so. By default it drafts the message and you send it.",
      },
      {
        q: "What does it cost to try?",
        a: "You can write and run your first skills free. You bring your own AI account, so there is no markup from us.",
      },
    ],
    cta: {
      heading: "Get your evenings back.",
      sub: "Start with the one that costs you the most time tonight.",
    },
  },
  {
    slug: "jobber",
    name: "Jobber",
    eyebrow: "For home-service pros who run on Jobber",
    title: "AI Skills for Jobber: Quotes, Invoices, and Scheduling | Skill008",
    description:
      "Make Jobber do the paperwork, not just hold it. AI skills that turn requests into quotes, chase unpaid invoices, revive dead estimates, and fill cancellations, on the Jobber account you already pay for. Draft-only, and your data stays yours.",
    keywords: [
      "Jobber AI",
      "Jobber automation",
      "Jobber quotes",
      "Jobber invoicing",
      "Jobber scheduling",
      "AI for Jobber",
    ],
    h1: "Make Jobber do the paperwork, not just hold it.",
    subhead:
      "Your jobs, clients, and invoices already live in Jobber. Skill008 adds AI skills on top that draft your quotes, chase your unpaid invoices, and fill cancellations, so you run the business instead of typing into it after hours.",
    problem: {
      heading: "Jobber holds the data. You still do the typing.",
      intro:
        "Your jobs, clients, and invoices all sit in Jobber. Acting on them still falls to you, usually after hours.",
      points: [
        "A request comes in, but the quote waits until you are back at a desk.",
        "Invoices sit unpaid, and chasing them is the task you least want to do.",
        "Estimates that never closed quietly drop off your radar.",
        "A cancellation leaves a gap you hear about too late to fill.",
      ],
    },
    skillsHeading: "Skills that sit on top of Jobber",
    skills: [
      {
        title: "Quote and re-quote",
        desc: "Turn a new Jobber request or a quick voice note into a clean, itemized quote, and re-quote it in seconds when the customer changes the scope.",
        connects: ["Jobber", "Email"],
      },
      {
        title: "Invoice reconciler",
        desc: "Flag Jobber invoices where the final total drifted from the quote after a scope change, and draft the corrected line items before you send.",
        connects: ["Jobber", "QuickBooks"],
      },
      {
        title: "After-hours payment chaser",
        desc: "Draft a warm, personal overdue nudge for each client, the kind they actually answer, not the generic reminder they scroll past.",
        connects: ["Jobber", "Email", "SMS"],
      },
      {
        title: "Dead estimate revival",
        desc: "Each week, surface Jobber quotes that never converted and draft a no-pressure follow up to win some back.",
        connects: ["Jobber", "Email"],
      },
      {
        title: "Review request that lands",
        desc: "When a Jobber job is marked complete, draft a review ask the client recognizes as personal, not the template they ignore.",
        connects: ["Jobber", "Email"],
      },
    ],
    connections: {
      heading: "Built around your Jobber account",
      intro:
        "Skill008 never holds your Jobber login. Each skill runs through the AI assistant and connectors you set up, on your own access.",
      tools: ["Jobber", "QuickBooks", "Email", "Calendar"],
    },
    faq: [
      {
        q: "Do you log into my Jobber account?",
        a: "No. Skills run through the AI assistant and the connectors you set up. You stay in control of what they can see and do.",
      },
      {
        q: "Does it change anything in Jobber on its own?",
        a: "No. Every skill is draft-only by default. It prepares the quote, invoice, or message, and you send it.",
      },
      {
        q: "I use a different field service app. Can I still use this?",
        a: "Yes. The same skills work across the trades. See the trades and field service page for the tool-agnostic version.",
      },
      {
        q: "What does it cost to try?",
        a: "You can write and run your first skills free. You bring your own AI account, so there is no markup from us.",
      },
    ],
    cta: {
      heading: "Put Jobber to work after hours.",
      sub: "Start with the one that costs you the most time tonight.",
    },
  },
  {
    slug: "social-media-manager",
    name: "Social media managers",
    eyebrow: "For social media managers and agencies",
    title: "AI Skills for Social Media Managers: ROI, Reporting, Repurposing | Skill008",
    description:
      "You already use AI to draft and schedule. Skill008 closes the gap: ROI tracking, client reporting, repurposing, and brand monitoring, as repeatable skills you run on your own accounts.",
    keywords: [
      "AI for social media managers",
      "social media ROI reporting",
      "content repurposing AI",
      "social media client reporting",
      "brand mention monitoring",
      "social media agency automation",
    ],
    h1: "You have AI for the posts. What about everything around them?",
    subhead:
      "Ideation and scheduling are solved. The work that proves your value, reporting, ROI, and repurposing, is still manual. Skill008 turns that into skills.",
    problem: {
      heading: "The AI in your stack stops at the caption",
      intro:
        "You are already brainstorming and scheduling with AI. But the parts that keep clients and justify retainers are still done by hand.",
      points: [
        "You schedule posts, but tying them back to real results is a monthly scramble.",
        "Every client wants a report, and every report is built from scratch.",
        "One good idea should become ten posts, but repurposing is all manual.",
        "By the time you spot a brand mention or a trend, it has already moved on.",
      ],
    },
    skillsHeading: "Skills for the work between the posts",
    skills: [
      {
        title: "Weekly ROI report",
        desc: "Pull each client's post performance and turn it into a plain-English report tied to their goals, ready to send.",
        connects: ["Instagram", "LinkedIn", "Google Analytics"],
      },
      {
        title: "One post into ten",
        desc: "Take a single winning post and repurpose it into formats for every channel, kept in the client's voice.",
        connects: ["Notion", "Buffer"],
      },
      {
        title: "Client recap deck",
        desc: "At month end, assemble the wins, the numbers, and the next steps into a recap each client can skim.",
        connects: ["Google Analytics", "Slides"],
      },
      {
        title: "Mention monitor",
        desc: "Watch for brand mentions and relevant trends, and draft a response or a content angle while it is still live.",
        connects: ["X", "Reddit", "Email"],
      },
      {
        title: "Comment and DM triage",
        desc: "Sort the day's comments and DMs across accounts, draft replies to the repeat questions, and flag the ones that need a human, so community management stops eating the morning.",
        connects: ["Instagram", "LinkedIn", "Email"],
      },
    ],
    connections: {
      heading: "Sits on top of the tools you already use",
      intro:
        "Skill008 does not replace your scheduler or your analytics. It runs the work between them, on your own accounts.",
      tools: ["Instagram", "LinkedIn", "X", "Buffer", "Google Analytics", "Notion"],
    },
    segments: {
      heading: "However you run social",
      items: [
        {
          name: "Agencies",
          pain: "Reporting across a dozen clients eats the week.",
          fix: "A per-client report skill turns each one into a repeatable run, not a from-scratch build.",
        },
        {
          name: "Solo and freelance",
          pain: "You are the strategist, the creator, and the analyst all at once.",
          fix: "Skills take the analyst hat off your head so you can stay on strategy and creation.",
        },
        {
          name: "In-house",
          pain: "Leadership wants ROI, not impressions.",
          fix: "An ROI skill ties posts to pipeline and to the revenue language your execs actually care about.",
        },
      ],
    },
    faq: [
      {
        q: "I already use AI for content. How is this different?",
        a: "This is for everything around the content: the reporting, ROI, repurposing, and monitoring that you still do by hand.",
      },
      {
        q: "Does it post for me?",
        a: "Only if you want it to. By default it drafts and you approve before anything goes live.",
      },
      {
        q: "Can each client have their own voice?",
        a: "Yes. A skill can carry a client's tone and rules so the output sounds like them, not like a template.",
      },
    ],
    cta: {
      heading: "Prove the value you already create.",
      sub: "Start with the report you dread building most.",
    },
  },
  {
    slug: "job-helper",
    name: "Job search and career",
    eyebrow: "For job seekers and career changers",
    title: "AI Job Search Skills: Resume, Interviews, Follow-ups | Skill008",
    description:
      "More than a resume builder. Skills that tailor your resume to each job, prep you for interviews, track applications, and send the follow ups that get replies. Runs on your own accounts.",
    keywords: [
      "AI job search",
      "resume tailoring AI",
      "interview prep AI",
      "job application tracker",
      "career change tools",
      "layoff job search help",
    ],
    h1: "A job search is a project. Run it like one.",
    subhead:
      "Whether you are leveling up, switching fields, or were caught in a layoff, Skill008 turns the search into skills, so the busywork does not bury the prep that actually lands the job.",
    problem: {
      heading: "The search eats itself",
      intro:
        "Looking for work is a full-time job made of small, repeating tasks, and most of them are not the ones that get you hired.",
      points: [
        "Every application wants a tailored resume, so you tailor none of them well.",
        "You apply, then lose track of where and when.",
        "The follow up that gets a reply is the one you forget to send.",
        "Interview prep gets skipped because the admin ate the time.",
      ],
    },
    skillsHeading: "Skills for the whole search, not just the resume",
    skills: [
      {
        title: "Resume tailor",
        desc: "Take your base resume and a job description, and draft a version that mirrors what the role actually asks for.",
        connects: ["Docs", "Email"],
      },
      {
        title: "Interview prep",
        desc: "Generate the likely questions for a specific role and company, and coach you through tight, honest answers.",
        connects: ["Calendar"],
      },
      {
        title: "Application tracker",
        desc: "Log every application with date, status, and next step, and tell you who to follow up with today.",
        connects: ["Email", "Sheets"],
      },
      {
        title: "Follow-up writer",
        desc: "Draft the thank-you and the nudge after each interview, timed so you stay top of mind without nagging.",
        connects: ["Email"],
      },
      {
        title: "Cover letter drafter",
        desc: "From your resume and a job post, draft a specific cover letter that does not read like a template, for the roles that still want one.",
        connects: ["Docs", "Email"],
      },
    ],
    connections: {
      heading: "Works with the tools you already have",
      intro:
        "No new platform to learn. Skill008 runs on your own email, docs, and calendar.",
      tools: ["Gmail", "Google Docs", "Google Sheets", "Calendar", "LinkedIn"],
    },
    segments: {
      heading: "Wherever you are in it",
      items: [
        {
          name: "Leveling up",
          pain: "You are employed but aiming higher, with no time to run a search.",
          fix: "Skills do the tailoring and the tracking in the margins of your week.",
        },
        {
          name: "Changing fields",
          pain: "Your experience does not map cleanly to the new role.",
          fix: "A translation skill reframes what you have done in the language of where you are going.",
        },
        {
          name: "After a layoff",
          pain: "You need momentum and structure, fast.",
          fix: "Skills give the search a system, so progress does not depend on motivation alone.",
        },
      ],
    },
    faq: [
      {
        q: "Is this just another resume builder?",
        a: "No. The resume is one skill. The rest cover interviews, tracking, follow ups, and your stories, the whole search.",
      },
      {
        q: "Will it apply to jobs for me?",
        a: "No. It does the prep and the drafting. You stay in control of what actually gets sent.",
      },
      {
        q: "Is my information private?",
        a: "Yes. It runs on your own accounts and access. We never store your resume or your data.",
      },
    ],
    cta: {
      heading: "Run your search like the project it is.",
      sub: "Start with the task that is slowing you down today.",
    },
  },
  {
    slug: "teachers",
    name: "Teachers",
    eyebrow: "For K-12 teachers",
    title:
      "AI Skills for K-12 Teachers: Lesson Plans, Report Cards, Conferences | Skill008",
    description:
      "Turn the after-hours teaching work into repeatable skills your AI runs for you. Plan backward from the test, draft report-card comments from your notes and attendance, and schedule parent conferences. Draft-only, and your students' data stays yours.",
    keywords: [
      "AI for teachers",
      "lesson plan generator",
      "report card comment generator",
      "parent teacher conference scheduling",
      "backward design unit planner",
      "K-12 teacher AI tools",
    ],
    h1: "You went into teaching for the kids, not the paperwork.",
    subhead:
      "Skill008 turns the planning, grading, and parent comms you take home into skills your AI runs for you. No new gradebook to learn, and your students' data stays yours.",
    problem: {
      heading: "The work after the bell",
      intro:
        "The teaching ends at three, but the planning, the comments, and the parent emails follow you home.",
      points: [
        "Lesson plans get rebuilt from scratch every year instead of reused.",
        "Report-card comments pile up into one long, late weekend.",
        "Scheduling parent conferences turns into a week of back-and-forth email.",
        "The small moments worth telling a parent about are forgotten by Friday.",
      ],
    },
    skillsHeading: "Skills that hand you back your evenings",
    skills: [
      {
        title: "Backward unit planner",
        desc: "Start from the test date or the standard, and work back into a week-by-week plan with checkpoints along the way.",
        connects: ["Google Docs", "Notion"],
      },
      {
        title: "Report-card comment drafts",
        desc: "Turn the running notes you jot from your phone and an attendance or gradebook CSV into a first-draft comment for each student, in your voice and varied enough to not repeat, for you to edit.",
        connects: ["Google Sheets", "Notion"],
      },
      {
        title: "Parent email triage and replies",
        desc: "Sort the parent inbox, draft replies to the same few questions about grades, behavior, and missing work in your voice, and flag the ones that really need you.",
        connects: ["Gmail", "Outlook"],
      },
      {
        title: "Missing-work chaser",
        desc: "Pull the missing assignments by student from your gradebook, and draft the reminder to each student or parent, so you are not nagging from memory.",
        connects: ["Google Sheets", "Email"],
      },
      {
        title: "Conference prep pack",
        desc: "Draft the sign-up message, turn the replies into a clash-free schedule, and build a one-page prep sheet per student: grades, attendance, and a positive to open with.",
        connects: ["Calendar", "Email", "Google Sheets"],
      },
      {
        title: "Substitute plan in a pinch",
        desc: "When you are out sick, turn tomorrow's lesson into clear plans a substitute can actually follow.",
        connects: ["Google Docs"],
      },
    ],
    connections: {
      heading: "Works with the tools your classroom already runs on",
      intro:
        "Skill008 never holds your login. Each skill runs through the AI assistant and the docs, sheets, and calendar you already use, on your own access.",
      tools: ["Google Docs", "Google Sheets", "Notion", "Calendar", "Email"],
    },
    segments: {
      heading: "Tuned to what you teach",
      intro:
        "Same idea, shaped to the grading and planning your room knows best.",
      items: [
        {
          name: "Elementary",
          pain: "One teacher, every subject, and a stack of narrative report cards.",
          fix: "A comment skill drafts each child's narrative from your notes, so the weekend is yours again.",
        },
        {
          name: "Middle school",
          pain: "A hundred-plus students across periods, and the names start to blur.",
          fix: "A per-period log keeps a line on each student, ready when comments and parent calls come due.",
        },
        {
          name: "High school",
          pain: "Essays and labs to grade, plus recommendation letters on top.",
          fix: "A first-draft skill turns your rubric notes into feedback and rec-letter starts you can edit.",
        },
      ],
    },
    faq: [
      {
        q: "Does this grade my students or change their records?",
        a: "No. Every skill is draft-only. It writes a first draft from your own notes for you to edit, and nothing is finalized without you.",
      },
      {
        q: "Where does my students' data go?",
        a: "Nowhere new. Skills run inside the AI assistant and the tools you already use. We never store student names, notes, or attendance.",
      },
      {
        q: "I am not technical. Can I still set this up?",
        a: "Yes. You describe the task once in plain English, like planning backward from a test, and the skill is written for you.",
      },
      {
        q: "Will the comments still sound like me?",
        a: "They start from your notes and your phrasing, so the draft reads in your voice. You edit before anything goes home.",
      },
    ],
    cta: {
      heading: "Less grading, more teaching.",
      sub: "Start with the task that is stealing your weekend, like report-card comments.",
    },
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}

export function verticalSlugs(): string[] {
  return verticals.map((v) => v.slug);
}
