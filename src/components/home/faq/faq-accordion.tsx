"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqData } from "./faq-data";

export function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {faqData.map((category, catIndex) => (
        <div key={catIndex} className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2 pl-2 border-l-2 border-primary/30">
            {category.title}
          </h4>
          
          <div className="flex flex-col gap-3">
            {category.items.map((item) => {
              const isOpen = openId === item.id;
              
              return (
                <div 
                  key={item.id} 
                  className={cn(
                    "rounded-xl border transition-all duration-300 overflow-hidden",
                    isOpen 
                      ? "border-primary/30 bg-background/80 shadow-md" 
                      : "border-border/50 bg-background/40 hover:border-border hover:bg-background/60"
                  )}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    aria-expanded={isOpen}
                  >
                    <span className={cn(
                      "font-medium transition-colors duration-300",
                      isOpen ? "text-foreground" : "text-foreground/80"
                    )}>
                      {item.question}
                    </span>
                    <div className={cn(
                      "flex items-center justify-center size-6 shrink-0 rounded-full transition-all duration-300",
                      isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"
                    )}>
                      <ChevronDown className="size-3.5 transition-transform" />
                    </div>
                  </button>
                  
                  <div 
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 pt-0 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
