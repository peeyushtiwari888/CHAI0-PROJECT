
import { Info } from "lucide-react";

export function FAQBoundaryCard() {
  return (
    <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 sm:p-6 relative overflow-hidden group">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="flex items-start gap-4 relative z-10">
        <div className="size-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-500">
          <Info className="size-4" />
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-base font-semibold text-foreground mb-2">
            Less Boilerplate. More Breakthroughs.
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI accelerates development, but developers remain in control. CodePilot is incredible at scaffolding components, writing UIs, and wiring up logic—but complex, highly specific architectural decisions will still require your oversight and iteration.
          </p>
        </div>
      </div>
    </div>
  );
}
