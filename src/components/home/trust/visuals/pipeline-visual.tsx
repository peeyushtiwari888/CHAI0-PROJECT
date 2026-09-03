"use client";

import { MessageSquare, Cpu, Box, Globe, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function PipelineVisual() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 0, label: "User Prompt", icon: MessageSquare, desc: "Input received" },
    { id: 1, label: "Inngest Queue", icon: Box, desc: "Async processing" },
    { id: 2, label: "AI Agent", icon: Cpu, desc: "Code generation" },
    { id: 3, label: "E2B Sandbox", icon: Globe, desc: "Isolated execution" }
  ];

  return (
    <div className="flex h-[350px] sm:h-[400px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-6 md:p-8 shrink-0">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">A transparent architecture.</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          CodePilot doesn't hide its workflow. From prompt to live preview, you can trace exactly how your application is being built and executed.
        </p>
      </div>
      
      <div className="relative flex-1 w-full flex items-center justify-center p-6 md:p-8">
        
        <div className="relative w-full max-w-2xl flex items-center justify-between">
          
          {/* SVG Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/40 -translate-y-1/2 z-0" />
          
          {/* Animated Progress Line */}
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
            style={{ width: `${(activeNode / 3) * 100}%` }}
          />

          {/* Nodes */}
          {nodes.map((node, i) => {
            const Icon = node.icon;
            const isActive = activeNode === i;
            const isPast = activeNode > i;

            return (
              <div key={node.id} className="relative z-10 flex flex-col items-center gap-3">
                <div 
                  className={cn(
                    "flex items-center justify-center size-12 sm:size-16 rounded-xl border shadow-sm transition-all duration-500",
                    isActive ? "bg-primary text-primary-foreground border-primary scale-110" : 
                    isPast ? "bg-primary/20 text-primary border-primary/30" : 
                    "bg-background text-muted-foreground border-border/50"
                  )}
                >
                  <Icon className={cn("size-5 sm:size-6", isActive && "animate-pulse")} />
                </div>
                
                <div className="absolute top-[120%] flex flex-col items-center w-24 text-center">
                  <span className={cn(
                    "text-xs font-semibold transition-colors duration-300 whitespace-nowrap",
                    isActive || isPast ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {node.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5 opacity-0 sm:opacity-100 hidden sm:block whitespace-nowrap">
                    {node.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
