
import { Folder, FolderOpen, FileCode, FileJson, ChevronRight, ChevronDown } from "lucide-react";

export function FilesVisual() {
  return (
    <div className="flex h-[350px] sm:h-[400px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-6 shrink-0">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">Work with real projects.</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          CodePilot doesn't just output a single snippet. It builds proper React architecture with components, layouts, and utilities.
        </p>
      </div>
      
      <div className="relative flex-1 w-full overflow-hidden p-6 pt-0">
        <div className="absolute inset-x-6 bottom-4 top-0 rounded-xl border border-border/40 bg-card shadow-sm p-4 font-mono text-xs overflow-hidden transition-transform duration-700 group-hover:-translate-y-1">
           
           <div className="flex items-center gap-2 text-foreground font-semibold mb-3">
             <ChevronDown className="size-3" />
             <FolderOpen className="size-4 text-blue-500/70" /> 
             my-app
           </div>
           
           <div className="pl-4 space-y-2 border-l border-border/50 ml-1.5">
             {/* app dir */}
             <div className="flex flex-col gap-2">
               <div className="flex items-center gap-2 text-foreground/80 hover:text-foreground cursor-pointer transition-colors">
                 <ChevronDown className="size-3" />
                 <FolderOpen className="size-4 text-blue-500/70" /> 
                 app
               </div>
               <div className="pl-5 space-y-2 border-l border-border/30 ml-1.5">
                 <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                   <FileCode className="size-3.5 text-emerald-500/70" /> 
                   page.tsx
                 </div>
                 <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors bg-primary/10 text-primary py-0.5 px-1 -ml-1 rounded">
                   <FileCode className="size-3.5 text-emerald-500/70" /> 
                   layout.tsx
                 </div>
               </div>
             </div>
             
             {/* components dir */}
             <div className="flex flex-col gap-2 mt-2">
               <div className="flex items-center gap-2 text-foreground/80 hover:text-foreground cursor-pointer transition-colors">
                 <ChevronDown className="size-3" />
                 <FolderOpen className="size-4 text-blue-500/70" /> 
                 components
               </div>
               <div className="pl-5 space-y-2 border-l border-border/30 ml-1.5">
                 <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                   <FileCode className="size-3.5 text-emerald-500/70" /> 
                   navbar.tsx
                 </div>
                 <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                   <FileCode className="size-3.5 text-emerald-500/70" /> 
                   stats-card.tsx
                 </div>
               </div>
             </div>

             {/* config files */}
             <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors mt-2 ml-4">
               <FileJson className="size-3.5 text-amber-500/70" /> 
               package.json
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
