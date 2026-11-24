import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/MotionPrimitives";
import { PROCESS_STEPS, SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_CONFIG.brandName}, our working principles, and how we partner with clients.`,
};

const PRINCIPLES = [
  {
    title: "Clarity over noise",
    description:
      "Every interface, storefront, and campaign is structured so visitors immediately understand what you offer and what to do next.",
  },
  {
    title: "Honest, compliant communication",
    description:
      "We never invent fake metrics, testimonials, or guaranteed results—especially in sensitive areas like credit repair, public records, and reputation management.",
  },
  {
    title: "Maintainable craft",
    description:
      "We build on modern, documented foundations so your team can update content and scale features without fighting brittle code.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--bg-canvas)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
            About {SITE_CONFIG.brandName}
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Built to bridge design craft, engineering, and practical growth
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {SITE_CONFIG.brandName} is a multidisciplinary digital agency
            focused on helping businesses launch dependable websites, Shopify
            storefronts, mobile apps, creative media, and advisory workflows
            without unnecessary complexity.
          </p>
        </Reveal>

        {/* Principles */}
        <section className="mt-16" aria-labelledby="principles-heading">
          <Reveal>
            <h2
              id="principles-heading"
              className="font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl"
            >
              Operating principles
            </h2>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <StaggerItem key={principle.title}>
                <article className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7">
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {principle.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>

        {/* Process */}
        <section className="mt-20" aria-labelledby="process-heading">
          <Reveal>
            <h2
              id="process-heading"
              className="font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl"
            >
              How engagements run
            </h2>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <StaggerItem key={step.number}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
                  <span className="font-mono-label text-xs font-medium text-[var(--accent)]">
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
        </section>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-ink)] px-6 py-3 text-sm font-medium text-[var(--text-on-ink)] transition-colors hover:bg-[var(--accent)]"
            >
              Explore our services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)]"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
