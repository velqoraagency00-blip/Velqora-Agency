# Velqora Agency Website

Official website for **Velqora Agency**, built with Next.js (App Router), React, TypeScript, Tailwind CSS, Motion for React, and Formspree.

## Running the Website Locally

1. Open a terminal in the project folder (`c:\Velqora Agency`).
2. Install dependencies (already done if `node_modules` exists):
   ```bash
   npm install
   ```
   *(On Windows PowerShell, if `npm` gives an execution policy error, run `npm.cmd install` instead.)*
3. Configure your public Formspree form ID (see **Formspree Email Form Setup** below).
4. Start the development server:
   ```bash
   npm run dev
   ```
   *(Or `npm.cmd run dev` on Windows PowerShell.)*
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Commands
- `npm run lint` — checks code quality and accessibility/lint rules.
- `npm run build` — builds the production version to verify there are no TypeScript or Next.js errors.

---

## Formspree Email Form Setup

The contact form on `/contact` sends inquiries directly from the visitor's browser to Formspree (`https://formspree.io/f/<YOUR_FORM_ID>`), which handles spam filtering and forwards accepted submissions to `velqoraagency00@gmail.com`. There is no custom backend or database.

### 1. Create a Formspree Form
1. Create a free account or sign in at [formspree.io](https://formspree.io).
2. Create a new project/form, set the recipient email address to `velqoraagency00@gmail.com`, and copy the short form ID shown in your form's endpoint URL (`https://formspree.io/f/<YOUR_FORM_ID>`).
3. Open `velqoraagency00@gmail.com` and click the verification link in the email from Formspree so deliveries are enabled.
4. Keep Formspree's **Formshield** spam filter enabled in the Formspree dashboard (no interstitial CAPTCHA redirect needed for AJAX submissions unless you connect custom reCAPTCHA keys).

### 2. Configure Local Environment Variables
1. In `c:\Velqora Agency`, copy `.env.example` to `.env.local` if it does not already exist.
2. Open `.env.local` and set:
   ```env
   NEXT_PUBLIC_FORMSPREE_FORM_ID=your-real-form-id
   ```
   *(This is a public form identifier, not a private password or secret. `.env.local` is ignored by `.gitignore` so it is never committed to GitHub.)*
3. Restart your local dev server (`npm.cmd run dev`) so Next.js loads the updated value.
4. Until a real ID is set, `/contact` honestly shows **"Online form not connected"** with a direct `mailto:velqoraagency00@gmail.com` link and keeps the submit button disabled.

---

## How to Update Content Without Coding Skills

All main text, services, and concept projects live in clean data files inside `src/data/`:

- **`src/data/site.ts`** — Brand name, contact email (`velqoraagency00@gmail.com`), navigation links, and agency approach steps.
- **`src/data/services.ts`** — All 15 services grouped across 4 disciplines, descriptions, deliverables, and exported count/choice helpers used across the site.
- **`src/data/work.ts`** — Capability and concept examples shown on the Home and Work pages.

### Replacing Concept Work with Real Projects
1. Open `src/data/work.ts`.
2. Each project object has `title`, `category`, `isConcept`, `summary`, `deliverables`, and `outcomeNote`.
3. Replace the text with your real project details, set `isConcept: false`, and optionally add real images into `public/work/` and reference them.
4. Keep claims factual and avoid invented metrics.

## Items Flagged for Legal & Business Review
Before launching publicly, have a qualified advisor review:
- **Privacy Policy** (`/privacy`) — currently a draft describing Formspree form processing and forwarding to `velqoraagency00@gmail.com`; review with legal counsel before relying on it for legal compliance.
