"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Terminal, Code2, Play, CheckCircle2, CircleDashed, ChevronRight, RotateCcw, FileCode, Layout } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MockDashboard, MockPortfolio, MockStorefront, MockTaskManager } from "./mock-previews";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

const examplePrompts = [
  { id: "saas", label: "Build a SaaS analytics dashboard", icon: Layout },
  { id: "dashboard", label: "Create a system monitoring dashboard", icon: Layout },
  { id: "ecommerce", label: "Build an e-commerce storefront", icon: Layout },
  { id: "portfolio", label: "Create a portfolio for a designer", icon: FileCode },
  { id: "ai", label: "Build an AI chat interface", icon: Sparkles },
  { id: "productivity", label: "Create an AI task manager", icon: CheckCircle2 },
];

const agentSteps = [
  { id: 0, label: "Understanding request" },
  { id: 1, label: "Planning architecture" },
  { id: 2, label: "Writing components" },
  { id: 3, label: "Running application" },
];

type DemoState = "idle" | "building" | "ready";

export function InteractiveDemo() {
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const [selectedPromptId, setSelectedPromptId] = useState<string>("saas");
  const [promptText, setPromptText] = useState("");
  const [activeStep, setActiveStep] = useState(-1);

  // Auto-populate input when clicking an example
  useEffect(() => {
    if (demoState === "idle") {
      const example = examplePrompts.find((p) => p.id === selectedPromptId);
      if (example) setPromptText(example.label);
    }
  }, [selectedPromptId, demoState]);

  // Listen for Phase 3 "Try this idea" connection
  useEffect(() => {
    const handleTryPrompt = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string }>;
      if (customEvent.detail?.category) {
        setSelectedPromptId(customEvent.detail.category);
        setDemoState("building");
      }
    };
    window.addEventListener("codepilot:try-prompt", handleTryPrompt);
    return () => window.removeEventListener("codepilot:try-prompt", handleTryPrompt);
  }, []);

  // Handle the building animation sequence
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (demoState === "building") {
      setActiveStep(0);
      
      const timings = [1000, 1500, 2500, 1500]; // Duration for each step
      let currentStep = 0;
      
      const advanceStep = () => {
        if (currentStep < agentSteps.length) {
          timeoutRef.current = setTimeout(() => {
            currentStep++;
            setActiveStep(currentStep);
            advanceStep();
          }, timings[currentStep] || 1000);
        } else {
          // Finished
          timeoutRef.current = setTimeout(() => {
            setDemoState("ready");
          }, 500);
        }
      };
      
      advanceStep();
    } else if (demoState === "idle") {
      setActiveStep(-1);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [demoState]);

  const handleBuild = () => {
    if (!promptText.trim()) return;
    setDemoState("building");
  };

  const handleReset = () => {
    setDemoState("idle");
  };

  const renderPreview = () => {
    switch (selectedPromptId) {
      case "saas": return <MockDashboard />;
      case "dashboard": return <MockDashboard />;
      case "portfolio": return <MockPortfolio />;
      case "ecommerce": return <MockStorefront />;
      case "ai": return <MockTaskManager />;
      case "productivity": return <MockTaskManager />;
      default: return <MockDashboard />;
    }
  };

  return (
    <RevealOnScroll className="w-full max-w-6xl mx-auto mt-24 mb-32 px-4 sm:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
          From idea to working application
        </p>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Describe what you want. CodePilot&apos;s AI agent turns your idea into a working application you can see, explore, and iterate on.
        </p>
      </div>

      {/* Demo Window */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/40 shadow-2xl backdrop-blur-xl">
        {/* Window Header */}
        <div className="flex h-12 items-center justify-between border-b border-border/40 bg-muted/20 px-4">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-border" />
            <div className="size-3 rounded-full bg-border" />
            <div className="size-3 rounded-full bg-border" />
          </div>
          <div className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Sparkles className="size-3 text-primary" />
            CodePilot Workspace
          </div>
          <div className="w-12" />
        </div>

        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left Panel: AI Agent & Prompt */}
          <div className="flex w-full flex-col border-b border-border/40 bg-card/30 p-6 md:w-80 md:border-b-0 md:border-r shrink-0 transition-all">
            <div className="mb-6 text-sm font-medium text-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-primary" />
                AI Agent
              </div>
              {demoState === "building" && <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />}
              {demoState === "ready" && <CheckCircle2 className="size-4 text-emerald-500" />}
            </div>

            {/* AI Agent Status Timeline */}
            <div className="flex flex-1 flex-col gap-4 mb-8">
              {demoState === "idle" ? (
                <div className="flex flex-col gap-3 text-sm animate-in fade-in duration-500">
                  <p className="text-muted-foreground mb-2">Select an example to see how CodePilot works:</p>
                  {examplePrompts.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => setSelectedPromptId(example.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all hover:bg-muted active:scale-95",
                        selectedPromptId === example.id 
                          ? "border-primary/50 bg-primary/5 text-foreground shadow-sm" 
                          : "border-border/50 text-muted-foreground"
                      )}
                    >
                      <example.icon className={cn("size-4", selectedPromptId === example.id ? "text-primary" : "text-muted-foreground")} />
                      <span className="text-xs font-medium">{example.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                  <div className="mb-2 rounded-md bg-muted/40 p-3 text-xs text-foreground italic border border-border/50">
                    "{promptText}"
                  </div>
                  {agentSteps.map((step) => {
                    const isActive = activeStep === step.id;
                    const isCompleted = activeStep > step.id || demoState === "ready";
                    const isPending = activeStep < step.id && demoState !== "ready";
                    
                    return (
                      <div 
                        key={step.id} 
                        className={cn(
                          "flex items-center gap-3 text-sm transition-all duration-500",
                          isCompleted ? "text-muted-foreground" : isActive ? "text-foreground" : "text-muted-foreground/40 opacity-50"
                        )}
                      >
                        <div className="relative flex size-5 items-center justify-center shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="size-4 text-primary" />
                          ) : isActive ? (
                            <CircleDashed className="size-4 animate-spin text-primary" />
                          ) : (
                            <div className="size-1.5 rounded-full bg-current opacity-40" />
                          )}
                        </div>
                        <span className={cn("font-medium", isActive && "animate-pulse")}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                  
                  {demoState === "ready" && (
                    <div className="flex items-center gap-3 text-sm text-foreground animate-in fade-in duration-500 mt-2">
                      <div className="flex size-5 items-center justify-center shrink-0">
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      </div>
                      <span className="font-semibold text-emerald-500">Ready</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Composer Area */}
            <div className="mt-auto flex flex-col gap-3">
              {demoState === "idle" ? (
                <>
                  <div className="relative">
                    <textarea
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      placeholder="Describe your application..."
                      className="w-full resize-none rounded-xl border border-border/50 bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 shadow-inner"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleBuild} className="w-full rounded-full shadow-md transition-transform hover:scale-105 active:scale-95">
                    Build with CodePilot <ChevronRight className="ml-1 size-4" />
                  </Button>
                </>
              ) : (
                <Button onClick={handleReset} variant="outline" className="w-full rounded-full shadow-sm group">
                  <RotateCcw className="mr-2 size-4 transition-transform group-hover:-rotate-90" /> Try another prompt
                </Button>
              )}
            </div>
          </div>

          {/* Right Panel: Code Activity & Live Preview */}
          <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
            
            {/* IDLE STATE */}
            <div className={cn(
              "absolute inset-0 flex flex-col items-center justify-center text-center p-8 transition-opacity duration-700",
              demoState === "idle" ? "opacity-60 z-10" : "opacity-0 pointer-events-none z-0"
            )}>
              <Layout className="mb-4 size-12 text-muted-foreground/30" />
              <h3 className="text-lg font-medium text-foreground/70">Ready to build</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground/60">
                Select a prompt on the left and click "Build with CodePilot" to see the AI agent in action.
              </p>
            </div>

            {/* BUILDING STATE (Code Activity) */}
            <div className={cn(
              "absolute inset-0 flex flex-col p-6 transition-opacity duration-500",
              demoState === "building" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            )}>
              <div className="mb-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Code2 className="size-4" /> Code Activity
              </div>
              
              <div className="flex flex-1 gap-6 overflow-hidden">
                <div className="hidden flex-col gap-2 w-40 text-xs text-muted-foreground font-mono sm:flex">
                  <div className="text-foreground">src/</div>
                  <div className="pl-4">app/</div>
                  <div className="pl-8 text-primary">page.tsx</div>
                  <div className="pl-4">components/</div>
                  <div className="pl-8">ui/</div>
                  <div className="pl-8">layout.tsx</div>
                  <div className="pl-4">lib/</div>
                  <div className="pl-8">utils.ts</div>
                </div>
                
                <div className="flex-1 rounded-lg border border-border/40 bg-muted/10 p-4 font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
                  <div className="animate-pulse opacity-70">
                    <p><span className="text-purple-400">import</span> {"{"} useState {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">"react"</span>;</p>
                    <p><span className="text-purple-400">import</span> {"{"} Card {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">"@/components/ui/card"</span>;</p>
                    <br/>
                    <p><span className="text-blue-400">export default function</span> <span className="text-yellow-400">GeneratedApp</span>() {"{"}</p>
                    <p className="pl-4"><span className="text-blue-400">const</span> [data, setData] = <span className="text-yellow-400">useState</span>([]);</p>
                    <br/>
                    <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                    <p className="pl-8 text-foreground/80">&lt;div className="flex flex-col gap-4 p-6"&gt;</p>
                    {activeStep >= 1 && <p className="pl-12 text-foreground/80 animate-in slide-in-from-left-2">&lt;Header title="App" /&gt;</p>}
                    {activeStep >= 2 && <p className="pl-12 text-foreground/80 animate-in slide-in-from-left-2">&lt;DashboardGrid data={"{"}data{"}"} /&gt;</p>}
                    {activeStep >= 3 && <p className="pl-12 text-foreground/80 animate-in slide-in-from-left-2">&lt;AnalyticsChart /&gt;</p>}
                    <p className="pl-8 text-foreground/80">&lt;/div&gt;</p>
                    <p className="pl-4">);</p>
                    <p>{"}"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* READY STATE (Live Preview) */}
            <div className={cn(
              "absolute inset-0 flex flex-col bg-muted/10 p-2 sm:p-6 transition-all duration-700",
              demoState === "ready" ? "opacity-100 z-10 scale-100" : "opacity-0 pointer-events-none z-0 scale-95"
            )}>
              <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Play className="size-4 text-emerald-500" /> Live Preview
                </div>
                <div className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-emerald-500 uppercase">
                  Running
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden shadow-2xl rounded-xl ring-1 ring-border/50">
                {renderPreview()}
              </div>
            </div>

          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
