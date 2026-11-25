# Velqora Agency — Design Reference Notes

**Primary Visual & Interaction Reference:** `https://prichard.hu/en`  
**Inspection Method:** Live Chrome DevTools inspection on Desktop (`1280×800`) and Mobile (`390×844`) — checking computed CSS styles, layout structure, navigation behavior, and actual runtime animations/stylesheets.

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

### Navigation & Mobile Menu Motion
- **Top bar & scroll pill:** Fixed `<nav>`. On scroll (`scrollY > 0`), the center menu wrapper gains `.menusor-glass` (`backdrop-filter: blur(12px)`, `background: rgba(15, 23, 42, 0.5)`, `1px solid rgba(255,255,255,0.08)`, `0.5s` transition).
- **Full-screen Menu overlay (`#menuOverlay`):**
  - Hamburger lines morph smoothly into an `X` (`0.3s` rotate transitions).
  - Overlay container fades and un-hides (`0.5s cubic-bezier(0.16, 1, 0.3, 1)`) over a `20px` blurred midnight backdrop.
  - Menu links stagger smoothly upward (`translateY(30px) → 0`, `opacity: 0 → 1`) alongside the left contact column on desktop, or centered vertical stack with a divider on mobile (`390×844`).

### Hero & Scroll Animations
- **Hero immediacy:** No blocking preloader—main hero title and CTA load immediately at `opacity: 1` with subtle upward entrance (`heroFadeIn`, `15px → 0`) and animated `.hero-gradient-text` (`gradientShift` over `4s`).
- **Hero focal visual:** Interactive 3D canvas centerpiece on desktop, placed above the headline on mobile.
- **Desktop `SCROLL` indicator:** Animated vertical line (`scrollLineMove`, `2.5s` loop translating vertically along a thin track), hidden on mobile.
- **Scroll-triggered reveals (`.anim_fel`):** Sections reveal from `translateY(40px)` and `opacity: 0` over `0.8s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Scroll-driven showcase expansion:** Showcase frame scales smoothly from rounded centered inset toward full emphasis on scroll, then eases back.
- **Interactive showcase carousel:** Smooth `translateX` card sliding (`0.6s cubic-bezier(0.16, 1, 0.3, 1)`) with `Previous` / `Next` controls.
- **Rolling dual-layer button text (`.roll-btn` / `.flow-btn`):** Dual text spans shift vertically (`0 → -100%`) over `0.3s–0.4s` on hover/focus with expanding blue/cyan glow shadow; cards lift `-4px` with brighter cyan borders.

### Footer
- Minimal single-row bar on desktop (copyright on left, utility/legal links on right) that stacks cleanly on mobile.

---

## 2. Mapping Observations to Original Velqora Agency Decisions

| Reference Observation | Original Velqora Agency Decision |
|---|---|
| `#020617` midnight canvas + `#2563eb` / `#06b6d4` / `#6366f1` accents | Keep Midnight Void (`#020617`) + Elevated Slate (`#0B1120`) + Cobalt/Cyan/Indigo tokens with WCAG AA-safe slate text (`#CBD5E1`, `#94A3B8`). |
| Immediate hero visibility + subtle `heroFadeIn` + `gradientShift` + `SCROLL` beam | Build `HeroSequence` + `HeroLine` so the headline and CTAs settle within ~250ms (zero preloader delay), paired with a subtle animated gradient highlight and a desktop-only vertical scroll beam. |
| Rotating 3D centerpiece (no copied canvas/iPhone) | Build `HeroVVisual`: an original animated SVG/Motion **V-monogram orbital sculpture** with path-drawing arms, glowing apex beacon, subtle orbital rings, and scroll-depth tilt (simplified & reduced-motion aware). |
| `.menusor-glass` + `#menuOverlay` stagger & hamburger morph | Upgrade `SiteHeader` with a sliding `layoutId` active pill in the glass nav, animated two-line hamburger-to-X morph, `AnimatePresence` full-screen blur overlay, staggered link reveals, `Escape` closing, and accessible focus return. |
| Scroll reveals, scroll-driven showcase frame & horizontal carousel | Upgrade `MotionPrimitives` (`Reveal` directional variants, `StaggerGroup`, `ScrollShowcaseBand`, `ScrollParallaxLayer`) and add an interactive `ConceptShowcase` carousel with `Previous` / `Next` & keyboard-accessible tabs for Velqora's concept builds. |
| Rolling button text & card elevation | Build `RollingLabel` (dual-layer vertical text roll triggered on both hover and keyboard `:focus-visible`) and `.velqora-card` lift/glow transitions. |
| Dark translucent contact card with bottom-bordered inputs | Keep the redesigned dark glass `ContactForm` with animated input focus lines, preserving all Phase 2A Supabase API logic, validation, honeypot, and `velqoraagency00@gmail.com` fallback. |

---

## 3. What Could Not Be Verified / Intentionally Omitted
- **Unverified internals:** Exact GSAP / Lenis scrub breakpoints and compiled WebGL shader math inside the reference's minified JS bundles could not be inspected in readable source and were not copied; all Velqora animations are original `motion/react` and CSS implementations.
- **Intentionally omitted for compliance & accessibility:**
  - **Lenis scroll hijacking & excessive parallax:** Omitted so native browser scrolling and `prefers-reduced-motion` always work naturally.
  - **Pointer-only custom cursor:** Omitted to ensure full keyboard, touch, and mouse parity.
  - **Awards badge, phone numbers, multi-step phone field, and floating chat widget:** Omitted per Velqora Agency's strict no-fake-awards, email-only (`velqoraagency00@gmail.com`), and Phase 2A scope rules.
