// Spot illustration for the "Who are you this week?" persona picker.
// Line-art in the shared house style: ink #20201E strokes, amber #F5B62B
// accent, round caps. Reads as "pick the version of you this week."
export function WhoAreYouArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 104"
      fill="none"
      className={className}
      role="img"
      aria-label="Pick the version of you for this week"
    >
      {/* fanned cards behind, same cream as the section so only the line shows */}
      <g stroke="#20201E" strokeWidth="1.6" strokeLinejoin="round" opacity="0.4">
        <rect
          x="56"
          y="32"
          width="46"
          height="54"
          rx="8"
          fill="#FBEFD0"
          transform="rotate(-11 79 59)"
        />
        <rect
          x="98"
          y="32"
          width="46"
          height="54"
          rx="8"
          fill="#FBEFD0"
          transform="rotate(11 121 59)"
        />
      </g>

      {/* amber selection ring (echoes the active persona pill) */}
      <rect
        x="68"
        y="18"
        width="64"
        height="72"
        rx="12"
        stroke="#F5B62B"
        strokeWidth="2.2"
        strokeDasharray="4 5.5"
        strokeLinecap="round"
      />

      {/* front card = the chosen you */}
      <rect
        x="74"
        y="24"
        width="52"
        height="60"
        rx="9"
        fill="#ffffff"
        stroke="#20201E"
        strokeWidth="1.8"
      />
      <g stroke="#20201E" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="100" cy="47" r="9" />
        <path d="M85 73 C85 59, 115 59, 115 73" />
      </g>

      {/* sparkle */}
      <g transform="translate(58 27)" fill="#F5B62B">
        <path d="M0 -5 C1.3 -1.3 1.3 -1.3 5 0 C1.3 1.3 1.3 1.3 0 5 C-1.3 1.3 -1.3 1.3 -5 0 C-1.3 -1.3 -1.3 -1.3 0 -5 Z" />
      </g>

      {/* cursor picking the card */}
      <g transform="translate(119 69) rotate(10)">
        <path
          d="M0 0 L0 17 L4.6 12.6 L7.8 19 L10.2 17.9 L7 11.6 L13 11.5 Z"
          fill="#ffffff"
          stroke="#20201E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
