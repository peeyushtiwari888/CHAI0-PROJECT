"use client";

import { Fragment, useState, useCallback, useEffect } from "react";
import { CopyIcon, CopyCheckIcon, EyeIcon, Code, TerminalSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CodeView } from "./code-view";
import FragmentWeb from "./fragment-web";
import type { ProjectFragment } from "@/features/projects/fragment-types";

function FileBreadcrumb({ filePath }: { filePath: string }) {
  const pathSegments = filePath.split("/");
  const maxSegments = 4;

  if (pathSegments.length <= maxSegments) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            return (
              <Fragment key={`${segment}-${index}`}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  ) : (
                    <span className="text-muted-foreground">{segment}</span>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const firstSegment = pathSegments[0];
  const lastSegment = pathSegments[pathSegments.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <span className="text-muted-foreground">{firstSegment}</span>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="font-medium">{lastSegment}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function getLanguageFromExtension(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    js: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    py: "python",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
  };
  return languageMap[extension || ""] || "text";
}

interface WorkspacePreviewProps {
  activeFragment: ProjectFragment | null;
}

export function WorkspacePreview({ activeFragment }: WorkspacePreviewProps) {
  const [tabState, setTabState] = useState<"preview" | "code">("preview");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (activeFragment?.id) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 2000);
      return () => clearTimeout(t);
    }
  }, [activeFragment?.id]);

  const handleSelectFile = useCallback((filePath: string) => {
    setSelectedFile(filePath);
  }, []);

  const handleCopy = useCallback(() => {
    if (selectedFile && activeFragment?.files?.[selectedFile]) {
      navigator.clipboard
        .writeText(activeFragment.files[selectedFile])
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((copyError) => {
          console.error("Failed to copy:", copyError);
        });
    }
  }, [selectedFile, activeFragment]);

  const hasFiles = activeFragment?.files && Object.keys(activeFragment.files).length > 0;

  return (
    <div className="flex h-full flex-col bg-background min-w-[350px]">
      <Tabs
        className="flex h-full flex-col"
        value={tabState}
        onValueChange={(value) => setTabState(value as "preview" | "code")}
      >
        <div className="flex h-12 w-full shrink-0 items-center border-b border-border/40 px-4 bg-background">
          <TabsList className="flex h-8 items-center justify-start rounded-md bg-muted/40 p-0.5 border border-border/50">
            <TabsTrigger
              value="preview"
              className="relative h-7 rounded-sm px-3 text-xs font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500/80" />
                <span>Preview</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-7 rounded-sm px-3 text-xs font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Code className="size-3.5" />
                <span>Code</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* PREVIEW TAB */}
        <TabsContent
          value="preview"
          className={cn(
            "mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden transition-all duration-1000",
            pulse && "shadow-[inset_0_0_0_2px_rgba(var(--primary),0.5)] bg-primary/5"
          )}
        >
          {activeFragment ? (
            <FragmentWeb data={activeFragment} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground p-6 text-center bg-muted/5">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm">
                <TerminalSquare className="size-5 text-muted-foreground/60" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">No preview available</h3>
              <p className="text-xs text-muted-foreground max-w-[250px]">Describe what you want to build to see a live preview.</p>
              <p className="text-[11px] text-muted-foreground/60 mt-4">Start by describing your application in the AI chat.</p>
            </div>
          )}
        </TabsContent>

        {/* CODE TAB */}
        <TabsContent
          value="code"
          className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden bg-background"
        >
          <div className="flex h-full w-full">
            <div className="w-[240px] shrink-0 border-r border-border/40 hidden md:block h-full">
              <WorkspaceSidebar 
                files={activeFragment?.files}
                selectedFile={selectedFile}
                onSelectFile={handleSelectFile}
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col bg-[#0a0a0a]">
              {hasFiles && selectedFile && activeFragment.files[selectedFile] ? (
                <div className="flex h-full flex-col bg-[#0a0a0a]">
                  <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 bg-[#0a0a0a] px-4">
                    <FileBreadcrumb filePath={selectedFile} />
                    <Hint text="Copy code" side="bottom">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <CopyCheckIcon className="size-4 text-emerald-500" />
                        ) : (
                          <CopyIcon className="size-4" />
                        )}
                      </Button>
                    </Hint>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto p-4">
                    <CodeView
                      code={activeFragment.files[selectedFile]}
                      lang={getLanguageFromExtension(selectedFile)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-muted-foreground p-4 text-center bg-background">
                  <Code className="size-12 mb-4 opacity-20" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Code Viewer</h3>
                  <p className="text-sm">Select a file from the explorer to view its contents.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
