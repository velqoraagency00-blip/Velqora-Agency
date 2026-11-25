"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "@/components/BrandLogo";
import {
  EASE_OUT_EXPO,
  RollingLabel,
  ScrollProgressBar,
} from "@/components/MotionPrimitives";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site";

const OVERLAY_LINKS = [...NAV_ITEMS, { label: "Privacy", href: "/privacy" }];

export function SiteHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuOpen = openPath === pathname;

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const focusTimer = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 40);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpenPath(null);
          return;
        }
        if (event.key === "Tab" && overlayRef.current) {
          const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.clearTimeout(focusTimer);
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = previousOverflow;
      };
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <>
      <ScrollProgressBar />

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] backdrop-blur-md"
            : "border-b border-transparent bg-[var(--bg-void)]/75 backdrop-blur-sm"
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--accent-blue)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Left: Brand Monogram & Wordmark */}
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap rounded-lg py-1 transition-opacity hover:opacity-90"
            aria-label="Velqora Agency home"
          >
            <BrandLogo size="md" />
          </Link>

          {/* Center: Glass Pill Navigation with Sliding Active Highlight (Desktop) */}
          <nav
            aria-label="Primary"
            className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 lg:flex ${
              scrolled
                ? "border border-[var(--border-subtle)] bg-[var(--bg-glass)] shadow-[0_8px_32px_rgba(2,6,23,0.55)] backdrop-blur-md"
                : "border border-white/10 bg-white/[0.03]"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} on GitHub (opens in a new tab)`}
                    className="relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)] lg:px-3.5"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
                  </a>
                );
              }

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 lg:px-3.5 ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="velqora-nav-pill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/10"
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Direct CTA + Animated Asymmetric Menu Trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="velqora-roll-btn hidden items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white/[0.04] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] sm:inline-flex"
            >
              <RollingLabel label="Contact" />
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpenPath(menuOpen ? null : pathname)}
              aria-expanded={menuOpen}
              aria-controls="full-navigation-overlay"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-10 items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)]"
            >
              <span className="hidden sm:inline">
                {menuOpen ? "Close" : "Menu"}
              </span>
              {/* Animated two-line asymmetric menu icon */}
              <span
                aria-hidden="true"
                className="relative flex h-3.5 w-4 flex-col justify-center gap-1.5"
              >
                <span
                  className={`block h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ${
                    menuOpen ? "translate-y-[3.75px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "w-4 -translate-y-[3.75px] -rotate-45" : "w-2.5 self-end"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Blurred Overlay Menu (Desktop & Mobile) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={overlayRef}
            id="full-navigation-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.34, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[var(--bg-void)]/95 px-5 py-6 backdrop-blur-xl sm:px-8 sm:py-8"
          >
            {/* Overlay Top Bar */}
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpenPath(null)}
                aria-label="Velqora Agency home"
              >
                <BrandLogo size="md" />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpenPath(null)}
                aria-label="Close navigation menu"
                className="inline-flex h-10 items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)]"
              >
                <span>Close</span>
                <span
                  aria-hidden="true"
                  className="relative flex h-3.5 w-4 items-center justify-center"
                >
                  <span className="absolute h-[1.5px] w-4 rotate-45 rounded-full bg-current" />
                  <span className="absolute h-[1.5px] w-4 -rotate-45 rounded-full bg-current" />
                </span>
              </button>
            </div>

            {/* Overlay Main Content */}
            <div className="mx-auto my-auto grid w-full max-w-6xl gap-10 py-10 md:grid-cols-12 md:items-center md:gap-12">
              {/* Left Info Column */}
              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.42,
                  delay: prefersReducedMotion ? 0 : 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                className="order-2 space-y-6 text-center md:order-1 md:col-span-5 md:text-left"
              >
                <p className="font-mono-label text-xs uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
                  Start a Conversation
                </p>
                <h2 className="font-display text-2xl font-semibold leading-snug text-[var(--text-primary)] sm:text-3xl">
                  Have a project in mind?{" "}
                  <span className="text-gradient-velqora">
                    Let&apos;s scope it clearly.
                  </span>
                </h2>
                <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                  <Link
                    href="/contact"
                    onClick={() => setOpenPath(null)}
                    className="btn-gradient-velqora velqora-roll-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
                  >
                    <RollingLabel label="Get in Touch" />
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="border-t border-[var(--border-subtle)] pt-5">
                  <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Direct Email
                  </p>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-cyan)]"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="break-all">{SITE_CONFIG.contactEmail}</span>
                  </a>
                </div>
              </motion.div>

              {/* Right Staggered Navigation Links */}
              <nav
                aria-label="Overlay navigation"
                className="order-1 md:order-2 md:col-span-7"
              >
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: prefersReducedMotion ? 0 : 0.05,
                        delayChildren: prefersReducedMotion ? 0 : 0.04,
                      },
                    },
                  }}
                  className="space-y-2 border-b border-[var(--accent-blue)]/30 pb-8 md:border-b-0 md:pb-0"
                >
                  {OVERLAY_LINKS.map((item, index) => {
                    const isExternal = "external" in item && item.external;
                    const isActive =
                      !isExternal &&
                      (item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href));

                    const linkClassName = `group flex items-baseline justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
                      isActive
                        ? "bg-white/[0.07] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)]"
                    }`;

                    const linkBody = (
                      <>
                        <span className="font-display text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                          {item.label}
                        </span>
                        <span className="inline-flex items-center gap-2 font-mono-label text-xs text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-cyan)]">
                          <span>0{index + 1}</span>
                          <ArrowUpRight
                            className={`h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                              isExternal
                                ? "opacity-80 group-hover:opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      </>
                    );

                    return (
                      <motion.li
                        key={item.href}
                        variants={{
                          hidden: prefersReducedMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 24 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: prefersReducedMotion ? 0 : 0.45,
                              ease: EASE_OUT_EXPO,
                            },
                          },
                        }}
                      >
                        {isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpenPath(null)}
                            aria-label={`${item.label} on GitHub (opens in a new tab)`}
                            className={linkClassName}
                          >
                            {linkBody}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setOpenPath(null)}
                            aria-current={isActive ? "page" : undefined}
                            className={linkClassName}
                          >
                            {linkBody}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>
            </div>

            {/* Overlay Footer */}
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between text-xs text-[var(--text-muted)]">
              <span>{SITE_CONFIG.brandName}</span>
              <span>Email-only contact</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
