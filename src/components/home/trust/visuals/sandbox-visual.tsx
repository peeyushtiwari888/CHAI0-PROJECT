"use client";

import { ShieldCheck, TerminalSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function SandboxVisual() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentLogs: string[] = [];
    const fullSequence = [
      "Provisioning secure E2B sandbox...",
      "Environment isolation confirmed.",
      "Cloning generated repository...",
      "Installing dependencies...",
      "Starting development server...",
      "Application running on port 3000."
    ];

    const interval = setInterval(() => {
      if (currentLogs.length >= fullSequence.length) {
        currentLogs = [];
      }
      currentLogs.push(fullSequence[currentLogs.length]);
      setLogs([...currentLogs]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-[350px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-6 shrink-0">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
           Secure, isolated environments.
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Every application runs in a dedicated, secure E2B sandbox. No shared state, no cross-contamination.
        </p>
      </div>
      
      <div className="relative flex-1 w-full p-4 overflow-hidden">
        <div className="absolute inset-x-4 bottom-4 top-0 rounded-xl border border-border/40 bg-[#0a0a0a] shadow-sm flex flex-col font-mono overflow-hidden transition-transform duration-700 group-hover:-translate-y-1">
           
           <div className="h-10 bg-[#141414] border-b border-white/10 flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-xs text-white/50">
                 <TerminalSquare className="size-3.5" /> E2B Sandbox
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20 text-[10px] text-emerald-400">
                 <ShieldCheck className="size-3" /> Isolated
              </div>
           </div>

           <div className="p-4 text-xs leading-relaxed overflow-hidden flex flex-col justify-end h-full">
              {logs.map((log, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-white/70">
                   <span className="text-emerald-400/80 mr-2">→</span>{log}
                </div>
              ))}
              <div className="mt-1 flex items-center">
                 <span className="text-blue-400/80 mr-2">~</span>
                 <div className="w-2 h-3 bg-white/70 animate-pulse" />
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
