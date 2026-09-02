"use client";

import { Fragment, useState, useCallback } from "react";
import { CopyIcon, CopyCheckIcon, EyeIcon, Code, TerminalSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
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
  selectedFile: string | null;
  tabState: "preview" | "code";
  setTabState: (val: "preview" | "code") => void;
}

export function WorkspacePreview({ activeFragment, selectedFile, tabState, setTabState }: WorkspacePreviewProps) {
  const [copied, setCopied] = useState(false);

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
    <div className="flex h-full flex-col bg-background">
      <Tabs
        className="flex h-full flex-col"
        value={tabState}
        onValueChange={(value) => setTabState(value as "preview" | "code")}
      >
        <div className="flex h-10 w-full shrink-0 items-end border-b border-border/40 px-2 bg-muted/20">
          <TabsList className="flex h-10 items-center justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-3 text-sm font-medium text-muted-foreground transition-none hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              <div className="flex items-center gap-2">
                <EyeIcon className="size-3.5" />
                <span>Preview</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-3 text-sm font-medium text-muted-foreground transition-none hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
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
          className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
        >
          {activeFragment ? (
            <FragmentWeb data={activeFragment} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground p-4 text-center">
              <TerminalSquare className="size-12 mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-foreground mb-2">No preview available</h3>
              <p className="text-sm">Describe what you want to build to see a live preview.</p>
            </div>
          )}
        </TabsContent>

        {/* CODE TAB */}
        <TabsContent
          value="code"
          className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden bg-[#0a0a0a]"
        >
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
