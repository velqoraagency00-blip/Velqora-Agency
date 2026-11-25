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
              This page is a plain-English draft describing how the contact form
              currently works. Have it reviewed by the business owner and a
              qualified legal advisor before relying on it for legal compliance.
            </p>
          </div>
        </HeroReveal>

        <StaggerGroup className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                1. Information Collected Through the Contact Form
              </h2>
              <p className="mt-2">
                When you submit the contact form on this website, we collect
                only the details you enter:{" "}
                <strong className="text-[var(--text-primary)]">your name</strong>
                ,{" "}
                <strong className="text-[var(--text-primary)]">
                  email address
                </strong>
                ,{" "}
                <strong className="text-[var(--text-primary)]">
                  service of interest
                </strong>
                ,{" "}
                <strong className="text-[var(--text-primary)]">message</strong>,
                and your{" "}
                <strong className="text-[var(--text-primary)]">
                  privacy consent confirmation
                </strong>
                . We do not collect phone numbers through the form.
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                2. How Form Submissions Are Processed
              </h2>
              <p className="mt-2">
                When configured, this website&apos;s contact form sends
                submissions directly from your browser to{" "}
                <strong className="text-[var(--text-primary)]">Formspree</strong>
                , a third-party form processing service, so your message can be
                filtered for spam and forwarded to{" "}
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="font-medium text-[var(--text-primary)] underline decoration-[var(--accent-cyan)] underline-offset-2 hover:text-[var(--accent-cyan)]"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
                . {SITE_CONFIG.brandName} does not run a custom backend or
                website database for this form; submitted details are handled
                through Formspree&apos;s hosted infrastructure and email
                forwarding workflow.
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                3. Direct Email Inquiries
              </h2>
              <p className="mt-2">
                If you email{" "}
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="font-medium text-[var(--text-primary)] underline decoration-[var(--accent-cyan)] underline-offset-2 hover:text-[var(--accent-cyan)]"
                >
                  {SITE_CONFIG.contactEmail}
                </a>{" "}
                directly, we use your email address and message to respond to
                your inquiry.
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                4. Analytics &amp; Tracking
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
                5. Sensitive Personal &amp; Financial Data
              </h2>
              <p className="mt-2">
                Please do not send passwords, Social Security numbers, payment
                account numbers, or confidential financial documents through the
                website contact form or initial inquiry emails.
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                6. Contact for Privacy Questions
              </h2>
              <p className="mt-2">
                For any privacy-related questions or to request removal of a
                submitted inquiry, contact {SITE_CONFIG.brandName} at{" "}
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
