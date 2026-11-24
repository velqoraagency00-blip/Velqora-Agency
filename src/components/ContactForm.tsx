"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, Mail, ShieldAlert } from "lucide-react";
import { ALL_SERVICE_NAMES } from "@/data/services";
import { SITE_CONFIG } from "@/data/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewNotice, setPreviewNotice] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreviewNotice(false);

    if (!name.trim() || !email.trim() || !service || !message.trim()) {
      setValidationError("Please complete all required fields before continuing.");
      return;
    }

    if (!consent) {
      setValidationError(
        "Please confirm that you have read the Privacy Policy notice."
      );
      return;
    }

    setValidationError(null);
    // Backend email delivery is intentionally not implemented in Phase 1.
    // Never pretend the message was delivered.
    setPreviewNotice(true);
  };

  const mailtoHref = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(
    service ? `Project Inquiry: ${service}` : "Project Inquiry — Velqora Agency"
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nService of interest: ${service}\n\nMessage:\n${message}`
  )}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8"
    >
      {/* Honest backend-status banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 text-xs leading-relaxed text-[var(--text-secondary)]">
        <AlertCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
          aria-hidden="true"
        />
        <p>
          <strong className="font-semibold text-[var(--text-primary)]">
            Form Backend Not Connected Yet:
          </strong>{" "}
          This form validates your inquiry locally in preview mode and does not
          transmit data automatically. For immediate inquiries, please email{" "}
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="font-medium text-[var(--text-primary)] underline decoration-[var(--accent)] underline-offset-2"
          >
            {SITE_CONFIG.contactEmail}
          </a>
          .
        </p>
      </div>

      {/* Sensitive-data warning */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/50 p-4 text-xs leading-relaxed text-[var(--text-primary)]">
        <ShieldAlert
          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-hover)]"
          aria-hidden="true"
        />
        <p>
          <strong>Do not submit sensitive information:</strong> Please never
          include passwords, Social Security numbers, bank or card account
          numbers, or confidential financial documents in this form.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-[var(--text-primary)]"
          >
            Your name <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Rivera"
            className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[var(--text-primary)]"
          >
            Email address <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="block text-sm font-medium text-[var(--text-primary)]"
          >
            Service of interest <span className="text-[var(--accent)]">*</span>
          </label>
          <select
            id="contact-service"
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
          >
            <option value="">Select a service...</option>
            {ALL_SERVICE_NAMES.map((serviceName) => (
              <option key={serviceName} value={serviceName}>
                {serviceName}
              </option>
            ))}
            <option value="General inquiry">General inquiry</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-[var(--text-primary)]"
          >
            Project details <span className="text-[var(--accent)]">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your goals, timeline, and what you need help with..."
            className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[var(--border-strong)] accent-[var(--accent)]"
          />
          <label
            htmlFor="contact-consent"
            className="text-xs leading-relaxed text-[var(--text-secondary)]"
          >
            I understand that this form is currently in preview mode and I have
            read the{" "}
            <Link
              href="/privacy"
              className="font-medium text-[var(--text-primary)] underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
      </div>

      {validationError && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800"
        >
          {validationError}
        </p>
      )}

      {previewNotice && (
        <div
          role="status"
          className="mt-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-subtle)] p-4 text-xs leading-relaxed text-[var(--text-primary)]"
        >
          <p className="font-semibold">
            No message was sent — online submission is not active yet.
          </p>
          <p className="mt-1 text-[var(--text-secondary)]">
            Your inputs look valid, but this website does not have a live form
            backend yet. You can open your email app with your draft pre-filled
            below:
          </p>
          <a
            href={mailtoHref}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--bg-ink)] px-4 py-2 text-xs font-medium text-[var(--text-on-ink)] transition-colors hover:bg-[var(--accent)]"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Open email to {SITE_CONFIG.contactEmail}
          </a>
        </div>
      )}

      <div className="mt-7">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--bg-ink)] px-6 py-3.5 text-sm font-medium text-[var(--text-on-ink)] transition-colors hover:bg-[var(--accent)] sm:w-auto"
        >
          Check &amp; Prepare Inquiry
        </button>
      </div>
    </form>
  );
}
