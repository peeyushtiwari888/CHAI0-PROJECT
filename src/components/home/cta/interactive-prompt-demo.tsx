"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const suggestions = [
  "Build a modern analytics dashboard",
  "Create a SaaS landing page",
  "Build a productivity app",
];

export function InteractivePromptDemo() {
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSuggestionClick = (suggestion: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setPrompt("");
    
    let i = 0;
    const interval = setInterval(() => {
      setPrompt(suggestion.slice(0, i + 1));
      i++;
      if (i >= suggestion.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 40);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      
      {/* Floating Prompt Interface */}
      <div 
        className={cn(
          "w-full rounded-2xl border bg-background/60 shadow-2xl backdrop-blur-xl p-6 sm:p-8 relative z-10 overflow-hidden group transition-all duration-300",
          isFocused ? "border-primary/50 shadow-primary/10 ring-4 ring-primary/10" : "border-primary/20 shadow-primary/5"
        )}
      >
         
         {/* Decorative internal glow */}
         <div 
           className={cn(
             "absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 rounded-[100%] blur-3xl pointer-events-none transition-all duration-700",
             isFocused ? "bg-primary/20 opacity-100" : "bg-primary/10 opacity-50 group-hover:opacity-100"
           )} 
         />
         
         <div className="relative z-10 flex flex-col gap-6">
           
           {/* Textarea simulation */}
           <div className="relative">
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               placeholder="Describe what you want to build..."
               className="w-full min-h-[120px] resize-none bg-transparent border-none text-xl sm:text-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0"
               style={{ fieldSizing: "content" } as any}
             />
             
             {/* Simulated submit button */}
             <div className="absolute bottom-2 right-2">
               <Button asChild size="sm" className="rounded-full shadow-md gap-2 pl-4 pr-3 transition-transform hover:scale-105 active:scale-95">
                 <Link href="/root">
                   Build with CodePilot <Send className="size-3.5" />
                 </Link>
               </Button>
             </div>
           </div>

         </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6 relative z-10">
         {suggestions.map((suggestion, i) => (
           <button
             key={i}
             onClick={() => handleSuggestionClick(suggestion)}
             disabled={isTyping}
             className={cn(
               "flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:border-primary/30 hover:bg-muted hover:text-foreground active:scale-95",
               isTyping && "opacity-50 cursor-not-allowed"
             )}
           >
             <Sparkles className="size-3 text-primary" />
             {suggestion}
           </button>
         ))}
      </div>

      {/* Secondary Action */}
      <div className="mt-12">
         <Link 
           href="#interactive-demo-section" 
           className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 group transition-colors"
         >
           Explore the workflow <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
         </Link>
      </div>

    </div>
  );
}
