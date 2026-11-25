export interface ServiceItem {
  id: string;
  name: string;
  summary: string;
  deliverables: string[];
  needsLegalReview?: boolean;
  reviewNote?: string;
}

export interface ServiceGroup {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "web-commerce-apps",
    index: "01",
    title: "Web, Commerce & Apps",
    subtitle:
      "Custom-engineered websites, storefronts, mobile applications, and conversational tools built for reliability and speed.",
    items: [
      {
        id: "web-development-ecommerce",
        name: "Web development and ecommerce",
        summary:
          "Custom marketing sites, web applications, and online stores built with modern, maintainable code and clean checkout flows.",
        deliverables: [
          "Responsive Next.js & React builds",
          "Custom storefront & catalog architecture",
          "Payment & order workflow integration",
        ],
      },
      {
        id: "shopify-development",
        name: "Shopify development",
        summary:
          "Tailored Shopify themes, store setups, product architecture, and conversion-focused storefront refinements.",
        deliverables: [
          "Custom Liquid & section development",
          "Store migration & catalog setup",
          "App integration & speed tuning",
        ],
      },
      {
        id: "mobile-app-development",
        name: "Mobile app development",
        summary:
          "Cross-platform and native-ready mobile experiences designed around clear navigation, offline resilience, and smooth performance.",
        deliverables: [
          "iOS & Android app architecture",
          "API & authentication integration",
          "App Store & Play Store readiness",
        ],
      },
      {
        id: "chatbot-development",
        name: "Chatbot development",
        summary:
          "Structured customer-support and lead-routing chat assistants integrated into your website or messaging channels.",
        deliverables: [
          "Conversation flow & fallback design",
          "Knowledge-base & FAQ grounding",
          "Human-handover routing",
        ],
      },
    ],
  },
  {
    id: "design-creative",
    index: "02",
    title: "Design & Creative Production",
    subtitle:
      "Intentional visual systems, interface design, and modern AI-assisted video production that keep your brand cohesive.",
    items: [
      {
        id: "website-design",
        name: "Website design",
        summary:
          "Original editorial layouts, typography systems, and responsive page compositions tailored to your brand voice.",
        deliverables: [
          "Visual direction & design tokens",
          "Responsive desktop & mobile layouts",
          "Component & style documentation",
        ],
      },
      {
        id: "ux-ui-design",
        name: "UX/UI design",
        summary:
          "User-centered interface design, wireframing, and interactive prototypes that simplify complex customer journeys.",
        deliverables: [
          "Information architecture & user flows",
          "High-fidelity UI component kits",
          "Accessibility & contrast review",
        ],
      },
      {
        id: "ai-video",
        name: "AI video",
        summary:
          "Scripted, brand-aligned AI-assisted video assets for product explainers, social campaigns, and visual storytelling.",
        deliverables: [
          "Concept scripting & storyboarding",
          "AI-assisted video generation & editing",
          "Multi-format social & web exports",
        ],
      },
    ],
  },
  {
    id: "marketing-growth",
    index: "03",
    title: "Marketing & Channel Growth",
    subtitle:
      "Structured audience building across social platforms, email lifecycle programs, and automated video channels.",
    items: [
      {
        id: "social-media-marketing",
        name: "Social media marketing",
        summary:
          "Consistent content planning, creative direction, and campaign execution across core social channels.",
        deliverables: [
          "Channel strategy & content calendar",
          "Creative asset templates",
          "Campaign coordination & reporting",
        ],
      },
      {
        id: "email-marketing",
        name: "Email marketing",
        summary:
          "Lifecycle sequences, newsletters, and segmented campaigns designed for clarity, deliverability, and reader trust.",
        deliverables: [
          "Welcome & retention automations",
          "Responsive email template design",
          "List segmentation & cadence planning",
        ],
      },
      {
        id: "youtube-automation",
        name: "YouTube automation",
        summary:
          "End-to-end production workflows for faceless or channel-scaled YouTube publishing—covering scripting, editing, and packaging.",
        deliverables: [
          "Topic research & script pipelines",
          "Voiceover, editing & thumbnail systems",
          "Publishing & metadata checklists",
        ],
      },
    ],
  },
  {
    id: "advisory-consulting",
    index: "04",
    title: "Strategic Advisory",
    subtitle:
      "Practical technical, digital-product, and operational guidance to help you choose the right stack, roadmap, and priorities.",
    items: [
      {
        id: "consulting",
        name: "Consulting",
        summary:
          "Practical technical, digital-product, and operational guidance to help you choose the right stack, roadmap, and priorities.",
        deliverables: [
          "Technical & vendor audits",
          "Product roadmap workshops",
          "Implementation advisory",
        ],
      },
    ],
  },
];

export const ALL_SERVICE_NAMES: string[] = SERVICE_GROUPS.flatMap((group) =>
  group.items.map((item) => item.name)
);
