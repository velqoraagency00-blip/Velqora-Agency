import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/MotionPrimitives";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy Policy for ${SITE_CONFIG.brandName}.`,
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--bg-canvas)] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--accent)]">
            Privacy Policy
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            How {SITE_CONFIG.brandName} handles information
          </h1>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Baseline policy — review with legal counsel prior to public launch.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 text-sm text-[var(--text-secondary)]">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
              aria-hidden="true"
            />
            <p>
              <strong className="font-semibold text-[var(--text-primary)]">
                Business &amp; Legal Review Notice:
              </strong>{" "}
              This privacy page reflects the current static frontend build.
              Update and have it reviewed by a qualified legal advisor before
              connecting a live contact-form backend or analytics tools.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              1. Analytics &amp; Tracking
            </h2>
            <p className="mt-2">
              {SITE_CONFIG.brandName} does not currently use third-party
              advertising trackers, behavioral cookies, or analytics scripts on
              this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              2. Contact Inquiries
            </h2>
            <p className="mt-2">
              The contact form on this site is currently in preview mode and
              does not transmit or store submissions on a server. If you email{" "}
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="font-medium text-[var(--text-primary)] underline decoration-[var(--accent)] underline-offset-2"
              >
                {SITE_CONFIG.contactEmail}
              </a>{" "}
              directly, we use your email address and message solely to respond
              to your inquiry.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              3. Sensitive Personal &amp; Financial Data
            </h2>
            <p className="mt-2">
              Please do not send passwords, Social Security numbers, payment
              account numbers, or confidential financial documents through the
              website contact form or unencrypted initial inquiry emails.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              4. Contact for Privacy Questions
            </h2>
            <p className="mt-2">
              For any privacy-related questions, contact{" "}
              {SITE_CONFIG.brandName} at{" "}
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="font-medium text-[var(--text-primary)] underline decoration-[var(--accent)] underline-offset-2"
              >
                {SITE_CONFIG.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
