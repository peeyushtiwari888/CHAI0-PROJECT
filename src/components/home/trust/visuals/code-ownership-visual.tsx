
import { Download, Copy, Code2 } from "lucide-react";

export function CodeOwnershipVisual() {
  return (
    <div className="flex h-[350px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-6 shrink-0">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">You own the output.</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          No vendor lock-in. The generated React components and logic are yours to copy, export, and use anywhere.
        </p>
      </div>
      
      <div className="relative flex-1 w-full p-4 overflow-hidden">
        <div className="absolute inset-x-4 bottom-0 top-0 rounded-t-xl border border-border/40 bg-card shadow-sm flex flex-col overflow-hidden transition-transform duration-700 group-hover:-translate-y-1">
           
           {/* Code Toolbar */}
           <div className="h-10 border-b border-border/40 bg-muted/30 flex items-center justify-between px-3">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                 <Code2 className="size-3.5" /> page.tsx
              </div>
              <div className="flex gap-2">
                 <div className="flex items-center gap-1.5 px-2 py-1 bg-background border border-border rounded-md text-[10px] text-foreground cursor-pointer hover:bg-muted transition-colors">
                    <Copy className="size-3" /> Copy
                 </div>
                 <div className="flex items-center gap-1.5 px-2 py-1 bg-primary text-primary-foreground rounded-md text-[10px] cursor-pointer hover:opacity-90 transition-opacity">
                    <Download className="size-3" /> Export Zip
                 </div>
              </div>
           </div>

           {/* Code Snippet */}
           <div className="p-4 text-xs font-mono text-muted-foreground leading-relaxed overflow-hidden bg-background/50 flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card z-10 pointer-events-none" />
              <p><span className="text-pink-500/80">export default function</span> App() {"{"}</p>
              <p className="pl-4"><span className="text-pink-500/80">return</span> (</p>
              <p className="pl-8">&lt;<span className="text-blue-500/80">div</span> className=<span className="text-amber-500/80">"min-h-screen"</span>&gt;</p>
              <p className="pl-12">&lt;<span className="text-emerald-500/80">Navbar</span> /&gt;</p>
              <p className="pl-12">&lt;<span className="text-blue-500/80">main</span> className=<span className="text-amber-500/80">"p-4"</span>&gt;</p>
              <p className="pl-16">Hello World</p>
              <p className="pl-12">&lt;/<span className="text-blue-500/80">main</span>&gt;</p>
              <p className="pl-8">&lt;/<span className="text-blue-500/80">div</span>&gt;</p>
              <p className="pl-4">);</p>
              <p>{"}"}</p>
           </div>

        </div>
      </div>
    </div>
  );
}
