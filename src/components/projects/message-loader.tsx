import { CodePilotMark } from "@/components/brand/codepilot-logo";
import { cn } from "@/lib/utils";

/**
 * Placeholder assistant message shown while a response is being generated.
 * Provides a simple loading state without fabricating progress.
 */
export default function MessageLoading() {
  return (
    <div className="group flex w-full flex-col px-4 py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 animate-pulse">
            <CodePilotMark className="h-4 w-auto" />
          </div>
          <div className="flex flex-col">
             <span className="text-[13px] font-semibold text-foreground flex items-center gap-1.5">
               <span className="text-primary/70">✦</span> CodePilot is working
             </span>
             <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
               <span className="size-1.5 rounded-full bg-primary animate-pulse" /> Generating response...
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
