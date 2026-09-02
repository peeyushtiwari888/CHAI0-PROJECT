"use client";

import { CheckCircle2, XCircle, RefreshCw, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ReliabilityVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = () => {
      setStep(0);
      setTimeout(() => setStep(1), 1000); // Step 1 ok
      setTimeout(() => setStep(2), 2000); // Step 2 fail
      setTimeout(() => setStep(3), 4000); // Retrying
      setTimeout(() => setStep(4), 5500); // Step 2 ok
      setTimeout(() => setStep(5), 6500); // Step 3 ok
      setTimeout(() => setStep(0), 10000); // Reset
    };

    sequence();
    const interval = setInterval(sequence, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-[350px] sm:h-[400px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-6 md:p-8 shrink-0">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">Built for reliability.</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Heavy tasks are processed asynchronously. If a dependency installation fails, the system automatically catches it and retries safely.
        </p>
      </div>
      
      <div className="relative flex-1 w-full p-6 md:p-8 pt-0 overflow-hidden">
        <div className="absolute inset-x-6 md:inset-x-8 bottom-6 top-0 rounded-xl border border-border/40 bg-card shadow-sm p-5 font-mono text-xs overflow-hidden transition-transform duration-700 group-hover:-translate-y-1">
           
           <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/40">
              <div className="flex items-center gap-2 text-foreground font-semibold uppercase tracking-widest text-[10px]">
                 <Activity className="size-3 text-primary" /> Async Build Status
              </div>
              <div className="text-[10px] text-muted-foreground">ID: bld_9x2f</div>
           </div>

           <div className="space-y-4">
              
              {/* Step 1 */}
              <div className={cn("flex items-center justify-between transition-all duration-500", step >= 1 ? "opacity-100" : "opacity-0 -translate-x-2")}>
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    <span className="text-foreground/90">Initialize workspace</span>
                 </div>
                 <span className="text-muted-foreground">0.2s</span>
              </div>

              {/* Step 2 (Error & Recovery) */}
              <div className={cn("flex flex-col gap-2 transition-all duration-500", step >= 2 ? "opacity-100" : "opacity-0 -translate-x-2")}>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       {step === 2 ? (
                         <XCircle className="size-4 text-rose-500" />
                       ) : step === 3 ? (
                         <RefreshCw className="size-4 text-amber-500 animate-spin" />
                       ) : (
                         <CheckCircle2 className="size-4 text-emerald-500" />
                       )}
                       <span className={cn(
                          "transition-colors duration-300", 
                          step === 2 ? "text-rose-500" : "text-foreground/90"
                       )}>
                          Install dependencies
                       </span>
                    </div>
                 </div>
                 
                 {/* Error State */}
                 {step === 2 && (
                    <div className="ml-7 p-2 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-500 animate-in fade-in zoom-in-95 duration-300">
                       ERR_NETWORK: Failed to fetch packages.
                    </div>
                 )}

                 {/* Retry State */}
                 {step === 3 && (
                    <div className="ml-7 text-[10px] text-amber-500 animate-in fade-in duration-300">
                       Retrying installation (Attempt 2/3)...
                    </div>
                 )}
              </div>

              {/* Step 3 */}
              <div className={cn("flex items-center justify-between transition-all duration-500", step >= 5 ? "opacity-100" : "opacity-0 -translate-x-2")}>
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    <span className="text-foreground/90">Start preview server</span>
                 </div>
                 <span className="text-muted-foreground">1.1s</span>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}
