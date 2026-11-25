import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { VMonogramSculpture } from "@/components/BrandLogo";
import { ConceptShowcase } from "@/components/ConceptShowcase";
import {
  HeroReveal,
  Reveal,
  RollingLabel,
  ScrollShowcaseBand,
  StaggerGroup,
  StaggerItem,
} from "@/components/MotionPrimitives";
import { SERVICE_GROUPS } from "@/data/services";
import { PROCESS_STEPS, SITE_CONFIG } from "@/data/site";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="ambient-grid relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-void)]">
        {/* Subtle ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-[540px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22)_0%,rgba(6,182,212,0.09)_46%,transparent_72%)] blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-18">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <HeroReveal delay={0.02} y={14}>
                <p className="font-mono-label inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--accent-cyan)]"
                    aria-hidden="true"
                  />
                  {SITE_CONFIG.brandName}
                </p>
              </HeroReveal>

              <HeroReveal delay={0.08} y={20}>
                <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)] sm:text-6xl lg:text-[4.35rem]">
                  Coded aesthetics,{" "}
                  <span className="text-gradient-velqora">
                    built with precision
                  </span>
                  .
                </h1>
              </HeroReveal>

              <HeroReveal delay={0.14} y={18}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  {SITE_CONFIG.brandName} partners with founders and growing
                  teams to engineer web platforms, Shopify storefronts, UX/UI
                  systems, mobile apps, AI video, and structured growth
                  workflows.
                </p>
              </HeroReveal>

              <HeroReveal delay={0.2} y={16}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="btn-gradient-velqora velqora-roll-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white"
                  >
                    <RollingLabel label="Start a conversation" />
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/services"
                    className="velqora-roll-btn inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                  >
                    <RollingLabel label="Explore all 11 services" />
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </HeroReveal>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-5">
              <VMonogramSculpture />
            </div>
          </div>

          {/* Desktop Animated Scroll Cue */}
          <div
            aria-hidden="true"
            className="mt-14 hidden flex-col items-center gap-2.5 lg:flex"
          >
            <span className="font-mono-label text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Scroll
            </span>
            <span className="scroll-beam-track rounded-full">
              <span className="scroll-beam-line" />
            </span>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-void)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal direction="left">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
                  Capabilities
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Eleven services, four focused disciplines
                </h2>
              </div>
              <Link
                href="/services"
                className="velqora-roll-btn inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent-cyan)] hover:decoration-[var(--accent-cyan)]"
              >
                <RollingLabel label="View full service scope" />
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICE_GROUPS.map((group) => (
              <StaggerItem key={group.id}>
                <article className="glass-panel velqora-card flex h-full flex-col justify-between rounded-2xl p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-label text-xs uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
                        {group.index}
                      </span>
                      <span className="font-mono-label text-xs text-[var(--text-muted)]">
                        {group.items.length}{" "}
                        {group.items.length === 1 ? "service" : "services"}
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
                      <li key={service.id}>
                        <Link
                          href={`/services#${group.id}`}
                          className="inline-block rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-3 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-cyan)]/50 hover:text-[var(--text-primary)]"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Interactive Work & Capabilities Showcase (Scroll-Linked Scale Band) */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/45 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal direction="right">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
                  Selected Capabilities
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Concept builds &amp; studio direction
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  Explore our interactive capability concepts—clearly labeled as
                  concepts—showing how {SITE_CONFIG.brandName} structures
                  engineering, design, and growth systems.
                </p>
              </div>
              <Link
                href="/work"
                className="velqora-roll-btn inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent-cyan)] hover:decoration-[var(--accent-cyan)]"
              >
                <RollingLabel label="View all concepts" />
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <ScrollShowcaseBand className="mt-10">
            <ConceptShowcase />
          </ScrollShowcaseBand>
        </div>
      </section>

      {/* Approach / Process */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-void)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal direction="up">
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
                <div className="glass-panel velqora-card h-full rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-xs font-medium text-[var(--accent-cyan)]">
                      {step.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]"
                    />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold text-[var(--text-primary)]">
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
          <Reveal direction="scale">
            <div className="glass-panel velqora-card relative overflow-hidden rounded-3xl p-8 sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.22)_0%,transparent_70%)] blur-2xl"
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
                    className="btn-gradient-velqora velqora-roll-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white md:w-auto"
                  >
                    <RollingLabel label="Go to Contact page" />
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="velqora-roll-btn inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] md:w-auto"
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
