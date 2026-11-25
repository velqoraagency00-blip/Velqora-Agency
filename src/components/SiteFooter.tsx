import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Reveal, RollingLabel } from "@/components/MotionPrimitives";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-void)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Link
                href="/"
                className="inline-block rounded-lg"
                aria-label="Velqora Agency home"
              >
                <BrandLogo size="md" />
              </Link>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--text-muted)]">
                Digital products, design systems, and growth engineering. Email
                is our sole direct contact channel.
              </p>
            </div>

            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="velqora-roll-btn inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <RollingLabel label={SITE_CONFIG.contactEmail} />
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <p>&copy; {year} Velqora Agency. All rights reserved.</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-5">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} on GitHub (opens in a new tab)`}
                  className="inline-flex items-center gap-1 transition-colors hover:text-[var(--text-primary)]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/privacy"
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
