"use client";

import { useState } from "react";
import { ArrowRight, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { showcaseApps } from "./data";
import { ShowcaseBrowser } from "./showcase-browser";

export function GeneratedShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeApp = showcaseApps[activeIndex];

  const handleTryIdea = () => {
    const demoSection = document.getElementById("interactive-demo-section");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Dispatch custom event to trigger Phase 2 interaction
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("chai0:try-prompt", {
          detail: { category: activeApp.category },
        })
      );
    }, 500); // slight delay to allow scrolling to start
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6">
      {/* Section Header */}
      <RevealOnScroll className="flex flex-col items-center text-center mb-16">
        <p className="mb-4 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md">
          Built with Chai0
        </p>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Whatever you imagine, <br className="hidden sm:block" />
          start with a prompt.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Give Chai0 an idea and build everything from dashboards and SaaS products to portfolios, stores, and AI-powered tools.
        </p>
      </RevealOnScroll>

      {/* Category Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 px-4">
        {showcaseApps.map((app, index) => (
          <button
            key={app.id}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 border",
              activeIndex === index
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-background/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground backdrop-blur-sm"
            )}
          >
            {app.categoryLabel}
          </button>
        ))}
      </div>

      {/* Main Showcase Area */}
      <RevealOnScroll delayMs={200} className="flex flex-col gap-8">
        <ShowcaseBrowser activeCategory={activeApp.category} appId={activeApp.id} />
        
        {/* App Meta Information */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2 sm:px-4">
          <div className="flex flex-col gap-1 max-w-xl">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{activeApp.title}</h3>
            <p className="text-muted-foreground">{activeApp.description}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80">
                <Code2 className="size-3.5" /> Built with:
              </div>
              {activeApp.technologies.map((tech) => (
                <span key={tech} className="rounded bg-muted/50 px-2 py-1 text-[10px] font-semibold text-muted-foreground border border-border/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleTryIdea}
            size="lg"
            className="rounded-full shadow-md transition-transform hover:scale-105 active:scale-95 shrink-0 group"
          >
            Try this idea <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
