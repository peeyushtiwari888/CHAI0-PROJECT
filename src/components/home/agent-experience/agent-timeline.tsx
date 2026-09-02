import { CheckCircle2, Circle, CircleDashed, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export type AgentState = "idle" | "understand" | "plan" | "build" | "run" | "complete" | "iterating";

const steps = [
  { id: "understand", label: "Understand", desc: "Understanding your request" },
  { id: "plan", label: "Plan", desc: "Planning application structure" },
  { id: "build", label: "Build", desc: "Creating components and files" },
  { id: "run", label: "Run", desc: "Running the application" },
  { id: "complete", label: "Iterate", desc: "Ready for your next instruction" }, // "complete" and "iterating" map to Iterate visually
];

interface AgentTimelineProps {
  currentState: AgentState;
}

export function AgentTimeline({ currentState }: AgentTimelineProps) {
  const getStepStatus = (stepId: string, index: number) => {
    const stateOrder = ["idle", "understand", "plan", "build", "run", "complete", "iterating"];
    const currentIndex = stateOrder.indexOf(currentState);
    const stepTargetIndex = stateOrder.indexOf(stepId);
    
    // Iterate state special handling
    if (stepId === "complete" && (currentState === "complete" || currentState === "iterating")) {
       return currentState === "iterating" ? "active" : "complete";
    }

    if (currentIndex < stepTargetIndex) return "upcoming";
    if (currentIndex === stepTargetIndex) return "active";
    return "complete";
  };

  return (
    <div className="flex w-full flex-col border-b border-border/40 bg-card/30 p-6 md:w-64 md:border-b-0 md:border-r shrink-0">
      <div className="mb-8 text-xs font-semibold text-foreground uppercase tracking-widest flex items-center gap-2">
        <Cpu className="size-4 text-primary" />
        Agent Task
      </div>
      
      <div className="mb-6">
        <div className="text-sm font-medium text-foreground mb-1">Build a dashboard</div>
        <div className="text-xs text-muted-foreground">User Request</div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id, index);
          const isActive = status === "active";
          const isComplete = status === "complete";
          
          return (
            <div 
              key={step.id} 
              className={cn(
                "flex gap-3 transition-all duration-500",
                isComplete ? "text-muted-foreground" : isActive ? "text-foreground" : "text-muted-foreground/40 opacity-50"
              )}
            >
              <div className="relative flex size-5 items-center justify-center shrink-0 mt-0.5">
                {isComplete ? (
                  <CheckCircle2 className="size-4 text-primary" />
                ) : isActive ? (
                  <CircleDashed className="size-4 animate-spin text-primary" />
                ) : (
                  <Circle className="size-3 text-muted-foreground/30" />
                )}
                
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className={cn(
                    "absolute top-5 bottom-[-16px] left-1/2 w-px -translate-x-1/2",
                    isComplete ? "bg-primary/50" : "bg-border/50"
                  )} />
                )}
              </div>
              
              <div className="flex flex-col">
                <span className={cn("text-sm font-medium", isActive && "text-primary")}>
                  {step.label}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  {step.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
