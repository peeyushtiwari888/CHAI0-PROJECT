"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Cpu, RotateCcw, Play, BrainCircuit } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { AgentTimeline, type AgentState } from "./agent-timeline";
import { AgentActivity } from "./agent-activity";
import { AgentCodePanel } from "./agent-code-panel";
import { AgentTerminal } from "./agent-terminal";
import { AgentResult } from "./agent-result";

export function AgentExperience() {
  const [currentState, setCurrentState] = useState<AgentState>("idle");
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return clearAllTimeouts;
  }, []);

  const startDemo = () => {
    if (currentState !== "idle") return;
    
    clearAllTimeouts();
    setCurrentState("understand");
    
    timeoutsRef.current.push(setTimeout(() => setCurrentState("plan"), 1500));
    timeoutsRef.current.push(setTimeout(() => setCurrentState("build"), 3000));
    timeoutsRef.current.push(setTimeout(() => setCurrentState("run"), 5500));
    timeoutsRef.current.push(setTimeout(() => setCurrentState("complete"), 8500));
    timeoutsRef.current.push(setTimeout(() => setCurrentState("iterating"), 10500));
  };

  const handleReset = () => {
    clearAllTimeouts();
    setCurrentState("idle");
  };

  return (
    <section id="agent-experience-section" className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6">
      {/* Section Header */}
      <RevealOnScroll className="flex flex-col items-center text-center mb-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
          <BrainCircuit className="size-4" /> The Intelligence
        </p>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          More than just code generation. <br className="hidden sm:block" />
          An agent that builds.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          CodePilot doesn't just output raw React components. It acts as an autonomous developer—planning architecture, writing files, and running them in a secure sandbox.
        </p>
      </RevealOnScroll>

      {/* Agent Workspace */}
      <RevealOnScroll className="overflow-hidden rounded-2xl border border-border/60 bg-background/40 shadow-2xl backdrop-blur-xl transition-all duration-700 hover:shadow-primary/5 hover:border-primary/20">
        
        {/* Workspace Header */}
        <div className="flex h-12 items-center justify-between border-b border-border/40 bg-muted/20 px-4">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-border" />
            <div className="size-3 rounded-full bg-border" />
            <div className="size-3 rounded-full bg-border" />
          </div>
          <div className="text-xs font-medium text-foreground flex items-center gap-2">
            CODEPILOT AGENT 
            <span className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] uppercase tracking-wider font-bold">
              <span className={`size-1.5 rounded-full bg-primary ${currentState !== 'idle' ? 'animate-pulse' : ''}`} />
              {currentState === "idle" ? "READY" : "ACTIVE"}
            </span>
          </div>
          <div className="w-12 flex justify-end">
             {currentState !== "idle" && (
                <button onClick={handleReset} className="text-muted-foreground hover:text-foreground transition-colors" title="Replay demo">
                   <RotateCcw className="size-4" />
                </button>
             )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left Panel: Timeline */}
          <AgentTimeline currentState={currentState} />

          {/* Right Panel: Content Area */}
          <div className="relative flex flex-1 flex-col overflow-hidden bg-[#050505]">
            
            {/* IDLE STATE */}
            {currentState === "idle" && (
              <div className="flex h-full flex-col items-center justify-center text-center p-8 animate-in fade-in duration-700 bg-background">
                <Sparkles className="mb-6 size-12 text-primary/40 animate-pulse" />
                <h3 className="text-xl font-medium text-foreground mb-6">Ready to start building</h3>
                <Button onClick={startDemo} size="lg" className="rounded-full shadow-md group">
                  <Play className="mr-2 size-4 transition-transform group-hover:scale-110" /> See the agent work
                </Button>
              </div>
            )}

            {/* DYNAMIC PANELS */}
            {currentState !== "idle" && (
              <div className="absolute inset-0 flex">
                {/* 
                  The Activity feed sits on the left of the right panel, or takes full width. 
                  When code or terminal is active, we split it.
                */}
                <div className={`transition-all duration-500 h-full ${currentState === 'build' || currentState === 'run' ? 'w-1/3 border-r border-white/10 hidden lg:block' : 'w-full'}`}>
                   {currentState !== "complete" && currentState !== "iterating" && (
                     <AgentActivity currentState={currentState} />
                   )}
                </div>
                
                <div className={`transition-all duration-500 h-full ${currentState === 'build' || currentState === 'run' ? 'flex-1 w-full lg:w-2/3' : 'w-0 hidden'}`}>
                  {currentState === "build" && <AgentCodePanel isActive={true} />}
                  {currentState === "run" && <AgentTerminal isActive={true} />}
                </div>

                {/* RESULT STATE */}
                {(currentState === "complete" || currentState === "iterating") && (
                  <div className="absolute inset-0 bg-background z-10 animate-in fade-in duration-500 flex items-center justify-center">
                    <div className="w-full h-full max-w-3xl flex flex-col md:flex-row shadow-2xl">
                       <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-border/40">
                         <AgentActivity currentState={currentState} />
                       </div>
                       <div className="w-full md:w-1/2 h-1/2 md:h-full">
                         <AgentResult currentState={currentState} />
                       </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </RevealOnScroll>

      {/* Supporting Benefits */}
      <RevealOnScroll delayMs={200} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-4">
        <div className="flex flex-col text-center md:text-left">
           <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto md:mx-0">
             <Cpu className="size-5" />
           </div>
           <h4 className="text-lg font-semibold text-foreground mb-2">Understands Context</h4>
           <p className="text-sm text-muted-foreground">Reads your codebase and aligns with your existing architecture before writing a single line.</p>
        </div>
        <div className="flex flex-col text-center md:text-left">
           <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto md:mx-0">
             <Sparkles className="size-5" />
           </div>
           <h4 className="text-lg font-semibold text-foreground mb-2">Builds, Not Suggests</h4>
           <p className="text-sm text-muted-foreground">Actually creates files, implements components, and handles configuration for you.</p>
        </div>
        <div className="flex flex-col text-center md:text-left">
           <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto md:mx-0">
             <RotateCcw className="size-5" />
           </div>
           <h4 className="text-lg font-semibold text-foreground mb-2">Iterate Naturally</h4>
           <p className="text-sm text-muted-foreground">Keep refining your application through conversation. Just tell CodePilot what to tweak next.</p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
