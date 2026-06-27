// Content for the Forward Deployed Engineer page at /fde.
// The hiring list is grouped the same way the source deck is: Frontier labs,
// the consulting integrators, and the non-obvious "gems". Links point to live
// careers pages on purpose, because open counts move week to week.

export type FdeCompany = {
  name: string;
  url: string;
};

export type FdeGroup = {
  id: string;
  title: string;
  blurb: string;
  companies: FdeCompany[];
};

export const fdeGroups: FdeGroup[] = [
  {
    id: "frontier",
    title: "Frontier",
    blurb: "AI labs and platforms. The teams shipping the models also need the people who make them land.",
    companies: [
      { name: "Google Cloud", url: "https://careers.google.com/jobs/results/?q=forward%20deployed%20engineer" },
      { name: "OpenAI", url: "https://openai.com/careers/search/?q=forward+deployed+engineer" },
      { name: "Anthropic", url: "https://www.anthropic.com/careers" },
      { name: "Palantir", url: "https://www.palantir.com/careers/open-positions/" },
      { name: "Scale AI", url: "https://job-boards.greenhouse.io/scaleai" },
      { name: "Mistral", url: "https://mistral.ai/careers" },
      { name: "Cohere", url: "https://jobs.ashbyhq.com/cohere" },
      { name: "Salesforce", url: "https://careers.salesforce.com/en/jobs/" },
      { name: "Databricks", url: "https://www.databricks.com/company/careers" },
      { name: "Cursor", url: "https://cursor.com/careers/forward-deployed-engineer" },
      { name: "Sourcegraph", url: "https://job-boards.greenhouse.io/sourcegraph91" },
      { name: "Glean", url: "https://job-boards.greenhouse.io/gleanwork" },
      { name: "Hebbia", url: "https://www.hebbia.com/careers" },
      { name: "Vercel", url: "https://vercel.com/careers" },
      { name: "Notion", url: "https://jobs.ashbyhq.com/notion" },
    ],
  },
  {
    id: "consulting",
    title: "Consulting",
    blurb: "The integrators staffing up. Their whole business is making other companies' rollouts stick.",
    companies: [
      { name: "Deloitte", url: "https://apply.deloitte.com/en_US/careers" },
      { name: "McKinsey / QuantumBlack", url: "https://www.mckinsey.com/careers/search-jobs" },
      { name: "Accenture", url: "https://www.accenture.com/us-en/careers" },
      { name: "Booz Allen", url: "https://careers.boozallen.com" },
      { name: "West Monroe", url: "https://www.westmonroe.com/careers" },
      { name: "KPMG", url: "https://kpmg.us/careers.html" },
      { name: "PwC", url: "https://www.pwc.com/us/en/careers.html" },
    ],
  },
  {
    id: "gems",
    title: "Gems",
    blurb: "The non-obvious ones. Fintech, security, defense, and dev tools that quietly run on field engineers.",
    companies: [
      { name: "Stripe", url: "https://stripe.com/jobs" },
      { name: "Anduril", url: "https://www.anduril.com/open-roles/" },
      { name: "BNY", url: "https://jobs.bny.com" },
      { name: "Snyk", url: "https://snyk.io/careers/" },
      { name: "Runway", url: "https://runwayml.com/careers" },
      { name: "Greptile", url: "https://www.greptile.com/careers" },
      { name: "Weights & Biases", url: "https://wandb.ai/site/careers" },
      { name: "Replit", url: "https://replit.com/careers" },
      { name: "Lockheed Martin", url: "https://www.lockheedmartinjobs.com" },
      { name: "Plaid", url: "https://plaid.com/careers/" },
      { name: "Datadog", url: "https://careers.datadoghq.com" },
      { name: "Elastic", url: "https://www.elastic.co/careers" },
      { name: "CrowdStrike", url: "https://www.crowdstrike.com/en-us/careers/" },
      { name: "Ramp", url: "https://ramp.com/careers" },
      { name: "Brex", url: "https://www.brex.com/careers" },
      { name: "dbt Labs", url: "https://www.getdbt.com/careers" },
      { name: "Confluent", url: "https://www.confluent.io/careers/" },
      { name: "HashiCorp", url: "https://www.hashicorp.com/careers" },
    ],
  },
];

export function fdeCompanyCount(): number {
  return fdeGroups.reduce((sum, g) => sum + g.companies.length, 0);
}

// The three beats of the pricing shift the page narrates.
export const fdeShift: { key: string; label: string; title: string; body: string }[] = [
  {
    key: "seats",
    label: "The old way",
    title: "Buy seats by the dozen",
    body: "Software was sold by the seat. You bought licenses up front, on volume, and hoped people logged in. The spreadsheet of who-has-what was the whole game.",
  },
  {
    key: "metered",
    label: "The shift",
    title: "Metered, pay as you go",
    body: "Agents broke the seat model. You pay for what the work actually consumes, not for a chair nobody sits in. Usage, not headcount.",
  },
  {
    key: "tokens",
    label: "Where it lands",
    title: "A token economy",
    body: "Value follows usage down to the token. The winners are the ones who turn raw capability into work that runs, repeatedly, in the real world.",
  },
];

// Source: MIT NANDA, 2025.
export const fdePilotStat = {
  figure: "95%",
  claim: "of enterprise AI pilots show no measurable P&L impact.",
  source: "MIT NANDA, 2025",
};
