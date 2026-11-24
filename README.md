# Velqora Agency Website

Official frontend website for **Velqora Agency**, built with Next.js (App Router), React, TypeScript, Tailwind CSS, and Motion for React.

## Running the Website Locally

1. Open a terminal in the project folder (`c:\Velqora Agency`).
2. Install dependencies (already done if `node_modules` exists):
   ```bash
   npm install
   ```
   *(On Windows PowerShell, if `npm` gives an execution policy error, run `npm.cmd install` instead.)*
3. Start the development server:
   ```bash
   npm run dev
   ```
   *(Or `npm.cmd run dev` on Windows PowerShell.)*
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Commands
- `npm run lint` — checks code quality and accessibility/lint rules.
- `npm run build` — builds the production version to verify there are no TypeScript or Next.js errors.

## How to Update Content Without Coding Skills

All main text, services, and concept projects live in clean data files inside `src/data/`:

- **`src/data/site.ts`** — Brand name, contact email (`velqoraagency00@gmail.com`), navigation links, and agency approach steps.
- **`src/data/services.ts`** — All 14 services grouped by category, descriptions, and deliverables.
- **`src/data/work.ts`** — Capability and concept examples shown on the Home and Work pages.

### Replacing Concept Work with Real Projects
1. Open `src/data/work.ts`.
2. Each project object has `title`, `category`, `isConcept`, `summary`, `deliverables`, and `outcomeNote`.
3. Replace the text with your real project details, set `isConcept: false`, and optionally add real images into `public/work/` and reference them.
4. Keep claims factual and avoid invented metrics.

## Environment Variables
This project currently runs without any secrets or backend API keys. A placeholder `.env.example` file is included for future phases (such as connecting the contact form to an email service). Never commit real secrets to `.env` or Git.

## Items Flagged for Legal & Business Review
Before launching publicly, have a qualified advisor review:
- **Credit repair** service copy (ensure compliance with applicable credit-repair laws such as CROA in the US; never promise guaranteed score increases or deletions).
- **Public records** & **Online reputation management** descriptions (ensure lawful, accurate framing).
- **Privacy Policy** (`/privacy`) once you add a live contact-form backend or any analytics.
- **Contact Form:** Currently displays a clear notice that backend submission is not yet active and directs visitors to email `velqoraagency00@gmail.com`.
