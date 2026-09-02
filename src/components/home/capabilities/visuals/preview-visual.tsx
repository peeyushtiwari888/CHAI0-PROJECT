"use client";

import { RefreshCw, Play, Layout } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function PreviewVisual() {
  const [refreshing, setRefreshing] = useState(false);

  // Auto-refresh simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 800);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-[350px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-6 shrink-0">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">See it come alive.</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Don't just read code. Instantly view the running application in a secure, live preview environment.
        </p>
      </div>
      
      <div className="relative flex-1 w-full flex items-end justify-center px-6">
        {/* Browser Frame */}
        <div className="w-full h-[85%] rounded-t-xl border border-border/50 bg-background shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 flex flex-col overflow-hidden relative">
           
           {/* Live Badge */}
           <div className="absolute -top-3 -right-3 z-20">
             <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold tracking-wider px-2 py-1 rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-md uppercase">
               <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Preview
             </div>
           </div>

           {/* Browser Chrome */}
           <div className="h-8 border-b border-border/40 bg-muted/30 flex items-center px-3 justify-between">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-border/80" />
                <div className="size-2.5 rounded-full bg-border/80" />
                <div className="size-2.5 rounded-full bg-border/80" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-background/50 border border-border/40 rounded-md text-[9px] text-muted-foreground w-1/2 justify-center max-w-[150px]">
                 localhost:3000
                 <RefreshCw className={cn("size-2.5 ml-1 text-primary transition-all", refreshing ? "animate-spin opacity-100" : "opacity-40")} />
              </div>
              <div className="w-8" />
           </div>

           {/* App Mockup */}
           <div className="flex-1 bg-muted/10 p-4 flex gap-4 overflow-hidden relative">
              <div className={cn("absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 transition-opacity duration-300 flex items-center justify-center", refreshing ? "opacity-100" : "opacity-0 pointer-events-none")}>
                <div className="bg-background border border-border shadow-md rounded-full p-2">
                   <RefreshCw className="size-4 text-primary animate-spin" />
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-16 flex flex-col gap-3 shrink-0">
                 <div className="size-6 bg-primary/20 rounded-md mb-2 flex items-center justify-center">
                   <Layout className="size-3 text-primary" />
                 </div>
                 <div className="h-3 w-12 bg-muted rounded-full" />
                 <div className="h-3 w-10 bg-muted rounded-full" />
                 <div className="h-3 w-14 bg-muted rounded-full" />
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col gap-3">
                 <div className="h-4 w-24 bg-foreground/10 rounded-full" />
                 <div className="flex gap-3">
                    <div className="flex-1 h-16 bg-background border border-border/50 rounded-lg p-2 flex flex-col justify-end">
                       <div className="h-2 w-1/2 bg-muted rounded-full mb-1" />
                       <div className="h-4 w-3/4 bg-foreground/80 rounded-full" />
                    </div>
                    <div className="flex-1 h-16 bg-background border border-border/50 rounded-lg p-2 flex flex-col justify-end">
                       <div className="h-2 w-1/2 bg-muted rounded-full mb-1" />
                       <div className="h-4 w-3/4 bg-foreground/80 rounded-full" />
                    </div>
                 </div>
                 <div className="flex-1 bg-background border border-border/50 rounded-lg mt-2 p-3">
                    <div className="h-full w-full flex items-end gap-1">
                       {[30, 45, 60, 40, 75, 55, 90].map((h, i) => (
                         <div key={i} className="flex-1 bg-primary/20 rounded-t-sm transition-all duration-700" style={{ height: refreshing ? '10%' : `${h}%` }} />
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
