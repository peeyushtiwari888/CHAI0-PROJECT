export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: { name: string; included: boolean }[];
  cta: string;
  isPopular?: boolean;
};

// NOTE: This is presentation-only data for the landing page.
// The backend does not currently have a real billing integration.
export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For exploring CodePilot and building simple applications.",
    price: "$0",
    features: [
      { name: "Standard AI Code Generation", included: true },
      { name: "Public Live Previews", included: true },
      { name: "Shared Execution Sandbox", included: true },
      { name: "Basic Component Library", included: true },
      { name: "Private Projects", included: false },
      { name: "Fast Inngest Queues", included: false },
    ],
    cta: "Start Building",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For developers building real production applications.",
    price: "$20",
    isPopular: true,
    features: [
      { name: "Advanced AI Code Generation", included: true },
      { name: "Private Live Previews", included: true },
      { name: "Dedicated E2B Sandbox", included: true },
      { name: "Full Project File Export", included: true },
      { name: "Private Projects", included: true },
      { name: "Priority Inngest Queues", included: true },
    ],
    cta: "Upgrade to Pro",
  },
];
