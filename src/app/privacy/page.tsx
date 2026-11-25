import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import {
  HeroReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/MotionPrimitives";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Draft Privacy Policy for ${SITE_CONFIG.brandName}.`,
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--bg-void)] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <HeroReveal delay={0.02} y={14}>
          <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
            Privacy Policy (Draft)
          </p>
        </HeroReveal>

        <HeroReveal delay={0.08} y={18}>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            How {SITE_CONFIG.brandName} handles information
          </h1>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Draft baseline policy — requires owner and legal review prior to
            public launch.
          </p>
        </HeroReveal>

        <HeroReveal delay={0.14} y={14}>
          <div className="glass-panel mt-8 flex items-start gap-3 rounded-2xl p-5 text-sm text-[var(--text-secondary)]">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"
              aria-hidden="true"
            />
            <p>
              <strong className="font-semibold text-[var(--text-primary)]">
                Draft Notice — Owner Review Required:
              </strong>{" "}
              This page is a plain-English draft describing how this website
              currently handles visitor information. Have it reviewed by the
              business owner and a qualified legal advisor before relying on it
              for legal compliance.
            </p>
          </div>
        </HeroReveal>

        <StaggerGroup className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                1. No Website Forms or Account Storage
              </h2>
              <p className="mt-2">
                This website does not currently collect personal details through
                an interactive web form, user account system, or custom backend
                database. Visitors contact {SITE_CONFIG.brandName} directly by
                email.
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                2. Direct Email Inquiries
              </h2>
              <p className="mt-2">
                If you email{" "}
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="font-medium text-[var(--text-primary)] underline decoration-[var(--accent-cyan)] underline-offset-2 hover:text-[var(--accent-cyan)]"
                >
                  {SITE_CONFIG.contactEmail}
                </a>{" "}
                directly from your email client, {SITE_CONFIG.brandName} uses
                your email address and message only to review and respond to
                your inquiry.
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                3. Analytics &amp; Tracking
              </h2>
              <p className="mt-2">
                {SITE_CONFIG.brandName} does not currently use third-party
                advertising trackers, behavioral cookies, or analytics scripts
                on this website.
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                4. Sensitive Personal &amp; Financial Data
              </h2>
              <p className="mt-2">
                Please do not send passwords, Social Security numbers, payment
                account numbers, or confidential financial documents in initial
                inquiry emails.
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                5. Contact for Privacy Questions
              </h2>
              <p className="mt-2">
                For any privacy-related questions or to request deletion of
                previous email correspondence, contact {SITE_CONFIG.brandName}{" "}
                at{" "}
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="font-medium text-[var(--text-primary)] underline decoration-[var(--accent-cyan)] underline-offset-2 hover:text-[var(--accent-cyan)]"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
                .
              </p>
            </section>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </div>
  );
}
