export function ClipboardDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="10" y="10" width="28" height="32" rx="3" />
      <rect x="18" y="6" width="12" height="7" rx="2" />
      <line x1="16" y1="22" x2="32" y2="22" />
      <line x1="16" y1="28" x2="32" y2="28" />
      <line x1="16" y1="34" x2="26" y2="34" />
    </svg>
  );
}

export function CompassDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="24" cy="24" r="16" />
      <path d="M31 17 L21 21 L17 31 L27 27 Z" />
      <circle cx="24" cy="24" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
