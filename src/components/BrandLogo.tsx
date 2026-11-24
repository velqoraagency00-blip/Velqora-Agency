import React from "react";

interface BrandLogoProps {
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { box: 28, text: "text-base" },
  md: { box: 34, text: "text-lg" },
  lg: { box: 42, text: "text-xl" },
} as const;

export function BrandLogo({ theme = "light", size = "md" }: BrandLogoProps) {
  const { box, text } = SIZE_MAP[size];
  const isDarkSurface = theme === "dark";
  const primaryStroke = isDarkSurface ? "#F6F4EF" : "#111318";
  const accentFill = "#D95326";

  return (
    <span className="inline-flex items-center gap-3 select-none">
      {/* Custom V-letter geometric monogram only */}
      <svg
        width={box}
        height={box}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Outer architectural frame */}
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="9"
          stroke={primaryStroke}
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />
        {/* Primary left-to-apex V stroke */}
        <path
          d="M10.5 11.5L19.5 29.5L23.2 22.1"
          stroke={primaryStroke}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Precision secondary right arm of the V */}
        <path
          d="M29.5 11.5L23.5 23.5"
          stroke={accentFill}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Minimalist apex dot */}
        <circle cx="29.5" cy="11.5" r="1.8" fill={accentFill} />
      </svg>

      <span
        className={`font-display font-semibold tracking-tight ${text} ${
          isDarkSurface ? "text-[var(--text-on-ink)]" : "text-[var(--text-primary)]"
        }`}
      >
        Velqora <span className="font-normal opacity-80">Agency</span>
      </span>
    </span>
  );
}
