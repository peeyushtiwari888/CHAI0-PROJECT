import { useEffect, useState } from "react";
import { TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentTerminalProps {
  isActive: boolean;
}

export function AgentTerminal({ isActive }: AgentTerminalProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (isActive) {
      setLogs([]);
      setShowCursor(true);
      
      const sequence = [
        { text: "$ npm run dev", delay: 200 },
        { text: "> chai0-app@0.1.0 dev", delay: 600 },
        { text: "> next dev", delay: 800 },
        { text: "▲ Next.js 14.1.0", delay: 1200 },
        { text: "- Local:        http://localhost:3000", delay: 1300 },
        { text: "- Environments: .env.local", delay: 1400 },
        { text: " ", delay: 1500 },
        { text: "✓ Ready in 1250ms", delay: 2200 },
        { text: "○ Compiling /page ...", delay: 2400 },
        { text: "✓ Compiled /page in 451ms (243 modules)", delay: 3000 },
      ];

      const timeouts = sequence.map((item) => {
        return setTimeout(() => {
          setLogs((prev) => [...prev, item.text]);
          if (item.text.includes("Compiled")) {
            setShowCursor(false);
          }
        }, item.delay);
      });

      return () => timeouts.forEach(clearTimeout);
    } else {
      setLogs([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500 m-4 border border-white/5 font-mono">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-[#1a1a1a] text-white/50 text-xs">
        <TerminalSquare className="size-3" /> Terminal
      </div>
      
      <div className="flex-1 p-4 text-xs leading-loose text-white/80 overflow-y-auto">
        {logs.map((log, i) => (
          <div 
            key={i} 
            className={cn(
              "animate-in fade-in duration-100",
              log.startsWith("▲") ? "text-white font-bold" : "",
              log.startsWith("✓") ? "text-emerald-400" : "",
              log.startsWith("$") ? "text-blue-400" : "",
            )}
          >
            {log}
          </div>
        ))}
        {showCursor && (
          <div className="inline-block w-2 h-3 bg-white/70 animate-pulse ml-1" />
        )}
      </div>
    </div>
  );
}
