// Base URL used for canonical links, sitemap, and Open Graph metadata.
// Override in production by setting NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Skill008";

// Where contact and support email links point. Override per deploy.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@skill008.app";
