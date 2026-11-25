# Velqora Agency Website

Official frontend and Phase 2A inquiry backend for **Velqora Agency**, built with Next.js (App Router), React, TypeScript, Tailwind CSS, Motion for React, and Supabase.

## Running the Website Locally

1. Open a terminal in the project folder (`c:\Velqora Agency`).
2. Install dependencies (already done if `node_modules` exists):
   ```bash
   npm install
   ```
   *(On Windows PowerShell, if `npm` gives an execution policy error, run `npm.cmd install` instead.)*
3. Configure your local environment variables for Supabase (see the **Supabase Setup** section below).
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

## Supabase Setup (Phase 2A — Contact Form Storage)

The contact form sends submissions to a server-side Next.js route (`src/app/api/contact/route.ts`), which validates the fields and saves them into a `contact_inquiries` table in Supabase.

### 1. Create a Supabase Project
1. Sign in to [supabase.com](https://supabase.com) and click **New project**.
2. Choose an organization, give the project a name (for example, `velqora-agency`), set a strong database password, and select a region.
3. Wait for the project to finish provisioning.

### 2. Run the SQL Schema
1. In your Supabase dashboard, open **SQL Editor** from the left sidebar.
2. Open the file `supabase/schema.sql` from this repository and copy its contents.
3. Paste the SQL into the Supabase SQL Editor and click **Run**.
4. Confirm that the `contact_inquiries` table appears under **Table Editor** with Row-Level Security (RLS) enabled.

### 3. Configure Local Environment Variables
1. In your Supabase dashboard, go to **Project Settings → API** (or **Data API / API Keys**).
2. Copy your **Project URL** and your **Service Role / Secret key**.
   - **Important:** Never share your service-role key, never paste it into chat, never commit it to Git, and never use a `NEXT_PUBLIC_` prefix for it.
3. In `c:\Velqora Agency`, copy `.env.example` to a new file named `.env.local`:
   ```bash
   copy .env.example .env.local
   ```
4. Open `.env.local` and replace the placeholder values with your real `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
5. `.env.local` is ignored by `.gitignore` so it will never be committed to GitHub.

### 4. Safely Test a Submission
1. Start (or restart) your local server (`npm.cmd run dev`) so it loads `.env.local`.
2. Open [http://localhost:3000/contact](http://localhost:3000/contact).
3. Submit a test inquiry using harmless dummy text (for example, your name, a test email, a service, and `"Testing Supabase form storage"`). **Never submit passwords or sensitive financial data.**
4. Verify the form shows `"Your inquiry has been saved."`
5. Open your Supabase dashboard → **Table Editor → `contact_inquiries`** and confirm the new row appears.
6. *(Note: Automated email notifications to `velqoraagency00@gmail.com` are not configured in Phase 2A—inquiries are reviewed inside the authenticated Supabase dashboard.)*

---

## How to Update Content Without Coding Skills

All main text, services, and concept projects live in clean data files inside `src/data/`:

- **`src/data/site.ts`** — Brand name, contact email (`velqoraagency00@gmail.com`), navigation links, and agency approach steps.
- **`src/data/services.ts`** — All 11 services grouped by category, descriptions, and deliverables.
- **`src/data/work.ts`** — Capability and concept examples shown on the Home and Work pages.

### Replacing Concept Work with Real Projects
1. Open `src/data/work.ts`.
2. Each project object has `title`, `category`, `isConcept`, `summary`, `deliverables`, and `outcomeNote`.
3. Replace the text with your real project details, set `isConcept: false`, and optionally add real images into `public/work/` and reference them.
4. Keep claims factual and avoid invented metrics.

## Items Flagged for Legal & Business Review
Before launching publicly, have a qualified advisor review:
- **Privacy Policy** (`/privacy`) — currently a draft describing Supabase storage; review with legal counsel before launch.
