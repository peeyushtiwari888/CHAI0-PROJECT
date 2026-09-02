
import { Check, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "./pricing-data";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col p-8 rounded-2xl border transition-all duration-500",
        plan.isPopular 
          ? "border-primary/50 shadow-2xl shadow-primary/10 bg-background md:-mt-4 md:mb-4" 
          : "border-border/50 bg-background/50 hover:border-border"
      )}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 inset-x-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight text-foreground">{plan.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
      </div>

      <div className="mb-6 flex items-baseline text-foreground">
        <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
        <span className="text-sm text-muted-foreground ml-1 font-medium">/month</span>
      </div>

      <ul className="mb-8 flex-1 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            {feature.included ? (
              <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <X className="size-4 text-muted-foreground/30 shrink-0 mt-0.5" />
            )}
            <span className={feature.included ? "text-foreground/90" : "text-muted-foreground/50"}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={plan.isPopular ? "default" : "outline"}
        className={cn(
          "w-full rounded-full transition-all duration-300",
          plan.isPopular ? "hover:scale-[1.02] shadow-md" : ""
        )}
      >
        <Link href="/root">
          {plan.cta}
        </Link>
      </Button>
    </div>
  );
}
