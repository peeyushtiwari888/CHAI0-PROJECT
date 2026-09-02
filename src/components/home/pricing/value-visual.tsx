
import { Sparkles, ArrowRight, Clock, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ValueVisual() {
  return (
    <div className="mt-16 sm:mt-24 w-full max-w-4xl mx-auto rounded-2xl border border-border/50 bg-background/50 shadow-sm overflow-hidden flex flex-col md:flex-row items-center relative">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 pointer-events-none" />

      {/* Left side: Message */}
      <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center relative z-10">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest w-fit mb-6">
           <Clock className="size-3" /> ROI & Time Saved
         </div>
         <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
           Don't pay for AI.<br />Pay for speed.
         </h3>
         <p className="text-sm text-muted-foreground leading-relaxed">
           Chai0 collapses the distance between your idea and a working prototype. Days of scaffolding and boilerplate are reduced to a single prompt.
         </p>
      </div>

      {/* Right side: Workflow abstract */}
      <div className="w-full md:w-1/2 p-8 bg-muted/20 border-t md:border-t-0 md:border-l border-border/40 relative z-10 flex flex-col items-center justify-center gap-4">
         
         <div className="flex flex-col w-full max-w-[280px] gap-2">
           {/* Step 1 */}
           <div className="flex items-center gap-3 bg-background border border-border/50 p-3 rounded-lg shadow-sm">
             <div className="size-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
               <Sparkles className="size-4 text-primary" />
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-semibold">1 Prompt</span>
               <span className="text-[10px] text-muted-foreground">"Build a SaaS dashboard"</span>
             </div>
           </div>

           <ArrowRight className="size-4 text-muted-foreground/30 mx-auto rotate-90 my-1" />

           {/* Step 2 */}
           <div className="flex items-center gap-3 bg-background border border-border/50 p-3 rounded-lg shadow-sm">
             <div className="size-8 rounded bg-emerald-500/10 flex items-center justify-center shrink-0">
               <Code2 className="size-4 text-emerald-500" />
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-semibold">32 Files Generated</span>
               <span className="text-[10px] text-muted-foreground">React, Tailwind, Layouts</span>
             </div>
           </div>

           <ArrowRight className="size-4 text-muted-foreground/30 mx-auto rotate-90 my-1" />

           {/* Step 3 */}
           <div className="flex items-center justify-between bg-primary text-primary-foreground border border-primary/50 p-4 rounded-lg shadow-md mt-1">
             <span className="text-sm font-bold">Application Ready</span>
             <span className="text-xs font-medium opacity-90">in ~20s</span>
           </div>
         </div>

      </div>
    </div>
  );
}
