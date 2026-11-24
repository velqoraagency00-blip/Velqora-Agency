import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Sparkles } from "lucide-react";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/MotionPrimitives";
import { SERVICE_GROUPS } from "@/data/services";
import { PROCESS_STEPS, SITE_CONFIG } from "@/data/site";
import { WORK_CONCEPTS } from "@/data/work";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <Reveal>
            <p className="font-mono-label inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              <span
                className="h-2 w-2 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              {SITE_CONFIG.brandName}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display mt-7 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
              Digital products, design systems, and growth built with{" "}
              <span className="text-[var(--accent)]">quiet precision</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {SITE_CONFIG.brandName} partners with businesses and founders to
              design, engineer, and grow modern digital experiences—from web and
              Shopify storefronts to UX/UI, mobile apps, AI video, marketing,
              and specialized advisory.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-ink)] px-6 py-3.5 text-sm font-medium text-[var(--text-on-ink)] transition-colors hover:bg-[var(--accent)]"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
              >
                Explore all 14 services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Overview */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
                  Capabilities
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Fourteen services, four focused disciplines
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
              >
                View full service scope
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICE_GROUPS.map((group) => (
              <StaggerItem key={group.id}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-7 transition-colors hover:border-[var(--border-strong)]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-label text-xs uppercase tracking-widest text-[var(--text-muted)]">
                        {group.index}
                      </span>
                      <span className="font-mono-label text-xs text-[var(--text-muted)]">
                        {group.items.length} services
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-2xl font-semibold text-[var(--text-primary)]">
                      {group.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {group.subtitle}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-5">
                    {group.items.map((service) => (
                      <li
                        key={service.id}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]"
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Work & Capabilities Preview */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
                  Selected Capabilities
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Concept builds &amp; studio direction
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  These examples are clearly labeled as capability concepts to
                  illustrate how {SITE_CONFIG.brandName} structures engineering,
                  design, and growth systems.
                </p>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
              >
                Explore concept portfolio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {WORK_CONCEPTS.slice(0, 2).map((item) => (
              <StaggerItem key={item.id}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 transition-colors hover:border-[var(--border-strong)]">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono-label text-xs uppercase tracking-wider text-[var(--text-muted)]">
                        {item.category}
                      </span>
                      {item.isConcept && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-hover)]">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          Concept
                        </span>
                      )}
                    </div>
                    <h3 className="font-display mt-4 text-xl font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                    <ul className="flex flex-wrap gap-2">
                      {item.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                        >
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Approach / Process */}
      <section className="border-b border-[var(--border-ink)] bg-[var(--bg-ink)] py-20 text-[var(--text-on-ink)] sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
              How We Work
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              A calm, structured process from first brief to handover
            </h2>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <StaggerItem key={step.number}>
                <div className="h-full rounded-2xl border border-[var(--border-ink)] bg-[var(--bg-ink-elevated)] p-6">
                  <span className="font-mono-label text-xs font-medium text-[var(--accent)]">
                    {step.number}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-semibold text-[var(--text-on-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-on-ink-muted)]">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-[var(--bg-canvas)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-12">
              <div className="grid items-center gap-8 md:grid-cols-12">
                <div className="md:col-span-8">
                  <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
                    Get in Touch
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    Ready to scope your next project with {SITE_CONFIG.brandName}?
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                    Reach out directly by email or preview our project inquiry
                    form. Please avoid sending passwords or sensitive financial
                    documents.
                  </p>
                </div>

                <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--bg-ink)] px-6 py-3.5 text-sm font-medium text-[var(--text-on-ink)] transition-colors hover:bg-[var(--accent)] md:w-auto"
                  >
                    Go to Contact page
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)] md:w-auto"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{SITE_CONFIG.contactEmail}</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
