"use client";

import { Chai0Mark } from "@/components/brand/chai0-logo";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Understanding request...",
  "Planning application architecture...",
  "Generating components and logic...",
  "Writing project files...",
  "Starting secure sandbox...",
  "Running application...",
  "Finalizing changes..."
];

function ShimmerMessages() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        prevIndex === loadingMessages.length - 1 ? prevIndex : prevIndex + 1
      );
    }, 3500); // Slower, more intentional transitions

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 overflow-hidden">
      {loadingMessages.map((msg, index) => {
        const isPast = index < currentMessageIndex;
        const isCurrent = index === currentMessageIndex;
        const isFuture = index > currentMessageIndex;

        // Only show current and past messages (up to 3 total lines)
        if (isFuture || index < currentMessageIndex - 2) return null;

        return (
          <div key={msg} className={cn(
            "flex items-center gap-3 transition-all duration-500",
            isCurrent ? "opacity-100 translate-x-0" : "opacity-40 -translate-y-1 scale-95"
          )}>
            <div className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded-full border",
              isCurrent ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground/30 text-muted-foreground/30"
            )}>
              {isPast ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : isCurrent ? (
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              ) : (
                <span className="size-1 rounded-full bg-transparent" />
              )}
            </div>
            <span className={cn(
              "text-sm tracking-tight transition-colors duration-300",
              isCurrent ? "text-foreground font-medium" : "text-muted-foreground/70"
            )}>
              {msg}
            </span>
          </div>
        );
      })}
    </div>
  );
}

import { cn } from "@/lib/utils";

/**
 * Placeholder assistant message shown while a response is being generated.
 */
export default function MessageLoading() {
  return (
    <div className="group flex w-full flex-col px-4 py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)] border border-primary/40 animate-pulse">
            <Chai0Mark className="size-4 text-primary" />
          </div>
          <div className="flex flex-col">
             <span className="text-sm font-semibold text-foreground">Chai0 Agent</span>
             <span className="text-[10px] uppercase tracking-wider text-primary font-medium flex items-center gap-1.5">
               <span className="size-1.5 rounded-full bg-primary animate-ping" /> Working...
             </span>
          </div>
        </div>

        <div className="flex flex-col pl-11">
          <div className="w-full max-w-sm rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm backdrop-blur-sm">
            <ShimmerMessages />
          </div>
        </div>
      </div>
    </div>
  );
}
