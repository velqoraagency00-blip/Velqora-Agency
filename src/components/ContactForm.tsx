"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO, RollingLabel } from "@/components/MotionPrimitives";
import { ALL_SERVICE_NAMES } from "@/data/services";
import { SITE_CONFIG } from "@/data/site";

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "spam-blocked";

interface FormspreeErrorItem {
  code?: string;
  field?: string;
  message?: string;
}

interface FormspreeResponse {
  ok?: boolean;
  error?: string;
  errors?: FormspreeErrorItem[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RAW_FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() ?? "";

const PLACEHOLDER_FORMSPREE_IDS = new Set([
  "",
  "your-formspree-form-id",
  "your_formspree_form_id",
  "your-form-id",
  "your_form_id",
  "form-id",
  "placeholder",
  "example",
]);

function isValidFormspreeFormId(value: string): boolean {
  if (!value) return false;
  const normalized = value.toLowerCase();
  if (
    PLACEHOLDER_FORMSPREE_IDS.has(normalized) ||
    normalized.includes("your-") ||
    normalized.includes("your_") ||
    normalized.includes("placeholder") ||
    normalized.includes("example")
  ) {
    return false;
  }
  return /^[a-zA-Z0-9_-]{4,64}$/.test(value);
}

const FORMSPREE_ENDPOINT = isValidFormspreeFormId(RAW_FORMSPREE_FORM_ID)
  ? `https://formspree.io/f/${RAW_FORMSPREE_FORM_ID}`
  : null;

function isSpamResponse(
  statusCode: number,
  data: FormspreeResponse | null
): boolean {
  if (statusCode === 403 || statusCode === 429) {
    return true;
  }

  const combinedText = [
    data?.error ?? "",
    ...(data?.errors?.map((item) => `${item.code ?? ""} ${item.message ?? ""}`) ??
      []),
  ]
    .join(" ")
    .toLowerCase();

  return (
    combinedText.includes("blocked") ||
    combinedText.includes("spam") ||
    combinedText.includes("captcha")
  );
}

export function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const isFormConfigured = FORMSPREE_ENDPOINT !== null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [gotcha, setGotcha] = useState("");

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const isSubmitting = submitStatus === "submitting";

  const mailtoHref = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(
    service ? `Project Inquiry: ${service}` : "Project Inquiry — Velqora Agency"
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nService of interest: ${service}\n\nMessage:\n${message}`
  )}`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      setSubmitStatus("error");
      setFeedbackMessage(
        `Online form not connected. Your message was not submitted—please email ${SITE_CONFIG.contactEmail} directly.`
      );
      return;
    }

    if (gotcha.trim().length > 0) {
      setSubmitStatus("spam-blocked");
      setFeedbackMessage(
        `Spam protection blocked this submission because the hidden verification field was filled. Your message was not submitted. If you are a real visitor, please clear browser autofill or email ${SITE_CONFIG.contactEmail} directly.`
      );
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !service || !trimmedMessage) {
      setSubmitStatus("error");
      setFeedbackMessage(
        "Your message was not submitted. Please complete all required fields before submitting."
      );
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setSubmitStatus("error");
      setFeedbackMessage(
        "Your message was not submitted. Please enter a valid email address."
      );
      return;
    }

    if (!consent) {
      setSubmitStatus("error");
      setFeedbackMessage(
        "Your message was not submitted. Please confirm that you have read the Privacy Policy notice."
      );
      return;
    }

    setFeedbackMessage(null);
    setSubmitStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          service,
          message: trimmedMessage,
          consent: "Confirmed",
          _subject: `Velqora Agency Inquiry — ${service} (${trimmedName})`,
          _gotcha: gotcha,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | FormspreeResponse
        | null;

      if (!response.ok || data?.ok === false) {
        const apiDetails = data?.errors
          ?.map((err) => err.message)
          .filter(Boolean)
          .join(" ");

        if (isSpamResponse(response.status, data)) {
          setSubmitStatus("spam-blocked");
          setFeedbackMessage(
            `Spam protection stopped this request${apiDetails ? `: ${apiDetails}` : "."} Your message was not submitted—please email ${SITE_CONFIG.contactEmail} directly.`
          );
          return;
        }

        setSubmitStatus("error");
        setFeedbackMessage(
          `Your message was not submitted.${apiDetails ? ` ${apiDetails}` : data?.error ? ` ${data.error}` : ""} Please try again or email ${SITE_CONFIG.contactEmail} directly.`
        );
        return;
      }

      setSubmitStatus("success");
      setFeedbackMessage(null);
      setName("");
      setEmail("");
      setService("");
      setMessage("");
      setConsent(false);
      setGotcha("");
    } catch {
      setSubmitStatus("error");
      setFeedbackMessage(
        `We could not reach Formspree. Your message was not submitted—please email ${SITE_CONFIG.contactEmail} directly.`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass-panel velqora-card relative rounded-2xl p-6 sm:p-8"
    >
      {/* Sensitive-data warning */}
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs leading-relaxed text-amber-100">
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

      {/* Unconfigured Formspree endpoint notice */}
      {!isFormConfigured && (
        <div
          role="status"
          className="mb-7 rounded-xl border border-[var(--accent-cyan)]/35 bg-[var(--accent-soft)] p-4 text-xs leading-relaxed text-[var(--text-secondary)]"
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-white">
                Online form not connected
              </p>
              <p className="mt-1">
                This website&apos;s Formspree form ID is not configured yet, so
                online submissions cannot be sent right now. Please email us
                directly instead.
              </p>
              <a
                href={mailtoHref}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                Email {SITE_CONFIG.contactEmail} directly
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Formspree honeypot field (_gotcha) hidden from real visitors and screen readers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="contact-gotcha">Leave this field blank</label>
        <input
          id="contact-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
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
            className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 transition-colors focus:border-[var(--accent-cyan)] focus:outline-none"
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
            className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 transition-colors focus:border-[var(--accent-cyan)] focus:outline-none"
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
            className="mt-2 w-full border-b border-[var(--border-strong)] bg-[var(--bg-surface)] py-2.5 text-sm text-[var(--text-primary)] transition-colors focus:border-[var(--accent-cyan)] focus:outline-none"
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
            className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 transition-colors focus:border-[var(--accent-cyan)] focus:outline-none"
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
            I consent to {SITE_CONFIG.brandName} using Formspree to process my
            inquiry details so the team can respond to my message, as described
            in the{" "}
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

      {/* Passive spam-protection notice */}
      <p className="mt-5 flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
        <ShieldCheck
          className="h-3.5 w-3.5 shrink-0 text-[var(--accent-cyan)]"
          aria-hidden="true"
        />
        <span>
          Spam protection enabled via Formspree filtering and a hidden
          anti-spam field.
        </span>
      </p>

      <AnimatePresence>
        {submitStatus === "spam-blocked" && feedbackMessage && (
          <motion.div
            key="contact-spam-blocked"
            role="alert"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="mt-6 rounded-xl border border-amber-400/40 bg-amber-950/50 p-4 text-xs leading-relaxed text-amber-100"
          >
            <p className="font-semibold text-white">
              Blocked by spam protection
            </p>
            <p className="mt-1">{feedbackMessage}</p>
            <a
              href={mailtoHref}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email {SITE_CONFIG.contactEmail} instead
            </a>
          </motion.div>
        )}

        {submitStatus === "error" && feedbackMessage && (
          <motion.div
            key="contact-error"
            role="alert"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="mt-6 rounded-xl border border-red-400/40 bg-red-950/50 p-4 text-xs leading-relaxed text-red-100"
          >
            <p className="font-semibold">{feedbackMessage}</p>
            <a
              href={mailtoHref}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email {SITE_CONFIG.contactEmail} instead
            </a>
          </motion.div>
        )}

        {submitStatus === "success" && (
          <motion.div
            key="contact-success"
            role="status"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-400/40 bg-emerald-950/50 p-4 text-xs leading-relaxed text-emerald-100"
          >
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-white">
                Your message has been submitted.
              </p>
              <p className="mt-1 text-emerald-100/90">
                Formspree accepted your submission for forwarding to{" "}
                {SITE_CONFIG.brandName}. If you need an urgent reply or do not
                hear back, you can also email {SITE_CONFIG.contactEmail}{" "}
                directly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-7">
        <button
          type="submit"
          disabled={!isFormConfigured || isSubmitting}
          className="btn-gradient-velqora velqora-roll-btn inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
        >
          <RollingLabel label={isSubmitting ? "Submitting..." : "Submit"} />
        </button>
      </div>
    </form>
  );
}
