import {
  siGmail,
  siGooglecalendar,
  siZoom,
  siNotion,
  siGoogledrive,
  siAtlassian,
  siAirtable,
  siGithub,
  siLinear,
  siAsana,
  siHubspot,
  siStripe,
  siQuickbooks,
  siXero,
  siShopify,
  siIntercom,
  siZendesk,
  siZapier,
} from "simple-icons";

type IconLogo = { path: string; hex: string };
type MonoLogo = { mono: string; hex: string };
type Logo = IconLogo | MonoLogo;

// Real brand SVGs served from /public/logos for marks that no maintained icon
// font ships (removed over trademark requests). Rendered as <img> so each file's
// gradient ids stay isolated and cannot collide across repeated instances.
const BRAND_FILES: Record<string, { file: string; hex: string }> = {
  Slack: { file: "/logos/slack.svg", hex: "#4A154B" },
  "Microsoft Teams": { file: "/logos/microsoft-teams.svg", hex: "#6264A7" },
  Outlook: { file: "/logos/outlook.svg", hex: "#0F6CBD" },
  Salesforce: { file: "/logos/salesforce.svg", hex: "#00A1E0" },
};

// Maintained single-color brand glyphs; solid app-tile monograms for the niche
// apps that have no public icon at all.
const LOGOS: Record<string, Logo> = {
  Gmail: siGmail,
  "Google Calendar": siGooglecalendar,
  Zoom: siZoom,
  Notion: siNotion,
  "Google Drive and Docs": siGoogledrive,
  "Atlassian (Jira and Confluence)": siAtlassian,
  Airtable: siAirtable,
  GitHub: siGithub,
  Linear: siLinear,
  Asana: siAsana,
  HubSpot: siHubspot,
  Stripe: siStripe,
  QuickBooks: siQuickbooks,
  Xero: siXero,
  Shopify: siShopify,
  Intercom: siIntercom,
  Zendesk: siZendesk,
  "Zapier MCP": siZapier,
  Jobber: { mono: "J", hex: "#1E874B" },
  ServiceTitan: { mono: "ST", hex: "#2B2F36" },
  "Housecall Pro": { mono: "H", hex: "#2C6BED" },
  "monday.com": { mono: "m", hex: "#FF3D57" },
  Gong: { mono: "G", hex: "#3E0075" },
  Composio: { mono: "C", hex: "#6C4DF6" },
  Pipedream: { mono: "P", hex: "#12A150" },
};

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function relLum({ r, g, b }: { r: number; g: number; b: number }) {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

// Keep glyphs legible on a light chip: darken very pale brand colors toward ink.
function chipColors(hex: string) {
  let { r, g, b } = hexToRgb(hex);
  if (relLum({ r, g, b }) > 0.7) {
    const mix = (a: number, t: number) => Math.round(a + (t - a) * 0.55);
    r = mix(r, 32);
    g = mix(g, 30);
    b = mix(b, 30);
  }
  return { fg: `rgb(${r}, ${g}, ${b})`, bg: `rgba(${r}, ${g}, ${b}, 0.12)` };
}

// Solid app-tile colors for monograms: brand color fill with legible text.
function monoColors(hex: string) {
  const light = relLum(hexToRgb(hex)) > 0.6;
  return { bg: hex, fg: light ? "#20201E" : "#ffffff" };
}

export function ConnectorLogo({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  const sm = size === "sm";
  const boxClass = sm ? "h-7 w-7 rounded-lg" : "h-10 w-10 rounded-xl";
  const glyph = sm ? 15 : 20;
  const brandGlyph = sm ? 18 : 24;

  const brand = BRAND_FILES[name];
  if (brand) {
    const { bg } = chipColors(brand.hex);
    return (
      <span
        role="img"
        aria-label={`${name} logo`}
        className={`flex shrink-0 items-center justify-center ${boxClass}`}
        style={{ backgroundColor: bg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brand.file}
          alt=""
          width={brandGlyph}
          height={brandGlyph}
          className="object-contain"
        />
      </span>
    );
  }

  const logo: Logo =
    LOGOS[name] ?? { mono: name.charAt(0).toUpperCase(), hex: "#6E685D" };

  if ("path" in logo) {
    const { fg, bg } = chipColors(logo.hex);
    return (
      <span
        role="img"
        aria-label={`${name} logo`}
        className={`flex shrink-0 items-center justify-center ${boxClass}`}
        style={{ backgroundColor: bg }}
      >
        <svg
          viewBox="0 0 24 24"
          width={glyph}
          height={glyph}
          fill={fg}
          aria-hidden="true"
        >
          <path d={logo.path} />
        </svg>
      </span>
    );
  }

  const { bg, fg } = monoColors(logo.hex);
  return (
    <span
      role="img"
      aria-label={`${name} logo`}
      className={`flex shrink-0 items-center justify-center ${boxClass}`}
      style={{ backgroundColor: bg }}
    >
      <span
        className={`font-heading font-extrabold leading-none ${
          sm ? "text-[10px]" : "text-xs"
        }`}
        style={{ color: fg }}
      >
        {logo.mono}
      </span>
    </span>
  );
}
