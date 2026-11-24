export interface WorkConcept {
  id: string;
  title: string;
  category: string;
  isConcept: boolean;
  summary: string;
  deliverables: string[];
  outcomeNote: string;
}

export const WORK_CONCEPTS: WorkConcept[] = [
  {
    id: "concept-atelier-commerce",
    title: "Atelier Goods — Direct-to-Consumer Storefront",
    category: "Shopify & Ecommerce",
    isConcept: true,
    summary:
      "A capability concept demonstrating how Velqora Agency structures editorial product storytelling, fast collection filtering, and distraction-free checkout architecture.",
    deliverables: [
      "Custom Shopify section system",
      "Editorial lookbook & PDP layout",
      "Mobile-first cart drawer",
    ],
    outcomeNote:
      "Concept example — replace with your own live storefront project when ready.",
  },
  {
    id: "concept-fintech-portal",
    title: "Northstar Advisory — Client Onboarding & Chatbot Flow",
    category: "UX/UI & Chatbot Development",
    isConcept: true,
    summary:
      "A capability concept illustrating calm, accessible service navigation paired with a structured intake assistant that routes inquiries without friction.",
    deliverables: [
      "UX/UI design system",
      "Guided intake chatbot",
      "WCAG-conscious form states",
    ],
    outcomeNote:
      "Concept example — no client metrics invented; ready to swap with real work.",
  },
  {
    id: "concept-media-engine",
    title: "Signal Studio — AI Video & YouTube Automation Pipeline",
    category: "AI Video & Channel Growth",
    isConcept: true,
    summary:
      "A capability concept showing how scripting, AI-assisted visual production, thumbnail systems, and email distribution connect into one repeatable cadence.",
    deliverables: [
      "Repeatable script-to-edit workflow",
      "AI video asset templates",
      "Cross-channel email newsletter kit",
    ],
    outcomeNote:
      "Concept example — designed to preview multi-channel production capabilities.",
  },
  {
    id: "concept-mobile-companion",
    title: "Kinetix Field — Mobile Companion App Architecture",
    category: "Mobile App & Web Engineering",
    isConcept: true,
    summary:
      "A capability concept highlighting clean mobile navigation, offline-friendly task views, and a synced web dashboard.",
    deliverables: [
      "Cross-platform mobile UI",
      "API sync & state architecture",
      "Responsive companion web portal",
    ],
    outcomeNote:
      "Concept example — editable placeholder in src/data/work.ts.",
  },
];
