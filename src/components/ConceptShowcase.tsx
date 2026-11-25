"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO, RollingLabel } from "@/components/MotionPrimitives";
import { WORK_CONCEPTS, type WorkConcept } from "@/data/work";

function ConceptVisual({ concept, index }: { concept: WorkConcept; index: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)]/85 p-5"
    >
      {/* Ambient gradient corner */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.22)_0%,transparent_70%)] blur-xl" />

      {/* Browser / App wireframe header */}
      <div className="relative flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-[var(--accent-cyan)]/70" />
        </div>
        <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Blueprint 0{index + 1}
        </span>
      </div>

      {/* Stylized geometric layout modules */}
      <div className="relative my-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-[var(--accent-cyan)]/35 bg-[var(--accent-soft)] flex items-center justify-center">
            <span className="font-display text-sm font-semibold text-[var(--accent-cyan)]">
              V
            </span>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-3/4 rounded-full bg-white/15" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-2">
          {concept.deliverables.slice(0, 3).map((item, i) => (
            <div
              key={item}
              className="rounded-lg border border-[var(--border-subtle)] bg-white/[0.03] p-2.5"
            >
              <div
                className={`mb-2 h-1.5 w-6 rounded-full ${
                  i === 0
                    ? "bg-[#6366f1]"
                    : i === 1
                    ? "bg-[#2563eb]"
                    : "bg-[#06b6d4]"
                }`}
              />
              <div className="h-1.5 w-full rounded-full bg-white/10" />
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-white/5" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer pill */}
      <div className="relative flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-[11px] text-[var(--text-muted)]">
        <span>{concept.category}</span>
        <span className="font-mono-label text-[10px] uppercase tracking-wider text-[var(--accent-cyan)]">
          Concept Spec
        </span>
      </div>
    </div>
  );
}

export function ConceptShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  const total = WORK_CONCEPTS.length;
  const current = WORK_CONCEPTS[activeIndex];

  const goTo = (nextIndex: number) => {
    const normalized = (nextIndex + total) % total;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(normalized);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
    >
      {/* Top Bar: Selector Tabs & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
        <div
          role="tablist"
          aria-label="Concept project selector"
          className="flex flex-wrap items-center gap-2"
        >
          {WORK_CONCEPTS.map((item, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => goTo(idx)}
                className={`relative rounded-full px-3.5 py-1.5 font-mono-label text-xs transition-colors ${
                  selected
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="velqora-concept-tab"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 360, damping: 30 }
                    }
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full border border-[var(--accent-cyan)]/40 bg-[var(--accent-soft)]"
                  />
                )}
                0{idx + 1}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous concept"
            className="velqora-roll-btn inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <RollingLabel label="Prev" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next concept"
            className="velqora-roll-btn inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
          >
            <RollingLabel label="Next" />
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Animated Concept Stage */}
      <div className="mt-7 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            aria-label={current.title}
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, x: direction > 0 ? 28 : -28 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, x: direction > 0 ? -28 : 28 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.42,
              ease: EASE_OUT_EXPO,
            }}
            className="grid items-stretch gap-8 lg:grid-cols-12"
          >
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono-label text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    0{activeIndex + 1} / 0{total} &middot; {current.category}
                  </span>
                  {current.isConcept && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-cyan)]">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Concept
                    </span>
                  )}
                </div>

                <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  {current.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {current.summary}
                </p>
              </div>

              <div className="mt-7 space-y-4 border-t border-[var(--border-subtle)] pt-5">
                <ul className="flex flex-wrap gap-2">
                  {current.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="rounded-md border border-[var(--border-subtle)] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {deliverable}
                    </li>
                  ))}
                </ul>
                <p className="text-xs italic text-[var(--text-muted)]">
                  {current.outcomeNote}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ConceptVisual concept={current} index={activeIndex} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
