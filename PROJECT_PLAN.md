# Velqora Agency — Project Plan

## 1. Brand & Visual Direction
- **Brand Name:** Velqora Agency (always includes "Agency")
- **Logo:** Custom geometric `V` monogram paired with the "Velqora Agency" wordmark
- **Contact Email:** `velqoraagency00@gmail.com` (the only direct contact detail; no phone numbers anywhere)
- **Visual System:**
  - **Palette:** Deep Obsidian Ink (`#0D0E12`), Warm Alabaster (`#F7F5F0`), Soft Stone (`#EAE6DD`), Charcoal Slate (`#161821`), Muted Graphite (`#5C606E`), and a restrained Vivid Amber-Coral accent (`#E05A2B`)
  - **Typography:** Editorial display serif/sans pairing (`Syne` or `Instrument Serif` + `Plus Jakarta Sans` + `JetBrains Mono` via `next/font/google`)
  - **Motion:** Subtle staggered reveals, gentle scroll-triggered transitions, and accessible hover/focus states using `motion/react` with `MotionConfig reducedMotion="user"` and no scroll hijacking or pointer-only interactions

## 2. Routes & Pages
1. `/` (**Home**): Hero with clear CTA, services overview, featured concept capabilities, 4-step agency approach, and contact preview
2. `/services` (**Services**): All 14 services organized into 4 clear groups, with scope details and compliance/legal review notices where appropriate
3. `/work` (**Work**): Tasteful capability & concept examples clearly labeled as **Concept**, with a guide for replacing them with real client work
4. `/about` (**About**): Agency philosophy, working principles, and how Velqora Agency collaborates with clients (no invented awards, locations, or fake stats)
5. `/contact` (**Contact**): Direct email (`velqoraagency00@gmail.com`), scoped inquiry form (name, email, service of interest, message, privacy consent), sensitive-data warning, and clear notice that backend submission is not yet connected
6. `/privacy` (**Privacy**): Plain-English privacy policy aligned with the current no-tracking, no-backend-storage state, flagged for legal review

## 3. Services Coverage (All 14 Included)
- **Digital Product & Web Engineering:** Web development and ecommerce, Shopify development, Mobile app development, Chatbot development
- **Design & Creative:** Website design, UX/UI design, AI video
- **Growth & Digital Marketing:** Social media marketing, Email marketing, YouTube automation
- **Advisory, Reputation & Records:** Consulting, Online reputation management, Credit repair, Public records

## 4. Compliance & Legal Review Flags
- **Credit repair:** No guaranteed outcomes or timelines; requires CROA / local consumer-credit compliance review before launch.
- **Public records:** Requires clear disclosure of lawful, public-source usage and FCRA/privacy boundaries.
- **Online reputation management:** No guaranteed removal of lawful third-party content.
- **Privacy Policy:** Draft baseline provided; review with legal counsel once a backend form handler or analytics is added.

## 5. Future Phases (Out of Scope for Phase 1)
- Connect `/contact` form to a real email/API backend (e.g., Resend or Formspree) using server-side environment variables.
- Replace concept work items in `src/data/work.ts` with real client case studies and screenshots.
- Add privacy-friendly analytics only if approved later.
