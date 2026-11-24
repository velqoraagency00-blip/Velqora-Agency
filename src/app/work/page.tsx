import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info, Sparkles } from "lucide-react";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/MotionPrimitives";
import { SITE_CONFIG } from "@/data/site";
import { WORK_CONCEPTS } from "@/data/work";

export const metadata: Metadata = {
  title: "Work",
  description: `Capability concepts and studio direction examples from ${SITE_CONFIG.brandName}.`,
};

export default function WorkPage() {
  return (
    <div className="bg-[var(--bg-canvas)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
            Work &amp; Capabilities
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Concept architectures built to show how we think
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            Every card below is an original capability concept created by{" "}
            {SITE_CONFIG.brandName}. We do not publish fabricated client names,
            invented awards, or made-up performance metrics.
          </p>
        </Reveal>

        {/* Beginner-friendly placeholder guide */}
        <Reveal delay={0.1}>
          <aside
            aria-label="Note on concept placeholders"
            className="mt-8 flex items-start gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 text-sm text-[var(--text-secondary)]"
          >
            <Info
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium text-[var(--text-primary)]">
                Editable Concept Placeholders
              </p>
              <p className="mt-1 leading-relaxed">
                When you are ready to add real client projects, edit{" "}
                <code className="rounded bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-primary)]">
                  src/data/work.ts
                </code>{" "}
                and set{" "}
                <code className="rounded bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-primary)]">
                  isConcept: false
                </code>
                . Step-by-step instructions are in{" "}
                <code className="rounded bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-primary)]">
                  README.md
                </code>
                .
              </p>
            </div>
          </aside>
        </Reveal>

        {/* Concept Grid */}
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {WORK_CONCEPTS.map((project, index) => (
            <StaggerItem key={project.id}>
              <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 transition-colors hover:border-[var(--border-strong)]">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-label text-xs uppercase tracking-widest text-[var(--text-muted)]">
                      0{index + 1} &middot; {project.category}
                    </span>
                    {project.isConcept && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-hover)]">
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                        Concept
                      </span>
                    )}
                  </div>

                  <h2 className="font-display mt-4 text-2xl font-semibold text-[var(--text-primary)]">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 space-y-4 border-t border-[var(--border-subtle)] pt-5">
                  <div>
                    <h3 className="font-mono-label text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      Scope Included
                    </h3>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {project.deliverables.map((item) => (
                        <li
                          key={item}
                          className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--text-primary)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs italic text-[var(--text-muted)]">
                    {project.outcomeNote}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* CTA */}
        <Reveal>
          <div className="mt-16 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
              Share your goals and preferred timeline with{" "}
              {SITE_CONFIG.brandName} to plan your build.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-ink)] px-6 py-3 text-sm font-medium text-[var(--text-on-ink)] transition-colors hover:bg-[var(--accent)]"
              >
                Discuss your project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
