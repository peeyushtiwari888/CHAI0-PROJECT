
import { Terminal, Code2, Sparkles, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

export function GenerationVisual() {
  return (
    <div className="flex h-[350px] sm:h-[400px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-6 md:p-8 shrink-0">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">Describe it. CodePilot writes it.</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Turn natural language into complex React components instantly. No more starting from scratch.
        </p>
      </div>
      
      <div className="relative flex-1 w-full overflow-hidden">
        {/* Animated Visual Container */}
        <div className="absolute inset-x-8 bottom-0 top-4 rounded-t-xl border border-border/50 bg-[#1e1e1e] shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 flex flex-col font-mono">
           
           {/* Prompt Box */}
           <div className="p-4 border-b border-white/10 bg-[#2d2d2d]/80 flex gap-3 items-start">
             <Sparkles className="size-4 text-primary mt-0.5 shrink-0" />
             <div className="text-xs text-white/90">
               Build a responsive pricing page with a toggle for monthly/yearly billing.
             </div>
           </div>

           {/* Activity & Code */}
           <div className="flex flex-1 overflow-hidden">
             
             {/* Left: File generation */}
             <div className="w-1/3 border-r border-white/10 p-4 space-y-3 bg-[#1e1e1e]">
               <div className="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-2 mb-4">
                 <Terminal className="size-3" /> Output
               </div>
               
               <div className="flex items-center gap-2 text-xs text-emerald-400 opacity-90 transition-all duration-300 transform group-hover:translate-x-1">
                 <FileCode className="size-3" /> page.tsx
               </div>
               <div className="flex items-center gap-2 text-xs text-emerald-400 opacity-70 transition-all duration-500 delay-100 transform group-hover:translate-x-1">
                 <FileCode className="size-3" /> pricing-card.tsx
               </div>
               <div className="flex items-center gap-2 text-xs text-emerald-400 opacity-50 transition-all duration-700 delay-200 transform group-hover:translate-x-1">
                 <FileCode className="size-3" /> toggle.tsx
               </div>
             </div>

             {/* Right: Code snippet */}
             <div className="flex-1 p-4 bg-[#1e1e1e] text-[10px] sm:text-xs leading-relaxed overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e1e1e] z-10 pointer-events-none" />
               <div className="opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-1">
                  <p><span className="text-[#c586c0]">import</span> {"{"} useState {"}"} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">"react"</span>;</p>
                  <p><span className="text-[#c586c0]">import</span> {"{"} PricingCard {"}"} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">"./pricing-card"</span>;</p>
                  <br/>
                  <p><span className="text-[#c586c0]">export default function</span> <span className="text-[#dcdcaa]">PricingPage</span>() {"{"}</p>
                  <p className="pl-4"><span className="text-[#569cd6]">const</span> [annual, setAnnual] = <span className="text-[#dcdcaa]">useState</span>(<span className="text-[#569cd6]">true</span>);</p>
                  <br/>
                  <p className="pl-4"><span className="text-[#c586c0]">return</span> (</p>
                  <p className="pl-8 text-white/70">&lt;<span className="text-[#569cd6]">div</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">"max-w-7xl mx-auto py-24"</span>&gt;</p>
                  <p className="pl-12 text-white/70">&lt;<span className="text-[#4ec9b0]">Toggle</span> <span className="text-[#9cdcfe]">isAnnual</span>={"{"}annual{"}"} /&gt;</p>
                  <p className="pl-12 text-white/70">&lt;<span className="text-[#569cd6]">div</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">"grid md:grid-cols-3 gap-8"</span>&gt;</p>
                  <p className="pl-16 text-white/70">&lt;<span className="text-[#4ec9b0]">PricingCard</span> <span className="text-[#9cdcfe]">tier</span>=<span className="text-[#ce9178]">"Pro"</span> /&gt;</p>
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
}
