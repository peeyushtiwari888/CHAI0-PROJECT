import { useEffect, useState } from "react";
import { Code2, File, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCodePanelProps {
  isActive: boolean;
}

export function AgentCodePanel({ isActive }: AgentCodePanelProps) {
  const [visibleFiles, setVisibleFiles] = useState<number>(0);
  const [codeLines, setCodeLines] = useState<number>(0);

  useEffect(() => {
    if (isActive) {
      let fileTimer: NodeJS.Timeout;
      let codeTimer: NodeJS.Timeout;

      const runAnimation = () => {
        // Sequentially show files
        [1, 2, 3, 4].forEach((val, i) => {
          setTimeout(() => setVisibleFiles(val), (i + 1) * 300);
        });

        // Sequentially show code lines after files are created
        codeTimer = setTimeout(() => {
          [1, 2, 3, 4, 5, 6].forEach((val, i) => {
            setTimeout(() => setCodeLines(val), (i + 1) * 150);
          });
        }, 1500);
      };

      runAnimation();

      return () => {
        clearTimeout(fileTimer);
        clearTimeout(codeTimer);
      };
    } else {
      setVisibleFiles(0);
      setCodeLines(0);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500 m-4 border border-white/10">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-[#2d2d2d] text-white/50 text-xs">
        <Code2 className="size-3" /> Workspace
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* File Tree */}
        <div className="w-1/3 border-r border-white/10 p-4 font-mono text-[10px] text-white/60">
          <div className="flex items-center gap-2 mb-2 text-white/80">
            <FolderOpen className="size-3" /> src/
          </div>
          
          <div className="pl-4 space-y-2">
            <div className={cn("flex items-center gap-2 transition-opacity duration-300", visibleFiles >= 1 ? "opacity-100" : "opacity-0")}>
              <FolderOpen className="size-3" /> components/
            </div>
            
            <div className="pl-4 space-y-2">
              <div className={cn("flex items-center gap-2 text-[#4ec9b0] transition-opacity duration-300", visibleFiles >= 2 ? "opacity-100" : "opacity-0")}>
                <File className="size-3" /> sidebar.tsx
              </div>
              <div className={cn("flex items-center gap-2 text-[#4ec9b0] transition-opacity duration-300", visibleFiles >= 3 ? "opacity-100" : "opacity-0")}>
                <File className="size-3" /> stats-card.tsx
              </div>
            </div>
            
            <div className={cn("flex items-center gap-2 mt-2 transition-opacity duration-300", visibleFiles >= 4 ? "opacity-100" : "opacity-0")}>
              <FolderOpen className="size-3" /> app/
            </div>
            <div className="pl-4 space-y-2">
               <div className={cn("flex items-center gap-2 text-[#ce9178] bg-white/10 px-1 -ml-1 rounded transition-opacity duration-300", visibleFiles >= 4 ? "opacity-100" : "opacity-0")}>
                <File className="size-3" /> page.tsx
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 p-4 font-mono text-xs leading-relaxed overflow-hidden bg-[#1e1e1e]">
           <div className={cn("transition-opacity duration-300", visibleFiles >= 4 ? "opacity-100" : "opacity-0")}>
              {codeLines >= 1 && <div className="animate-in slide-in-from-left-2 duration-200"><span className="text-[#c586c0]">export default function</span> <span className="text-[#dcdcaa]">Dashboard</span>() {"{"}</div>}
              {codeLines >= 2 && <div className="pl-4 animate-in slide-in-from-left-2 duration-200"><span className="text-[#c586c0]">return</span> (</div>}
              {codeLines >= 3 && <div className="pl-8 animate-in slide-in-from-left-2 duration-200">&lt;<span className="text-[#569cd6]">div</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">"flex h-screen bg-gray-50"</span>&gt;</div>}
              {codeLines >= 4 && <div className="pl-12 animate-in slide-in-from-left-2 duration-200">&lt;<span className="text-[#4ec9b0]">Sidebar</span> /&gt;</div>}
              {codeLines >= 5 && <div className="pl-12 animate-in slide-in-from-left-2 duration-200">&lt;<span className="text-[#4ec9b0]">MainContent</span> /&gt;</div>}
              {codeLines >= 6 && <div className="pl-8 animate-in slide-in-from-left-2 duration-200">&lt;/<span className="text-[#569cd6]">div</span>&gt;</div>}
              {codeLines >= 2 && <div className="pl-4 animate-in slide-in-from-left-2 duration-200">);</div>}
              {codeLines >= 1 && <div className="animate-in slide-in-from-left-2 duration-200">{"}"}</div>}
              
              {codeLines < 6 && codeLines > 0 && <div className="w-2 h-4 bg-white/50 animate-pulse ml-8 mt-1" />}
           </div>
        </div>
      </div>
    </div>
  );
}
