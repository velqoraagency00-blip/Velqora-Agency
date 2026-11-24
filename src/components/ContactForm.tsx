"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, ShieldAlert } from "lucide-react";
import { ALL_SERVICE_NAMES } from "@/data/services";
import { SITE_CONFIG } from "@/data/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaved(false);

    if (!name.trim() || !email.trim() || !service || !message.trim()) {
      setErrorMessage("Please complete all required fields before submitting.");
      return;
    }

    if (!consent) {
      setErrorMessage(
        "Please confirm that you have read the Privacy Policy notice."
      );
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service,
          message: message.trim(),
          consent,
          honeypot,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setErrorMessage(
          data?.error ||
            `Your inquiry was not submitted. Please email ${SITE_CONFIG.contactEmail} directly.`
        );
        return;
      }

      setIsSaved(true);
      setName("");
      setEmail("");
      setService("");
      setMessage("");
      setConsent(false);
      setHoneypot("");
    } catch {
      setErrorMessage(
        `We could not reach the server. Your inquiry was not submitted—please email ${SITE_CONFIG.contactEmail} directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
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
      className="glass-panel relative rounded-2xl p-6 sm:p-8"
    >
      {/* Sensitive-data warning */}
      <div className="mb-7 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs leading-relaxed text-amber-100">
        <ShieldAlert
          className="mt-0.5 h-4 w-4 shrink-0 text-amber-300"
          aria-hidden="true"
        />
        <p>
          <strong className="font-semibold text-white">
            Do not submit sensitive information:
          </strong>{" "}
          Please never include passwords, Social Security numbers, bank or card
          account numbers, or confidential financial documents in this form.
        </p>
      </div>

      {/* Honeypot field for spam filtering (hidden from real visitors and screen readers) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="contact-company-site">Leave this field blank</label>
        <input
          id="contact-company-site"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="contact-name"
            className="font-mono-label block text-xs uppercase tracking-wider text-[var(--text-muted)]"
          >
            Your name <span className="text-[var(--accent-cyan)]">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Rivera"
            className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:border-[var(--accent-cyan)] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="font-mono-label block text-xs uppercase tracking-wider text-[var(--text-muted)]"
          >
            Email address <span className="text-[var(--accent-cyan)]">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:border-[var(--accent-cyan)] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="font-mono-label block text-xs uppercase tracking-wider text-[var(--text-muted)]"
          >
            Service of interest{" "}
            <span className="text-[var(--accent-cyan)]">*</span>
          </label>
          <select
            id="contact-service"
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-2 w-full border-b border-[var(--border-strong)] bg-[var(--bg-surface)] py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent-cyan)] focus:outline-none"
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
            className="font-mono-label block text-xs uppercase tracking-wider text-[var(--text-muted)]"
          >
            Project details <span className="text-[var(--accent-cyan)]">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            maxLength={4000}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your goals, timeline, and what you need help with..."
            className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:border-[var(--accent-cyan)] focus:outline-none"
          />
        </div>

        <div className="flex items-start gap-3 pt-1">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[var(--border-strong)] bg-transparent accent-[var(--accent-cyan)]"
          />
          <label
            htmlFor="contact-consent"
            className="text-xs leading-relaxed text-[var(--text-secondary)]"
          >
            I consent to {SITE_CONFIG.brandName} storing my inquiry details to
            respond to my message, as described in the{" "}
            <Link
              href="/privacy"
              className="font-medium text-[var(--text-primary)] underline decoration-[var(--accent-cyan)] underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-400/40 bg-red-950/50 p-4 text-xs leading-relaxed text-red-100"
        >
          <p className="font-semibold">{errorMessage}</p>
          <a
            href={mailtoHref}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Email {SITE_CONFIG.contactEmail} instead
          </a>
        </div>
      )}

      {isSaved && (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-400/40 bg-emerald-950/50 p-4 text-xs leading-relaxed text-emerald-100"
        >
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-white">
              Your inquiry has been saved.
            </p>
            <p className="mt-1 text-emerald-100/90">
              Thank you for contacting {SITE_CONFIG.brandName}. Our team reviews
              saved inquiries and will reply to your email address.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient-velqora inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Sending inquiry..." : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}
