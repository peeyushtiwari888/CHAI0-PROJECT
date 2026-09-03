"use client";

import { useEffect, useState, useRef } from "react";
import { Lock, Plus, Search, Maximize2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShowcaseCategory } from "./data";

import { SaaSPreview } from "./previews/saas-preview";
import { DashboardPreview } from "./previews/dashboard-preview";
import { EcommercePreview } from "./previews/ecommerce-preview";
import { PortfolioPreview } from "./previews/portfolio-preview";
import { AIPreview } from "./previews/ai-preview";
import { ProductivityPreview } from "./previews/productivity-preview";

interface ShowcaseBrowserProps {
  activeCategory: ShowcaseCategory;
  appId: string;
}

export function ShowcaseBrowser({ activeCategory, appId }: ShowcaseBrowserProps) {
  const [currentCategory, setCurrentCategory] = useState<ShowcaseCategory>(activeCategory);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeCategory !== currentCategory) {
      setIsTransitioning(true);
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setCurrentCategory(activeCategory);
        setIsTransitioning(false);
      }, 300); // Wait for fade out, then swap and fade in
    }
  }, [activeCategory, currentCategory]);

  const renderPreview = (category: ShowcaseCategory) => {
    switch (category) {
      case "saas": return <SaaSPreview />;
      case "dashboard": return <DashboardPreview />;
      case "ecommerce": return <EcommercePreview />;
      case "portfolio": return <PortfolioPreview />;
      case "ai": return <AIPreview />;
      case "productivity": return <ProductivityPreview />;
      default: return null;
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-background/50 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20">
      {/* Browser Chrome */}
      <div className="flex h-12 items-center justify-between border-b border-border/40 bg-muted/30 px-4">
        {/* Controls */}
        <div className="flex items-center gap-2 w-24">
          <div className="size-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
          <div className="size-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
          <div className="size-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
        </div>

        {/* Address Bar */}
        <div className="flex h-7 flex-1 max-w-md items-center justify-center gap-2 rounded-md bg-background/50 border border-border/50 px-3 text-xs text-muted-foreground shadow-sm">
          <Lock className="size-3 opacity-70" />
          <span className="font-medium">{appId}.codepilot.app</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-3 w-24 text-muted-foreground">
          <Plus className="size-4 opacity-50" />
          <Search className="size-4 opacity-50" />
          <Maximize2 className="size-4 opacity-50" />
        </div>
      </div>

      {/* Browser Content */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full bg-background overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-300 ease-in-out origin-center",
            isTransitioning ? "opacity-0 scale-[0.98] blur-[2px]" : "opacity-100 scale-100 blur-0"
          )}
        >
          {renderPreview(currentCategory)}
        </div>
        
        {/* Subtle AI indicator overlay */}
        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground shadow-sm backdrop-blur-md uppercase">
          <Sparkles className="size-3 text-primary" /> Generated
        </div>
      </div>
    </div>
  );
}
