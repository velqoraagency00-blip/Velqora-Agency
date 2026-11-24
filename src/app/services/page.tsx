import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/MotionPrimitives";
import { SERVICE_GROUPS } from "@/data/services";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore all 14 services offered by ${SITE_CONFIG.brandName}, spanning web and Shopify development, UX/UI design, mobile apps, AI video, marketing, and advisory.`,
};

export default function ServicesPage() {
  return (
    <div className="bg-[var(--bg-canvas)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Page Header */}
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
            Services Directory
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            End-to-end digital capabilities under one roof
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            {SITE_CONFIG.brandName} organizes 14 core services across four
            disciplines. Every engagement is scoped transparently—with no
            inflated promises or guaranteed outcome claims.
          </p>
        </Reveal>

        {/* Quick Jump Nav */}
        <Reveal delay={0.1}>
          <nav
            aria-label="Service categories"
            className="mt-10 flex flex-wrap gap-2.5 border-y border-[var(--border-subtle)] py-4"
          >
            {SERVICE_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {group.index}. {group.title}
              </a>
            ))}
          </nav>
        </Reveal>

        {/* Service Groups */}
        <div className="mt-14 space-y-20">
          {SERVICE_GROUPS.map((group) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-heading`}
              className="scroll-mt-24"
            >
              <Reveal>
                <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-subtle)] pb-6 md:flex-row md:items-end">
                  <div>
                    <span className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
                      Discipline {group.index}
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
                    <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                            {service.name}
                          </h3>
                          {service.needsLegalReview && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-hover)]">
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
                                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                                aria-hidden="true"
                              />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {service.reviewNote && (
                        <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-3.5 text-xs leading-relaxed text-[var(--text-secondary)]">
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

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl border border-[var(--border-ink)] bg-[var(--bg-ink)] p-8 text-[var(--text-on-ink)] sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Need a tailored combination of services?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--text-on-ink-muted)]">
                Tell us what you are building and we will outline a clear scope
                and timeline via email.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              Contact {SITE_CONFIG.brandName}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
