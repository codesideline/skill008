// Hand-drawn art for the Forward Deployed Engineer page. Line-art in the same
// doodle language as the rest of the site: currentColor strokes, warm accents.

type GlyphProps = { className?: string };

// Seat licenses as a spreadsheet grid: the old, buy-on-volume world.
export function SeatsGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="6" y="10" width="52" height="44" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 22 H58 M6 33 H58 M6 44 H58 M23 10 V54 M40 10 V54" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="14.5" cy="16" r="2.4" fill="currentColor" />
      <circle cx="31.5" cy="16" r="2.4" fill="currentColor" />
      <circle cx="48.5" cy="16" r="2.4" fill="currentColor" />
      <circle cx="14.5" cy="27.5" r="2.4" fill="currentColor" opacity="0.4" />
      <circle cx="31.5" cy="27.5" r="2.4" fill="currentColor" />
      <circle cx="48.5" cy="27.5" r="2.4" fill="currentColor" opacity="0.4" />
      <circle cx="14.5" cy="38.5" r="2.4" fill="currentColor" opacity="0.4" />
      <circle cx="31.5" cy="38.5" r="2.4" fill="currentColor" opacity="0.4" />
      <circle cx="48.5" cy="38.5" r="2.4" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// A meter / gauge: pay for what the work consumes.
export function MeterGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M10 44 A22 22 0 0 1 54 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 44 A16 16 0 0 1 48 44" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M32 44 L45 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="44" r="3.5" fill="currentColor" />
      <path d="M12 44 L9 44 M52 44 L55 44 M32 22 L32 19 M19 30 L17 28 M45 30 L47 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <rect x="20" y="50" width="24" height="6" rx="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// Tokens / coins: value priced by usage.
export function TokenGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <ellipse cx="26" cy="40" rx="16" ry="7" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 40 V30 M42 40 V30" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="26" cy="30" rx="16" ry="7" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 30 V22 M42 30 V22" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
      <ellipse cx="26" cy="22" rx="16" ry="7" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
      <circle cx="48" cy="18" r="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M48 14 V22 M45.5 16.5 H50 a2 2 0 0 1 0 4 H46 a2 2 0 0 0 0 4 H50.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A short, scrappy arrow used between the three beats.
export function ShiftArrow({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 60 24" fill="none" className={className} aria-hidden>
      <path d="M4 12 C 20 6, 38 6, 54 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 7 L55 12 L46 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A small "open door" mark for the closing, networked-in note.
export function DoorGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M12 42 V8 L34 4 V42" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 42 H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="29" cy="24" r="1.8" fill="currentColor" />
      <path d="M34 4 L41 8 V42 H34" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}
