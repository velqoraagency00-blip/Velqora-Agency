# Velqora Agency — Design Reference Notes

**Primary Visual & Interaction Reference:** `https://prichard.hu/en`  
**Inspection Method:** Live Chrome DevTools inspection on Desktop (`1280×800`) and Mobile (`390×844`) — checking computed CSS styles, layout structure, navigation behavior, and scroll/hover interactions.

---

## 1. Direct Observations of the Reference (`prichard.hu/en`)

### Colors & Atmosphere
- **Primary Canvas:** Deep midnight navy (`#020617`) with subtle ambient radial cyan/blue glows.
- **Primary Text:** Crisp white (`#ffffff`) for headings and key copy; muted cool gray (`rgba(255, 255, 255, 0.6)`) for secondary text and micro-labels.
- **Brand Accents:** Electric blue (`#2563eb`), bright cyan (`#06b6d4`), and indigo (`#6366f1`).
- **Gradients & Surfaces:**
  - Headline highlight gradients transitioning `#6366f1 → #2563eb → #06b6d4`.
  - Primary CTA buttons use a horizontal blue-to-cyan gradient (`linear-gradient(90deg, #2563eb, #06b6d4, #2563eb)`) with a soft blue glow shadow.
  - Translucent dark glass pill surfaces (`.menusor-glass`) for navigation and dark translucent rounded cards with bottom-bordered inputs for the contact section.

### Typography & Hierarchy
- **Primary Font:** `Sora` sans-serif on `body`.
- **Display Scale:** Large, tight-tracked H1 (`clamp(4.06rem, 4.06vw + 24.69px, 5.2rem)`, `font-weight: 500`, `line-height: 1.05`, `letter-spacing: -2px`).
- **Section Headings:** Bold uppercase section titles with wider tracking (`letter-spacing: 2px`).
- **Micro-Labels:** Small uppercase labels (`letter-spacing: 2px–3px`, ~`10–11px`) used for section tags, scroll indicators, and UI metadata.

### Navigation & Mobile Menu
- **Desktop (`1280×800`):** Fixed 3-zone header: left monogram logo, center inline links inside a translucent glass pill on scroll, right primary link + asymmetric Menu button. Clicking Menu opens a full-screen blurred dark overlay with a left contact/CTA column and right large stacked navigation links, plus direct email at the bottom.
- **Mobile (`390×844`):** Simplifies to left monogram logo + right Menu button, opening a full-screen centered overlay with stacked links, divider, CTA, and contact info.

### Hero Composition
- **Desktop:** Full-viewport dark canvas with left-aligned H1, concise intro copy, pill gradient CTA, a prominent central/right visual sculpture, and a subtle `SCROLL` indicator at the bottom.
- **Mobile:** Visual focal element sits above the left-aligned H1 and pill CTA.

### Animations & Interactions
- Scroll-triggered opacity/translate reveals on sections.
- Scroll-driven scale expansion on a featured showcase frame.
- Smooth `0.3s` color/background transitions on links and buttons with subtle dual-layer text motion.

### Footer
- Minimal single-row bar on desktop (copyright on left, utility/legal links on right) that stacks cleanly on mobile.

---

## 2. Mapping Observations to Original Velqora Agency Decisions

| Reference Observation | Original Velqora Agency Decision |
|---|---|
| `#020617` midnight canvas + `#2563eb` / `#06b6d4` / `#6366f1` accents | Adopt a Midnight Void (`#020617`) + Elevated Slate (`#0B1120`) + Electric Cobalt (`#2563EB`) + Bright Cyan (`#06B6D4`) + Indigo (`#6366F1`) token system, adjusting muted text to `#94A3B8` / `#CBD5E1` for WCAG AA contrast. |
| `Sora` geometric sans + tight H1 + uppercase micro-labels | Pair `Sora` (headings/UI) with `Plus Jakarta Sans` (body) and `JetBrains Mono` (micro-labels), using tight display tracking and crisp hierarchy. |
| Left monogram + center glass pill + full-screen Menu overlay | Build an original **Velqora Agency** fixed 3-zone header with a custom faceted **V** monogram, a center glass-pill nav, and an accessible full-screen blurred Menu overlay (with `Escape` key & keyboard focus). |
| Left-aligned hero + focal visual + gradient pill CTA | Create an original Hero featuring a custom geometric **V-monogram** architectural centerpiece (no copied 3D iPhone or particle ring, and **no** awards badge or fake stats). |
| Scroll reveals, showcase scale, smooth button transitions | Implement `motion/react` `Reveal`, `StaggerGroup`, and a non-hijacked `ScrollShowcaseFrame` (`useScroll` + `useTransform` disabled automatically when `prefers-reduced-motion` is active). |
| Dark translucent contact card with bottom-bordered inputs | Restyle `ContactForm.tsx` into a dark glass card with bottom-bordered inputs while preserving all Supabase `/api/contact` logic, honeypot, sensitive-data warning, and `velqoraagency00@gmail.com` fallback. |
| Minimal single-row footer | Restyle `SiteFooter.tsx` as a clean midnight-navy footer with `Velqora Agency` branding, `velqoraagency00@gmail.com`, and navigation/Privacy links (no cookie banner since no tracking exists). |

---

## 3. What Could Not Be Verified / Intentionally Omitted
- **Unverified internals:** Exact numeric easing curves and compiled third-party animation parameters inside the reference's minified JavaScript bundles were not inspected and were replaced with original `motion/react` implementations.
- **Intentionally omitted for compliance & usability:**
  - **Lenis scroll hijacking:** Omitted to preserve native browser scroll and accessibility.
  - **Pointer-only custom cursor:** Omitted to avoid pointer-only interactions.
  - **Awards badge, phone numbers, multi-step phone field, and floating chat widget:** Omitted per Velqora Agency's strict no-fake-awards, email-only (`velqoraagency00@gmail.com`), and Phase 2A scope rules.
