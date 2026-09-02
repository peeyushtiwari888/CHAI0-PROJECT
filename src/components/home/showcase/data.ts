export type ShowcaseCategory = "saas" | "dashboard" | "ecommerce" | "portfolio" | "ai" | "productivity";

export interface ShowcaseApp {
  id: string;
  category: ShowcaseCategory;
  categoryLabel: string;
  title: string;
  description: string;
  prompt: string;
  technologies: string[];
}

export const showcaseApps: ShowcaseApp[] = [
  {
    id: "analytics-pro",
    category: "saas",
    categoryLabel: "SaaS",
    title: "Analytics Pro",
    description: "Real-time analytics dashboard for modern SaaS teams.",
    prompt: "Build a SaaS analytics dashboard for monitoring active users and revenue",
    technologies: ["React", "TypeScript", "Tailwind", "Recharts"],
  },
  {
    id: "command-center",
    category: "dashboard",
    categoryLabel: "Dashboard",
    title: "Command Center",
    description: "Data-heavy interface with comprehensive system monitoring.",
    prompt: "Create a system monitoring dashboard with server metrics and traffic logs",
    technologies: ["React", "Tailwind", "Lucide"],
  },
  {
    id: "mono-store",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    title: "Mono Store",
    description: "Premium minimalist storefront with catalog and cart management.",
    prompt: "Build an e-commerce storefront for a minimalist fashion brand",
    technologies: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    id: "creative-studio",
    category: "portfolio",
    categoryLabel: "Portfolio",
    title: "Creative Studio",
    description: "Typography-focused digital portfolio for designers and agencies.",
    prompt: "Create a portfolio for a designer featuring large typography and project galleries",
    technologies: ["React", "Framer Motion", "Tailwind"],
  },
  {
    id: "ai-workspace",
    category: "ai",
    categoryLabel: "AI App",
    title: "AI Workspace",
    description: "Context-aware chat interface with continuous AI generation capabilities.",
    prompt: "Build an AI chat interface with a contextual sidebar for document analysis",
    technologies: ["React", "AI SDK", "Tailwind"],
  },
  {
    id: "focus-board",
    category: "productivity",
    categoryLabel: "Productivity",
    title: "Focus Board",
    description: "Kanban-style task manager designed for deep work and minimal distraction.",
    prompt: "Create a kanban task manager with progress indicators and calendar view",
    technologies: ["React", "TypeScript", "Tailwind"],
  }
];
