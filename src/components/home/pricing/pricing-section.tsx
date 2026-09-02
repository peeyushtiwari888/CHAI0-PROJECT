
import { CreditCard } from "lucide-react";
import { pricingPlans } from "./pricing-data";
import { PricingCard } from "./pricing-card";
import { ValueVisual } from "./value-visual";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function PricingSection() {
  return (
    <section id="pricing-section" className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 relative z-10">
      
      {/* Background radial gradient to separate section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none -z-10" />

      {/* Section Header */}
      <RevealOnScroll className="flex flex-col items-center text-center mb-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
          <CreditCard className="size-4" /> Simple, Transparent Pricing
        </p>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Start building. <br className="hidden sm:block" />
          Scale when you need to.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Choose a plan that matches how you build with AI. No hidden fees or complex usage tiers.
        </p>
      </RevealOnScroll>

      {/* Pricing Cards */}
      {/* Pricing Cards */}
      <RevealOnScroll delayMs={200} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </RevealOnScroll>

      {/* Value Visualization */}
      {/* Value Visualization */}
      <RevealOnScroll delayMs={400}>
        <ValueVisual />
      </RevealOnScroll>

      {/* Small Legal / Trust text */}
      <div className="mt-8 text-center">
         <p className="text-xs text-muted-foreground/60">
           Prices displayed in USD. You can cancel your subscription at any time.
         </p>
      </div>

    </section>
  );
}
