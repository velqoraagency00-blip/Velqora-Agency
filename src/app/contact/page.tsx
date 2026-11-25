import type { Metadata } from "next";
import { Mail, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { HeroReveal, Reveal } from "@/components/MotionPrimitives";
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
            Reach out by email with a brief overview of your goals, or send your
            inquiry directly using the form below.
          </p>
        </HeroReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <Reveal direction="left" delay={0.06}>
              <div className="glass-panel velqora-card rounded-2xl p-7">
                <h2 className="font-mono-label text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Direct Email
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Email is the only direct contact channel for{" "}
                  {SITE_CONFIG.brandName}.
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="mt-4 inline-flex items-center gap-2.5 rounded-xl border border-[var(--border-strong)] bg-white/[0.03] px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="break-all">{SITE_CONFIG.contactEmail}</span>
                </a>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.12}>
              <div className="glass-panel velqora-card rounded-2xl p-7">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <ShieldCheck
                    className="h-4 w-4 text-[var(--accent-cyan)]"
                    aria-hidden="true"
                  />
                  <h2>What to include in your note</h2>
                </div>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  <li>• The service or combination of services you need</li>
                  <li>• Your ideal timeline or target launch window</li>
                  <li>• Any existing website or storefront links</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
