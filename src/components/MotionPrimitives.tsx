"use client";

import React, { useRef } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Immediate mount reveal for above-the-fold Hero content.
 * Keeps critical copy and CTAs visible rapidly without any blocking preloader.
 */
interface HeroRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function HeroReveal({
  children,
  className,
  delay = 0,
  y = 18,
}: HeroRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.58, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type RevealDirection = "up" | "left" | "right" | "scale";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 26,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Constrain horizontal slide offset within mobile horizontal padding (px-5 = 20px)
  // so offscreen left/right reveals stay inside the viewport before triggering.
  const horizontalDistance = Math.min(distance, 16);

  const initialByDirection: Record<
    RevealDirection,
    { opacity: number; x?: number; y?: number; scale?: number }
  > = {
    up: { opacity: 0, y: distance },
    left: { opacity: 0, x: -horizontalDistance },
    right: { opacity: 0, x: horizontalDistance },
    scale: { opacity: 0, scale: 0.96, y: 12 },
  };

  return (
    <motion.div
      initial={initialByDirection[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
}: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.985 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.56, ease: EASE_OUT_EXPO },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-driven showcase expansion (subtle scale & lift as section enters center).
 * Automatically renders statically when prefers-reduced-motion is active.
 */
export function ScrollShowcaseBand({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.95, 1, 1, 0.985]);
  const y = useTransform(scrollYProgress, [0, 0.35, 1], [24, 0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.85, 1], [0.65, 1, 1, 0.9]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Subtle top reading progress line driven by native scroll position.
 */
export function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-[#6366f1] via-[#2563eb] to-[#06b6d4]"
    />
  );
}

/**
 * Dual-layer vertical rolling text span triggered on hover or focus-visible.
 */
export function RollingLabel({ label }: { label: string }) {
  return (
    <span className="velqora-roll-track">
      <span className="velqora-roll-primary">{label}</span>
      <span className="velqora-roll-secondary" aria-hidden="true">
        {label}
      </span>
    </span>
  );
}
