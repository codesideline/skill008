export function SkillFlowDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 200"
      className={className}
      role="img"
      aria-label="A task you keep doing becomes a written guide, and your AI follows it"
    >
      {/* connectors */}
      <g fill="none" stroke="#D8A93A" strokeWidth="2.5" strokeLinecap="round">
        <path d="M146 92 H247" />
        <path d="M384 92 H489" />
      </g>
      <g fill="#D8A93A">
        <path d="M256 92 L245 86 V98 Z" />
        <path d="M498 92 L487 86 V98 Z" />
      </g>

      {/* Node 1: the person doing the task */}
      <circle cx="96" cy="92" r="44" fill="#FFFFFF" stroke="#E7DFCD" strokeWidth="2" />
      <g
        fill="none"
        stroke="#56514a"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="96" cy="82" r="11" />
        <path d="M75 113 C 80 95, 112 95, 117 113" />
      </g>
      <text
        x="96"
        y="176"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="12.5"
        fill="#6E685D"
      >
        The task you keep doing
      </text>

      {/* Node 2: the guide */}
      <rect
        x="264"
        y="50"
        width="112"
        height="84"
        rx="10"
        fill="#FFFFFF"
        stroke="#E7DFCD"
        strokeWidth="2"
      />
      <rect x="282" y="66" width="46" height="8" rx="4" fill="#F5B62B" />
      <g stroke="#D8C9A8" strokeWidth="5.5" strokeLinecap="round">
        <line x1="284" y1="90" x2="356" y2="90" />
        <line x1="284" y1="104" x2="356" y2="104" />
        <line x1="284" y1="118" x2="336" y2="118" />
      </g>
      <text
        x="320"
        y="176"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="12.5"
        fill="#6E685D"
      >
        Becomes a guide
      </text>

      {/* Node 3: your AI */}
      <circle cx="544" cy="92" r="44" fill="#F5B62B" />
      <circle cx="530" cy="82" r="3.4" fill="#20201E" />
      <circle cx="558" cy="82" r="3.4" fill="#20201E" />
      <path
        d="M528 102 Q544 116 560 102"
        fill="none"
        stroke="#20201E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="544"
        y="176"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="12.5"
        fill="#6E685D"
      >
        Your AI follows it
      </text>
    </svg>
  );
}

export function SpeechDoodle({ className = "" }: { className?: string }) {
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
      <path d="M8 11 H40 V31 H22 L14 39 V31 H8 Z" />
      <line x1="15" y1="19" x2="33" y2="19" />
      <line x1="15" y1="25" x2="27" y2="25" />
    </svg>
  );
}

export function GuideDoodle({ className = "" }: { className?: string }) {
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
      <path d="M24 12 C 18 8, 10 8, 7 10 V38 C 10 36, 18 36, 24 40" />
      <path d="M24 12 C 30 8, 38 8, 41 10 V38 C 38 36, 30 36, 24 40" />
      <line x1="24" y1="12" x2="24" y2="40" />
    </svg>
  );
}

export function SkillGlyph({ className = "" }: { className?: string }) {
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
      <rect x="13" y="8" width="22" height="32" rx="3" />
      <line x1="18" y1="17" x2="30" y2="17" />
      <line x1="18" y1="23" x2="30" y2="23" />
      <line x1="18" y1="29" x2="26" y2="29" />
    </svg>
  );
}

export function HarnessGlyph({ className = "" }: { className?: string }) {
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
      <rect x="8" y="11" width="32" height="26" rx="3" />
      <line x1="8" y1="19" x2="40" y2="19" />
      <circle cx="13" cy="15" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="15" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function McpGlyph({ className = "" }: { className?: string }) {
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
      <line x1="19" y1="8" x2="19" y2="17" />
      <line x1="29" y1="8" x2="29" y2="17" />
      <rect x="15" y="17" width="18" height="12" rx="3" />
      <path d="M24 29 V40" />
    </svg>
  );
}
