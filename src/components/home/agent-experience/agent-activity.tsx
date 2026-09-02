import { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";
import type { AgentState } from "./agent-timeline";

interface AgentActivityProps {
  currentState: AgentState;
}

const activityLogs: Record<AgentState, string[]> = {
  idle: ["Waiting for instructions..."],
  understand: [
    "Analyzing user request...",
    "Extracting core requirements...",
    "Identifying 'dashboard' pattern...",
  ],
  plan: [
    "Planning application structure...",
    "Designing component hierarchy...",
    "Selecting Tailwind utilities...",
    "Determining necessary state hooks...",
  ],
  build: [
    "Creating layout components...",
    "Implementing responsive grid...",
    "Adding KPI cards...",
    "Wiring up mock data...",
    "Writing styling layer...",
  ],
  run: [], // Handled by terminal panel
  complete: [
    "Checking for errors...",
    "Application ready.",
  ],
  iterating: [
    "USER: 'Make the dashboard more minimal.'",
    "Analyzing new request...",
    "Updating layout spacing...",
    "Refining color palette...",
    "Deploying updates...",
  ]
};

export function AgentActivity({ currentState }: AgentActivityProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentState === "idle") {
      setLogs(activityLogs.idle);
      return;
    }
    
    if (currentState === "run") {
       return; // terminal takes over
    }

    const currentMessages = activityLogs[currentState] || [];
    let timeoutIds: NodeJS.Timeout[] = [];
    
    // Add messages sequentially
    currentMessages.forEach((msg, index) => {
      const id = setTimeout(() => {
        setLogs(prev => [...prev, msg]);
      }, (index + 1) * (400 + Math.random() * 200)); // slightly randomized typing delay
      timeoutIds.push(id);
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [currentState]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-background/30 p-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-muted-foreground/50 mb-4 px-2 uppercase tracking-widest text-[10px] font-sans">
        <Terminal className="size-3" /> Activity Feed
      </div>
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-2 space-y-3"
      >
        {logs.map((log, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {log.startsWith("USER:") ? (
              <span className="text-primary font-semibold">{log}</span>
            ) : (
              <span className="text-muted-foreground">{log}</span>
            )}
          </div>
        ))}
        {currentState !== "idle" && currentState !== "complete" && currentState !== "run" && (
           <div className="animate-pulse text-muted-foreground/50">_</div>
        )}
      </div>
    </div>
  );
}
