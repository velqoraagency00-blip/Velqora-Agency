import type { Metadata } from "next";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import { HeroReveal, Reveal, RollingLabel } from "@/components/MotionPrimitives";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_CONFIG.brandName} via ${SITE_CONFIG.contactEmail}.`,
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--bg-void)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <HeroReveal delay={0.02} y={14}>
          <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
            Contact {SITE_CONFIG.brandName}
          </p>
        </HeroReveal>

        <HeroReveal delay={0.08} y={18}>
          <h1 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Let&apos;s discuss{" "}
            <span className="text-gradient-velqora">your project</span>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.14} y={16}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            Reach out directly by email with a brief overview of your goals,
            preferred service, and timeline.
          </p>
        </HeroReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal direction="left" delay={0.06}>
            <div className="glass-panel velqora-card flex h-full flex-col justify-between rounded-2xl p-7 sm:p-8">
              <div>
                <h2 className="font-mono-label text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Direct Email
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Email is the only direct contact channel for{" "}
                  {SITE_CONFIG.brandName}. Click below to open your email app
                  and send us your project brief directly.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(
                    "Project Inquiry — Velqora Agency"
                  )}`}
                  className="btn-gradient-velqora velqora-roll-btn inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <RollingLabel label={SITE_CONFIG.contactEmail} />
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="glass-panel velqora-card flex h-full flex-col justify-between rounded-2xl p-7 sm:p-8">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <ShieldCheck
                    className="h-4 w-4 text-[var(--accent-cyan)]"
                    aria-hidden="true"
                  />
                  <h2>What to include in your note</h2>
                </div>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  <li>• The service or combination of services you need</li>
                  <li>• Your ideal timeline or target launch window</li>
                  <li>• Any existing website or storefront links</li>
                </ul>
              </div>

              <p className="mt-6 border-t border-[var(--border-subtle)] pt-4 text-xs leading-relaxed text-[var(--text-muted)]">
                Please avoid sending passwords, Social Security numbers, bank or
                card account numbers, or confidential financial documents in
                initial inquiry emails.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
