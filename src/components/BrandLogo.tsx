"use client";

import React, { useId, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

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
    <span className="group inline-flex items-center gap-3 select-none">
      {/* Custom faceted V-letter monogram only */}
      <svg
        width={box}
        height={box}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
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
          className="transition-colors duration-300 group-hover:stroke-[#06B6D4]/60"
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
        Velqora{" "}
        <span className="font-normal text-[var(--text-secondary)]">Agency</span>
      </span>
    </span>
  );
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function VMonogramSculpture() {
  const gradId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      style={prefersReducedMotion ? undefined : { y: scrollY, rotate: scrollRotate }}
      className="relative mx-auto flex aspect-square w-full max-w-[290px] items-center justify-center sm:max-w-[370px] lg:max-w-[420px]"
    >
      {/* Layered ambient cyan/cobalt halo */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.34)_0%,rgba(6,182,212,0.16)_46%,transparent_72%)] blur-2xl"
      />

      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full drop-shadow-[0_24px_48px_rgba(2,6,23,0.85)]"
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
            <stop offset="0%" stopColor="rgba(15, 23, 42, 0.92)" />
            <stop offset="100%" stopColor="rgba(11, 17, 32, 0.58)" />
          </linearGradient>
        </defs>

        {/* Outer rotating orbital ring (hidden on reduced-motion; lightweight GPU transform) */}
        <circle
          cx="160"
          cy="160"
          r="138"
          stroke="rgba(148, 163, 184, 0.18)"
          strokeWidth="1"
          strokeDasharray="4 7"
          className={prefersReducedMotion ? undefined : "orbit-ring-slow hidden sm:block"}
        />

        {/* Secondary crisp hairline ring */}
        <motion.circle
          cx="160"
          cy="160"
          r="122"
          stroke="rgba(56, 189, 248, 0.14)"
          strokeWidth="1"
          initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE_OUT_EXPO }}
        />

        {/* Core dark glass disc */}
        <motion.circle
          cx="160"
          cy="160"
          r="106"
          fill={`url(#${gradId}-glass)`}
          stroke="rgba(56, 189, 248, 0.28)"
          strokeWidth="1.4"
          initial={prefersReducedMotion ? false : { scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        />

        {/* Precision inner crosshair ticks */}
        <path
          d="M160 44V58M160 262V276M44 160H58M262 160H276"
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Animated V-letter architectural strokes */}
        <motion.path
          d="M92 98L158 228L186 172"
          stroke="#F8FAFC"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE_OUT_EXPO }}
        />
        <motion.path
          d="M228 98L186 182"
          stroke={`url(#${gradId}-stroke)`}
          strokeWidth="14"
          strokeLinecap="round"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.28, ease: EASE_OUT_EXPO }}
        />

        {/* Cyan apex beacon */}
        <motion.circle
          cx="228"
          cy="98"
          r="7"
          fill="#06B6D4"
          initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.48, ease: EASE_OUT_EXPO }}
        />
      </svg>
    </motion.div>
  );
}
