"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuOpen = openPath === pathname;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "border-b border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] backdrop-blur-md"
            : "border-b border-transparent bg-[var(--bg-void)]/70 backdrop-blur-sm"
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
            className="rounded-lg py-1 transition-opacity hover:opacity-90"
            aria-label="Velqora Agency home"
          >
            <BrandLogo size="md" />
          </Link>

          {/* Center: Glass Pill Navigation (Desktop) */}
          <nav
            aria-label="Primary"
            className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-300 md:flex ${
              scrolled
                ? "border border-[var(--border-subtle)] bg-[var(--bg-glass)] shadow-[0_8px_28px_rgba(2,6,23,0.45)]"
                : "border border-white/10 bg-white/[0.03]"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-white/10 text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Direct CTA + Overlay Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white/[0.04] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] sm:inline-flex"
            >
              Contact
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setOpenPath(menuOpen ? null : pathname)}
              aria-expanded={menuOpen}
              aria-controls="full-navigation-overlay"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)]"
            >
              <span className="hidden sm:inline">
                {menuOpen ? "Close" : "Menu"}
              </span>
              {menuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Blurred Overlay Menu (Desktop & Mobile) */}
      {menuOpen && (
        <div
          id="full-navigation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[var(--bg-void)]/95 px-5 py-6 backdrop-blur-xl sm:px-8 sm:py-8"
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpenPath(null)}
              aria-label="Velqora Agency home"
            >
              <BrandLogo size="md" />
            </Link>
            <button
              type="button"
              onClick={() => setOpenPath(null)}
              aria-label="Close navigation menu"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)]"
            >
              <span>Close</span>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mx-auto my-auto grid w-full max-w-6xl gap-12 py-10 md:grid-cols-12 md:items-center">
            {/* Left Info Column (Desktop) */}
            <div className="order-2 space-y-6 md:order-1 md:col-span-5">
              <p className="font-mono-label text-xs uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
                Start a Conversation
              </p>
              <h2 className="font-display text-2xl font-semibold leading-snug text-[var(--text-primary)] sm:text-3xl">
                Have a project in mind?{" "}
                <span className="text-gradient-velqora">Let&apos;s scope it clearly.</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  onClick={() => setOpenPath(null)}
                  className="btn-gradient-velqora inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
                >
                  Open Contact Form
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
            </div>

            {/* Right Large Stacked Navigation Links */}
            <nav
              aria-label="Overlay navigation"
              className="order-1 md:order-2 md:col-span-7"
            >
              <ul className="space-y-3 border-b border-[var(--border-subtle)] pb-8 md:border-b-0 md:pb-0">
                {[...NAV_ITEMS, { label: "Privacy", href: "/privacy" }].map(
                  (item, index) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpenPath(null)}
                          aria-current={isActive ? "page" : undefined}
                          className={`group flex items-baseline justify-between rounded-xl px-3 py-2 transition-colors ${
                            isActive
                              ? "bg-white/[0.06] text-[var(--text-primary)]"
                              : "text-[var(--text-secondary)] hover:bg-white/[0.03] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <span className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                            {item.label}
                          </span>
                          <span className="font-mono-label text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)]">
                            0{index + 1}
                          </span>
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            </nav>
          </div>

          <div className="mx-auto flex w-full max-w-6xl items-center justify-between text-xs text-[var(--text-muted)]">
            <span>{SITE_CONFIG.brandName}</span>
            <span>Email-only contact</span>
          </div>
        </div>
      )}
    </>
  );
}
