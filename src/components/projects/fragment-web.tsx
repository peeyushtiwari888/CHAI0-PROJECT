"use client";

import { useState, useEffect } from "react";
import { ExternalLink, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import type { ProjectFragment } from "@/features/projects/fragment-types";

/**
 * Live preview of a generated fragment running in its E2B sandbox.
 *
 * Embeds the sandbox URL in a sandboxed `<iframe>` and provides controls to
 * refresh the preview, copy the URL, and open it in a new tab.
 *
 * @param data - The fragment to preview (provides `sandboxUrl` and `title`).
 */
export default function FragmentWeb({ data }: { data: ProjectFragment }) {
  const [fragmentKey, setFragmentKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Force the preview iframe to reload by changing its `key`.
   */
  function onRefresh() {
    setIsLoading(true);
    setFragmentKey((prev) => prev + 1);
  }

  /**
   * Copy the sandbox URL to the clipboard and briefly show a "Copied" state.
   */
  function onCopy() {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  // Update loading state when data changes (new URL)
  useEffect(() => {
    setIsLoading(true);
  }, [data.sandboxUrl]);

  return (
    <div className="flex h-full w-full flex-col bg-muted/20 p-4">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-background shadow-lg">
        {/* Browser Chrome Header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border/50 bg-muted/30 px-4">
          
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5 w-20">
            <div className="size-3 rounded-full bg-red-500/80 border border-red-500/20" />
            <div className="size-3 rounded-full bg-amber-500/80 border border-amber-500/20" />
            <div className="size-3 rounded-full bg-emerald-500/80 border border-emerald-500/20" />
          </div>

          {/* Address Bar */}
          <div className="flex h-7 flex-1 max-w-md items-center justify-center rounded-md bg-background/80 border border-border/50 px-2 shadow-sm relative">
            <span className="text-[11px] font-medium text-muted-foreground truncate max-w-[200px]">
              {data.sandboxUrl ? new URL(data.sandboxUrl).hostname : "preview.localhost"}
            </span>
          </div>

          {/* Toolbar Actions */}
          <div className="flex items-center justify-end gap-1 w-20">
            <Hint text="Refresh" side="bottom" align="end">
              <Button size="icon" variant="ghost" className="size-7 hover:bg-muted" onClick={onRefresh}>
                <RefreshCcw className="size-3.5 text-muted-foreground" />
              </Button>
            </Hint>
            <Hint text="Open in new tab" side="bottom" align="end">
              <Button
                size="icon"
                variant="ghost"
                className="size-7 hover:bg-muted"
                onClick={() => {
                  if (!data.sandboxUrl) return;
                  window.open(data.sandboxUrl, "_blank");
                }}
              >
                <ExternalLink className="size-3.5 text-muted-foreground" />
              </Button>
            </Hint>
          </div>
        </div>

        {/* Browser Content */}
        <div className="relative flex-1 bg-white dark:bg-zinc-950">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-pulse">
               <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin mb-4" />
               <p className="text-sm font-medium text-muted-foreground">Starting Sandbox...</p>
            </div>
          )}
          
          <iframe
            key={fragmentKey}
            className="h-full w-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
            src={data.sandboxUrl}
            title={data.title}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
