import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { VMonogramSculpture } from "@/components/BrandLogo";
import {
  Reveal,
  ScrollShowcaseFrame,
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
      <section className="ambient-grid relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-void)]">
        {/* Subtle ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22)_0%,rgba(6,182,212,0.08)_45%,transparent_72%)] blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <Reveal>
                <p className="font-mono-label inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--accent-cyan)]"
                    aria-hidden="true"
                  />
                  {SITE_CONFIG.brandName}
                </p>
              </Reveal>

              <Reveal delay={0.07}>
                <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)] sm:text-6xl lg:text-[4.25rem]">
                  Coded aesthetics,{" "}
                  <span className="text-gradient-velqora">
                    built with precision
                  </span>
                  .
                </h1>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  {SITE_CONFIG.brandName} partners with founders and growing
                  teams to engineer web platforms, Shopify storefronts, UX/UI
                  systems, mobile apps, AI video, and structured growth
                  workflows.
                </p>
              </Reveal>

              <Reveal delay={0.21}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="btn-gradient-velqora inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white"
                  >
                    Start a conversation
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                  >
                    Explore all 14 services
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-5">
              <Reveal delay={0.1}>
                <VMonogramSculpture />
              </Reveal>
            </div>
          </div>

          {/* Desktop Scroll Indicator */}
          <div
            aria-hidden="true"
            className="mt-12 hidden items-center justify-center lg:flex"
          >
            <span className="font-mono-label text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-void)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
                  Capabilities
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Fourteen services, four focused disciplines
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent-cyan)] hover:decoration-[var(--accent-cyan)]"
              >
                View full service scope
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICE_GROUPS.map((group) => (
              <StaggerItem key={group.id}>
                <article className="glass-panel flex h-full flex-col justify-between rounded-2xl p-7 transition-colors duration-300 hover:border-[var(--border-glow)]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-label text-xs uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
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
                        className="rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
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

      {/* Work & Capabilities Showcase */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent-cyan)] hover:decoration-[var(--accent-cyan)]"
              >
                Explore concept portfolio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <ScrollShowcaseFrame className="mt-12 grid gap-6 md:grid-cols-2">
            {WORK_CONCEPTS.slice(0, 2).map((item) => (
              <article
                key={item.id}
                className="glass-panel flex h-full flex-col justify-between rounded-2xl p-7 transition-colors duration-300 hover:border-[var(--border-glow)]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-label text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      {item.category}
                    </span>
                    {item.isConcept && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-cyan)]">
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
                        className="rounded-md border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </ScrollShowcaseFrame>
        </div>
      </section>

      {/* Approach / Process */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-void)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
              How We Work
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              A calm, structured process from first brief to handover
            </h2>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <StaggerItem key={step.number}>
                <div className="glass-panel h-full rounded-2xl p-6 transition-colors duration-300 hover:border-[var(--border-glow)]">
                  <span className="font-mono-label text-xs font-medium text-[var(--accent-cyan)]">
                    {step.number}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-[var(--bg-void)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)] blur-2xl"
              />
              <div className="relative grid items-center gap-8 md:grid-cols-12">
                <div className="md:col-span-8">
                  <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
                    Get in Touch
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    Ready to scope your next project with{" "}
                    <span className="text-gradient-velqora">
                      {SITE_CONFIG.brandName}
                    </span>
                    ?
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                    Reach out directly by email or submit your inquiry through
                    our contact form. Please avoid sending passwords or
                    sensitive financial documents.
                  </p>
                </div>

                <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
                  <Link
                    href="/contact"
                    className="btn-gradient-velqora inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white md:w-auto"
                  >
                    Go to Contact page
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] md:w-auto"
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
