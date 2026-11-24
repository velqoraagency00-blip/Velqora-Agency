export interface NavItem {
  label: string;
  href: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const SITE_CONFIG = {
  brandName: "Velqora Agency",
  shortTagline: "Digital Product, Design & Growth Studio",
  contactEmail: "velqoraagency00@gmail.com",
  description:
    "Velqora Agency is a multidisciplinary digital agency delivering web & Shopify development, UX/UI design, mobile apps, AI video, marketing, and advisory services.",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Scope",
    description:
      "We clarify your goals, audience, technical constraints, and compliance boundaries before writing a line of code or designing a screen.",
  },
  {
    number: "02",
    title: "Architecture & Design",
    description:
      "We map user flows, typography, and system structure—pairing editorial clarity with practical engineering.",
  },
  {
    number: "03",
    title: "Build & Refine",
    description:
      "We develop responsive interfaces, commerce storefronts, automations, or campaigns in iterative milestones with transparent review.",
  },
  {
    number: "04",
    title: "Launch & Handover",
    description:
      "We verify accessibility, responsiveness, and documentation so your team can operate and update everything with confidence.",
  },
];
