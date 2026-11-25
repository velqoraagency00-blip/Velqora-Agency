import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  HeroReveal,
  Reveal,
  RollingLabel,
  StaggerGroup,
  StaggerItem,
} from "@/components/MotionPrimitives";
import {
  SERVICE_GROUPS,
  TOTAL_DISCIPLINES_COUNT,
  TOTAL_SERVICES_COUNT,
} from "@/data/services";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore all ${TOTAL_SERVICES_COUNT} services offered by ${SITE_CONFIG.brandName}, spanning web and Shopify development, brand identity, UX/UI, graphic, flyer, and presentation design, mobile apps, AI video, marketing, and advisory.`,
};

export default function ServicesPage() {
  return (
    <div className="bg-[var(--bg-void)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <HeroReveal delay={0.02} y={14}>
          <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
            Services Directory
          </p>
        </HeroReveal>

        <HeroReveal delay={0.08} y={18}>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            End-to-end digital capabilities{" "}
            <span className="text-gradient-velqora">under one roof</span>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.14} y={16}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            {SITE_CONFIG.brandName} organizes {TOTAL_SERVICES_COUNT} core
            services across {TOTAL_DISCIPLINES_COUNT} disciplines. Every
            engagement is scoped transparently—with no inflated promises or
            guaranteed outcome claims.
          </p>
        </HeroReveal>

        <HeroReveal delay={0.18} y={12}>
          <nav
            aria-label="Service categories"
            className="mt-10 flex flex-wrap gap-2.5 border-y border-[var(--border-subtle)] py-4"
          >
            {SERVICE_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
              >
                {group.index}. {group.title}
              </a>
            ))}
          </nav>
        </HeroReveal>

        <div className="mt-14 space-y-20">
          {SERVICE_GROUPS.map((group) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-heading`}
              className="scroll-mt-24"
            >
              <Reveal direction="left">
                <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-subtle)] pb-6 md:flex-row md:items-end">
                  <div>
                    <span className="font-mono-label text-xs uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
                      Discipline {group.index} &middot; {group.items.length}{" "}
                      {group.items.length === 1 ? "service" : "services"}
                    </span>
                    <h2
                      id={`${group.id}-heading`}
                      className="font-display mt-2 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl"
                    >
                      {group.title}
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
                    {group.subtitle}
                  </p>
                </div>
              </Reveal>

              <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-2">
                {group.items.map((service) => (
                  <StaggerItem key={service.id}>
                    <article className="glass-panel velqora-card flex h-full flex-col justify-between rounded-2xl p-7">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                            {service.name}
                          </h3>
                          {service.needsLegalReview && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                              <AlertTriangle
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                              Review Flagged
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {service.summary}
                        </p>

                        <ul className="mt-5 space-y-2">
                          {service.deliverables.map((deliverable) => (
                            <li
                              key={deliverable}
                              className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                            >
                              <CheckCircle2
                                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]"
                                aria-hidden="true"
                              />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {service.reviewNote && (
                        <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-white/[0.03] p-3.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                          <strong className="font-semibold text-[var(--text-primary)]">
                            Compliance Note:{" "}
                          </strong>
                          {service.reviewNote}
                        </div>
                      )}
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>
          ))}
        </div>

        <Reveal direction="scale">
          <div className="glass-panel velqora-card mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                Need a tailored combination of services?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
                Tell us what you are building and we will outline a clear scope
                and timeline.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-gradient-velqora velqora-roll-btn inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
            >
              <RollingLabel label={`Contact ${SITE_CONFIG.brandName}`} />
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
