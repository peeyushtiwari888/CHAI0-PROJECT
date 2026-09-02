import { useEffect, useState } from "react";
import { LayoutDashboard, CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentState } from "./agent-timeline";

interface AgentResultProps {
  currentState: AgentState;
}

export function AgentResult({ currentState }: AgentResultProps) {
  const [isMinimal, setIsMinimal] = useState(false);

  useEffect(() => {
    if (currentState === "iterating") {
      // Switch to minimal design after 2.5 seconds to simulate iteration
      const timer = setTimeout(() => {
        setIsMinimal(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (currentState === "idle") {
      setIsMinimal(false);
    }
  }, [currentState]);

  if (currentState !== "complete" && currentState !== "iterating") return null;

  return (
    <div className="flex flex-col h-full bg-background/50 rounded-xl overflow-hidden shadow-sm animate-in fade-in zoom-in-95 duration-500 m-4 border border-border/50">
      
      {/* Result Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm font-medium">
          {currentState === "complete" ? (
            <>
              <CheckCircle2 className="size-4 text-emerald-500" /> Application Ready
            </>
          ) : (
            <>
              <RefreshCw className="size-4 text-primary animate-spin" /> Iterating...
            </>
          )}
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold bg-muted px-2 py-1 rounded-full">
          Live Preview
        </div>
      </div>

      {/* Mini App Preview */}
      <div className="flex-1 p-4 bg-muted/10 flex items-center justify-center">
        
        {/* Mock Dashboard App Container */}
        <div className="w-full max-w-sm aspect-[4/3] bg-background border border-border rounded-lg shadow-sm flex flex-col overflow-hidden transition-all duration-700">
          
          <div className="h-8 border-b border-border/50 bg-muted/20 flex items-center px-3">
             <div className="size-2 rounded-full bg-primary/20 mr-2" />
             <div className="text-[10px] font-medium text-foreground">Analytics</div>
          </div>
          
          <div className="flex flex-1 p-3 gap-3">
            {/* Sidebar */}
            {!isMinimal && (
              <div className="w-16 border-r border-border/50 flex flex-col gap-2 shrink-0 animate-in fade-in duration-300">
                <div className="h-4 w-12 bg-muted rounded" />
                <div className="h-4 w-10 bg-muted rounded" />
                <div className="h-4 w-14 bg-muted rounded" />
              </div>
            )}
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="text-xs font-semibold">Overview</div>
              
              <div className={cn("grid gap-2 transition-all duration-500", isMinimal ? "grid-cols-2" : "grid-cols-2")}>
                <div className="bg-muted/30 border border-border/50 p-2 rounded flex flex-col gap-1">
                   <div className="text-[8px] text-muted-foreground uppercase">Revenue</div>
                   <div className={cn("font-bold text-foreground transition-all duration-500", isMinimal ? "text-lg" : "text-sm")}>$12k</div>
                </div>
                <div className="bg-muted/30 border border-border/50 p-2 rounded flex flex-col gap-1">
                   <div className="text-[8px] text-muted-foreground uppercase">Users</div>
                   <div className={cn("font-bold text-foreground transition-all duration-500", isMinimal ? "text-lg" : "text-sm")}>842</div>
                </div>
              </div>
              
              <div className="flex-1 bg-muted/20 border border-border/50 rounded flex items-end p-2 gap-1 relative overflow-hidden">
                 <div className="absolute top-2 left-2 text-[8px] text-muted-foreground">Traffic</div>
                 {[40, 70, 45, 90, 65, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/20 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }} />
                 ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
