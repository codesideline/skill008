type IconType = "email" | "calendar" | "crm" | "files";

const apps: { cy: number; label: string; icon: IconType }[] = [
  { cy: 79, label: "Email", icon: "email" },
  { cy: 141, label: "Calendar", icon: "calendar" },
  { cy: 203, label: "CRM", icon: "crm" },
  { cy: 265, label: "Files", icon: "files" },
];

function ChipIcon({ type }: { type: IconType }) {
  const s = { stroke: "#20201E", strokeWidth: 1.6, fill: "none" } as const;
  switch (type) {
    case "email":
      return (
        <g {...s} strokeLinejoin="round">
          <rect x="14" y="15" width="22" height="16" rx="2.5" />
          <path d="M14 17 L25 26 L36 17" />
        </g>
      );
    case "calendar":
      return (
        <g {...s} strokeLinecap="round">
          <rect x="15" y="15" width="20" height="18" rx="2.5" />
          <line x1="15" y1="21" x2="35" y2="21" />
          <line x1="21" y1="12" x2="21" y2="17" />
          <line x1="29" y1="12" x2="29" y2="17" />
        </g>
      );
    case "crm":
      return (
        <g {...s} strokeLinecap="round">
          <circle cx="25" cy="19" r="4.5" />
          <path d="M16 33 C16 26, 34 26, 34 33" />
        </g>
      );
    case "files":
      return (
        <g {...s} strokeLinejoin="round">
          <path d="M14 19 h7 l3 3 h12 v10 a1 1 0 0 1 -1 1 h-20 a1 1 0 0 1 -1 -1 z" />
        </g>
      );
  }
}

export function AdapterDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 340"
      className={className}
      role="img"
      aria-label="Your assistant connects through one MCP adapter to your email, calendar, CRM, and files"
    >
      {/* connectors */}
      <g fill="none" stroke="#D8A93A" strokeWidth="2.5" strokeLinecap="round">
        <path d="M128 170 C 180 150, 212 192, 262 172" />
      </g>
      <g fill="none" stroke="#D8A93A" strokeWidth="2" strokeLinecap="round">
        <path d="M378 172 C 422 150, 442 92, 472 79" />
        <path d="M378 172 C 422 162, 442 150, 472 141" />
        <path d="M378 172 C 422 182, 442 196, 472 203" />
        <path d="M378 172 C 422 196, 442 250, 472 265" />
      </g>

      {/* assistant */}
      <circle cx="84" cy="170" r="44" fill="#F5B62B" />
      <circle cx="70" cy="160" r="3.2" fill="#20201E" />
      <circle cx="98" cy="160" r="3.2" fill="#20201E" />
      <path
        d="M68 180 Q84 194 100 180"
        fill="none"
        stroke="#20201E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="84"
        y="240"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        fill="#6E685D"
      >
        Your assistant
      </text>

      {/* MCP hub */}
      <rect
        x="262"
        y="140"
        width="116"
        height="64"
        rx="14"
        fill="#FBEFD0"
        stroke="#F5B62B"
        strokeWidth="2"
      />
      <text
        x="320"
        y="170"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="#20201E"
      >
        MCP
      </text>
      <text
        x="320"
        y="189"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="10.5"
        fill="#8a8478"
      >
        the adapter
      </text>

      {/* app chips */}
      {apps.map((a) => (
        <g key={a.label} transform={`translate(472 ${a.cy - 23})`}>
          <rect
            x="0"
            y="0"
            width="150"
            height="46"
            rx="12"
            fill="#FFFFFF"
            stroke="#E7DFCD"
            strokeWidth="1.5"
          />
          <ChipIcon type={a.icon} />
          <text
            x="50"
            y="29"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="600"
            fontSize="15"
            fill="#20201E"
          >
            {a.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function HouseDoodle({ className = "" }: { className?: string }) {
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
      <path d="M8 22 L24 9 L40 22" />
      <path d="M12 21 V39 H36 V21" />
      <path d="M21 39 V30 H27 V39" />
    </svg>
  );
}

export function OfficeDoodle({ className = "" }: { className?: string }) {
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
      <path d="M10 40 V12 H28 V40" />
      <path d="M28 40 V21 H38 V40" />
      <path d="M6 40 H42" />
      <line x1="15" y1="18" x2="17" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="15" y1="25" x2="17" y2="25" />
      <line x1="21" y1="25" x2="23" y2="25" />
      <line x1="15" y1="32" x2="17" y2="32" />
      <line x1="21" y1="32" x2="23" y2="32" />
    </svg>
  );
}

// Shared house + office + ground for the commute analogy panels.
function StreetScene() {
  return (
    <>
      <line
        x1="18"
        y1="140"
        x2="302"
        y2="140"
        stroke="#E7DFCD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g
        fill="none"
        stroke="#20201E"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* house */}
        <path d="M30 86 L52 66 L74 86" />
        <path d="M36 84 V140 H68 V84" />
        <path d="M48 140 V116 H58 V140" />
        {/* office */}
        <path d="M244 140 V78 H276 V140" />
        <path d="M276 140 V98 H292 V140" />
        <line x1="251" y1="90" x2="255" y2="90" />
        <line x1="263" y1="90" x2="267" y2="90" />
        <line x1="251" y1="104" x2="255" y2="104" />
        <line x1="263" y1="104" x2="267" y2="104" />
        <line x1="251" y1="118" x2="255" y2="118" />
        <line x1="263" y1="118" x2="267" y2="118" />
      </g>
    </>
  );
}

// "Without an MCP server": a wandering, dotted path with question marks.
export function RouteWander({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 170"
      className={className}
      role="img"
      aria-label="A wandering, uncertain path from a house to an office, marked with question marks"
    >
      <StreetScene />
      <path
        d="M66 128 C 96 74, 116 150, 146 100 S 200 150, 250 116"
        fill="none"
        stroke="#b3ac9e"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="1.5 8"
      />
      <circle cx="66" cy="128" r="3.2" fill="#b3ac9e" />
      <text
        x="120"
        y="78"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="20"
        fontWeight="700"
        fill="#b3ac9e"
      >
        ?
      </text>
      <text
        x="196"
        y="122"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="20"
        fontWeight="700"
        fill="#b3ac9e"
      >
        ?
      </text>
    </svg>
  );
}

// "With an MCP server": a set route, a backup road, a speed sign, a destination pin.
export function RouteSet({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 170"
      className={className}
      role="img"
      aria-label="A set route from a house to an office, with a backup road, a speed sign, and a destination pin"
    >
      <StreetScene />
      <path
        d="M120 112 C 150 84, 192 84, 226 106"
        fill="none"
        stroke="#D8A93A"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
      <path
        d="M66 128 C 120 100, 170 120, 250 108"
        fill="none"
        stroke="#D8A93A"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeDasharray="7 6"
      />
      <circle cx="66" cy="128" r="3.4" fill="#D8A93A" />
      {/* speed sign */}
      <line
        x1="150"
        y1="140"
        x2="150"
        y2="122"
        stroke="#20201E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="150" cy="116" r="8.5" fill="#ffffff" stroke="#C9512C" strokeWidth="2" />
      <text
        x="150"
        y="119.5"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#C9512C"
      >
        30
      </text>
      {/* destination pin */}
      <path
        d="M258 104 C 250 95 252 86 258 86 C 264 86 266 95 258 104 Z"
        fill="#C9512C"
      />
      <circle cx="258" cy="92" r="2.4" fill="#FBEFD0" />
    </svg>
  );
}
