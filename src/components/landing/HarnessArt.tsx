type AppType = "chatgpt" | "claude" | "copilot" | "cursor";

export function AppGlyph({
  type,
  color = "currentColor",
  className = "",
}: {
  type: AppType;
  color?: string;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  switch (type) {
    case "chatgpt":
      return (
        <g {...common} className={className}>
          <path d="M9 11 H39 V31 H21 L13 38 V31 H9 Z" />
          <line x1="16" y1="19" x2="32" y2="19" />
          <line x1="16" y1="25" x2="27" y2="25" />
        </g>
      );
    case "claude":
      return (
        <g {...common} className={className}>
          <line x1="24" y1="9" x2="24" y2="39" />
          <line x1="9" y1="24" x2="39" y2="24" />
          <line x1="13.5" y1="13.5" x2="34.5" y2="34.5" />
          <line x1="34.5" y1="13.5" x2="13.5" y2="34.5" />
        </g>
      );
    case "copilot":
      return (
        <g {...common} className={className}>
          <path d="M42 7 L6 23 L20 27 L24 40 L29 27 L42 7 Z" />
          <path d="M42 7 L20 27" />
        </g>
      );
    case "cursor":
      return (
        <g {...common} className={className}>
          <path d="M14 10 L34 23 L24 25.5 L29 36 L25 38 L20 27.5 L14 32 Z" />
        </g>
      );
  }
}

const tiles: { type: AppType; label: string; tint: string }[] = [
  { type: "chatgpt", label: "ChatGPT", tint: "#10A37F" },
  { type: "claude", label: "Claude", tint: "#CC7A57" },
  { type: "copilot", label: "Copilot", tint: "#3B6FB0" },
  { type: "cursor", label: "Cursor", tint: "#20201E" },
];

export function HarnessHero({ className = "" }: { className?: string }) {
  const cys = [44, 106, 168, 230];
  return (
    <svg
      viewBox="0 0 640 300"
      className={className}
      role="img"
      aria-label="Any one of these apps becomes the home for your assistant, and they all run the same skill"
    >
      {/* connectors */}
      <g fill="none" stroke="#D8A93A" strokeWidth="2.2" strokeLinecap="round">
        {cys.map((cy) => (
          <path key={cy} d={`M226 ${cy} C 360 ${cy}, 430 150, 512 150`} />
        ))}
      </g>

      {/* app tiles */}
      {tiles.map((t, i) => (
        <g key={t.type} transform={`translate(36 ${cys[i] - 26})`}>
          <rect
            width="190"
            height="52"
            rx="13"
            fill="#FFFFFF"
            stroke="#E7DFCD"
            strokeWidth="1.5"
          />
          <rect
            x="12"
            y="12"
            width="28"
            height="28"
            rx="8"
            fill={t.tint}
            opacity="0.12"
          />
          <g transform="translate(12 12) scale(0.5833)">
            <AppGlyph type={t.type} color={t.tint} />
          </g>
          <text
            x="52"
            y="32"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="600"
            fontSize="15"
            fill="#20201E"
          >
            {t.label}
          </text>
        </g>
      ))}

      {/* assistant */}
      <circle cx="558" cy="150" r="46" fill="#F5B62B" />
      <circle cx="543" cy="140" r="3.4" fill="#20201E" />
      <circle cx="573" cy="140" r="3.4" fill="#20201E" />
      <path
        d="M541 160 Q558 175 575 160"
        fill="none"
        stroke="#20201E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="558"
        y="222"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        fill="#6E685D"
      >
        Your assistant
      </text>
    </svg>
  );
}

export function AccountBadgeDoodle({ className = "" }: { className?: string }) {
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
      <rect x="7" y="9" width="34" height="30" rx="4" />
      <circle cx="19" cy="21" r="4.6" />
      <path d="M12 33 C 13.5 27, 24.5 27, 26 33" />
      <line x1="31" y1="18" x2="37" y2="18" />
      <line x1="31" y1="24" x2="37" y2="24" />
      <line x1="31" y1="30" x2="35" y2="30" />
    </svg>
  );
}
