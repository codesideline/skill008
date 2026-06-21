import type { ReactNode } from "react";

// Per-persona line-art glyphs in the shared house style. Stroke uses
// currentColor so each icon inherits its tile's text color (and flips to amber
// when the tile is active).
function glyph(slug: string): ReactNode {
  switch (slug) {
    case "crm-hygiene":
      // contact record card
      return (
        <>
          <rect x="4.5" y="8" width="23" height="16" rx="2.5" />
          <circle cx="11" cy="14" r="2.3" />
          <path d="M7.5 19.5 C7.5 16.5 14.5 16.5 14.5 19.5" />
          <line x1="18" y1="13" x2="23.5" y2="13" />
          <line x1="18" y1="16.5" x2="23.5" y2="16.5" />
        </>
      );
    case "chief-of-staff":
      // clipboard checklist
      return (
        <>
          <rect x="8" y="6.5" width="16" height="20" rx="2.5" />
          <rect x="12.5" y="4.5" width="7" height="3.6" rx="1.2" />
          <path d="M11 13 l1.4 1.4 l2.6 -2.8" />
          <line x1="17.5" y1="13" x2="21" y2="13" />
          <path d="M11 19 l1.4 1.4 l2.6 -2.8" />
          <line x1="17.5" y1="19" x2="21" y2="19" />
        </>
      );
    case "trades":
      // hard hat, bold and clearly readable
      return (
        <>
          <path d="M8 20 C8 11.4 24 11.4 24 20" />
          <path d="M4 20.2 Q16 17.4 28 20.2 Q16 23.4 4 20.2 Z" />
          <path d="M16 11 V19.6" />
          <path d="M12.5 19.6 C12.5 13.8 13.1 12.3 14.3 11.4" />
          <path d="M19.5 19.6 C19.5 13.8 18.9 12.3 17.7 11.4" />
        </>
      );
    case "jobber":
      // invoice / receipt with $
      return (
        <>
          <path d="M8 5.5 H24 V25 l-4 -1.6 l-4 1.6 l-4 -1.6 l-4 1.6 Z" />
          <line x1="16" y1="8.5" x2="16" y2="21.5" />
          <path d="M18.5 11 C18.5 9.5 13.5 9.5 13.5 12.3 C13.5 14.8 18.5 14.5 18.5 17.2 C18.5 20 13.5 20 13.5 18.2" />
        </>
      );
    case "social-media-manager":
      // speech bubble + heart
      return (
        <>
          <rect x="5" y="7" width="22" height="14" rx="4" />
          <path d="M11.5 20.5 L11.5 25 L16.5 20.7" />
          <path d="M16 12 c-1 -1.8 -4 -0.9 -4 1.3 c0 1.9 2.4 3.1 4 4.3 c1.6 -1.2 4 -2.4 4 -4.3 c0 -2.2 -3 -3.1 -4 -1.3 Z" />
        </>
      );
    case "job-helper":
      // magnifying glass
      return (
        <>
          <circle cx="14" cy="14" r="7" />
          <line x1="19" y1="19" x2="25.5" y2="25.5" />
        </>
      );
    case "teachers":
      // chalkboard on an easel
      return (
        <>
          <rect x="6" y="4.5" width="20" height="14" rx="1.5" />
          <path d="M10 9.5 H21" />
          <path d="M10 13 H17" />
          <path d="M11 18.5 L8 28" />
          <path d="M21 18.5 L24 28" />
          <path d="M9.3 24.3 H22.7" />
        </>
      );
    default:
      // generic person
      return (
        <>
          <circle cx="16" cy="12" r="4.5" />
          <path d="M7 25 C7 18 25 18 25 25" />
        </>
      );
  }
}

export function PersonaIcon({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph(slug)}
    </svg>
  );
}
