import React, { useId } from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { box: 28, text: "text-base" },
  md: { box: 34, text: "text-lg" },
  lg: { box: 40, text: "text-xl" },
} as const;

export function BrandLogo({ size = "md" }: BrandLogoProps) {
  const { box, text } = SIZE_MAP[size];
  const gradId = useId();

  return (
    <span className="inline-flex items-center gap-3 select-none">
      {/* Custom faceted V-letter monogram only */}
      <svg
        width={box}
        height={box}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="8"
            y1="8"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="10"
          fill="#0B1120"
          stroke="rgba(148, 163, 184, 0.25)"
          strokeWidth="1.2"
        />
        {/* Left structural V arm */}
        <path
          d="M10.5 11.5L19.6 29.5L23.1 22.4"
          stroke="#F8FAFC"
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right precision accent V arm */}
        <path
          d="M29.5 11.5L23.3 23.8"
          stroke={`url(#${gradId})`}
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        {/* Apex node */}
        <circle cx="29.5" cy="11.5" r="1.8" fill="#06B6D4" />
      </svg>

      <span
        className={`font-display font-semibold tracking-tight text-[var(--text-primary)] ${text}`}
      >
        Velqora <span className="font-normal text-[var(--text-secondary)]">Agency</span>
      </span>
    </span>
  );
}

export function VMonogramSculpture() {
  const gradId = useId();

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center sm:max-w-[420px]"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_0%,rgba(6,182,212,0.12)_45%,transparent_72%)] blur-2xl" />

      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full drop-shadow-[0_24px_48px_rgba(2,6,23,0.8)]"
      >
        <defs>
          <linearGradient
            id={`${gradId}-stroke`}
            x1="50"
            y1="50"
            x2="270"
            y2="270"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient
            id={`${gradId}-glass`}
            x1="40"
            y1="40"
            x2="280"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(15, 23, 42, 0.9)" />
            <stop offset="100%" stopColor="rgba(11, 17, 32, 0.55)" />
          </linearGradient>
        </defs>

        {/* Outer orbital ring */}
        <circle
          cx="160"
          cy="160"
          r="134"
          stroke="rgba(148, 163, 184, 0.14)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="160"
          cy="160"
          r="108"
          fill={`url(#${gradId}-glass)`}
          stroke="rgba(56, 189, 248, 0.22)"
          strokeWidth="1.2"
        />

        {/* Inner architectural V */}
        <path
          d="M92 98L158 228L186 172"
          stroke="#F8FAFC"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M228 98L186 182"
          stroke={`url(#${gradId}-stroke)`}
          strokeWidth="14"
          strokeLinecap="round"
        />
        <circle cx="228" cy="98" r="7" fill="#06B6D4" />
      </svg>
    </div>
  );
}
