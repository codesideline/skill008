// Base URL used for canonical links, sitemap, and Open Graph metadata.
// Production always resolves to the public domain so preview deploys never
// leak a *.vercel.app host into canonical/OG tags. Set NEXT_PUBLIC_SITE_URL to
// override locally; a vercel.app value is ignored on purpose.
const PRODUCTION_URL = "https://skill008.com";

function resolveSiteUrl(): string {
  const override = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (override && !override.includes("vercel.app")) return override;
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl().replace(/\/$/, "");

export const SITE_NAME = "Skill008";

// Where contact and support email links point. Override per deploy.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@skill008.app";
