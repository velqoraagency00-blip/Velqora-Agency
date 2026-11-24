import React from "react";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-[var(--border-ink)] bg-[var(--bg-ink)] text-[var(--text-on-ink)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-block rounded-md"
              aria-label="Velqora Agency home"
            >
              <BrandLogo theme="dark" size="lg" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-on-ink-muted)]">
              Multidisciplinary digital agency crafting web platforms, Shopify
              storefronts, UX/UI systems, AI video, and growth workflows with
              clarity and care.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono-label text-xs uppercase tracking-widest text-[var(--text-on-ink-muted)]">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--text-on-ink)]/85 transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[var(--text-on-ink)]/85 transition-colors hover:text-[var(--accent)]"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-mono-label text-xs uppercase tracking-widest text-[var(--text-on-ink-muted)]">
              Direct Contact
            </h2>
            <p className="mt-4 text-sm text-[var(--text-on-ink-muted)]">
              Email is our sole direct communication channel. Please do not send
              passwords or sensitive financial documents.
            </p>
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--border-ink)] bg-[var(--bg-ink-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--text-on-ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="break-all">{SITE_CONFIG.contactEmail}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-ink)] pt-6 text-xs text-[var(--text-on-ink-muted)] sm:flex-row sm:items-center">
          <p>&copy; {year} Velqora Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[var(--text-on-ink)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/services"
              className="transition-colors hover:text-[var(--text-on-ink)]"
            >
              All Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
