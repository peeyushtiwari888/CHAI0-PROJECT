"use client";

import { MessageSquare, User, Sparkles, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function IterationVisual() {
  const [step, setStep] = useState(0);

  // Animation sequence
  useEffect(() => {
    const sequence = () => {
      setStep(0);
      setTimeout(() => setStep(1), 1500); // User message appears
      setTimeout(() => setStep(2), 3000); // AI thinking
      setTimeout(() => setStep(3), 4500); // AI response + UI update
      setTimeout(() => setStep(0), 8000); // Reset
    };

    sequence();
    const interval = setInterval(sequence, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-[350px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-6 shrink-0">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">Iterate naturally.</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Keep refining your application through conversation. Just tell CodePilot what to tweak next.
        </p>
      </div>
      
      <div className="relative flex-1 w-full p-4 overflow-hidden">
        <div className="absolute inset-x-6 bottom-4 top-0 flex flex-col gap-3 font-sans">
           
           {/* User Message */}
           <div className={cn("flex gap-3 max-w-[85%] self-end transition-all duration-500 transform", step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
             <div className="bg-muted px-4 py-3 rounded-2xl rounded-tr-sm text-xs text-foreground shadow-sm border border-border/40">
               Make the dashboard more minimal and use a monochromatic palette.
             </div>
             <div className="size-6 rounded-full bg-border flex items-center justify-center shrink-0 mt-1">
               <User className="size-3 text-muted-foreground" />
             </div>
           </div>

           {/* AI Message */}
           <div className={cn("flex gap-3 max-w-[90%] transition-all duration-500 transform", step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
             <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 shadow-sm">
               <Sparkles className="size-3 text-primary" />
             </div>
             <div className="bg-background px-4 py-3 rounded-2xl rounded-tl-sm text-xs text-foreground shadow-sm border border-border/50">
               {step === 2 ? (
                 <div className="flex items-center gap-2 text-muted-foreground">
                   <RefreshCw className="size-3 animate-spin" /> Updating layout...
                 </div>
               ) : (
                 <div className="flex flex-col gap-2">
                   <span>I've updated the dashboard to be more minimal.</span>
                   
                   {/* Mini UI diff representation */}
                   <div className="mt-2 flex items-center gap-2 border border-border/40 rounded-lg p-2 bg-muted/20">
                      <div className="flex-1 flex gap-1">
                         <div className="size-4 bg-blue-500/20 rounded-sm" />
                         <div className="size-4 bg-emerald-500/20 rounded-sm" />
                         <div className="size-4 bg-rose-500/20 rounded-sm" />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">→</span>
                      <div className="flex-1 flex gap-1">
                         <div className="size-4 bg-foreground/20 rounded-sm" />
                         <div className="size-4 bg-foreground/10 rounded-sm" />
                         <div className="size-4 bg-foreground/5 rounded-sm" />
                      </div>
                   </div>
                 </div>
               )}
             </div>
           </div>
           
        </div>
      </div>
    </div>
  );
}
