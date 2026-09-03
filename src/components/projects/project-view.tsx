"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fragment } from "@/generated/prisma/client";
import ProjectHeader from "./project-header";
import MessageContainer from "./message-container";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { WorkspacePreview } from "./workspace-preview";

export type ProjectFragment = Fragment & {
    files: Record<string, string>;
  };

export function ProjectView({ projectId }: { projectId: string }) {
  const [activeFragment, setActiveFragment] = useState<ProjectFragment | null>(null);
  const [mobileTab, setMobileTab] = useState<"chat" | "app">("chat");

  return (
    <div className="flex h-[100dvh] flex-col bg-background overflow-hidden">
      {/* Workspace Header - Full Width */}
      <ProjectHeader projectId={projectId} />

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {/* Mobile Navigation */}
        <div className="flex md:hidden h-14 shrink-0 border-b border-border/40 bg-background items-center px-4 z-20">
          <div className="flex w-full items-center gap-1 rounded-lg bg-muted/40 p-1">
             <button 
               onClick={() => setMobileTab('chat')} 
               className={cn("flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all", mobileTab === 'chat' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
             >
               AI Chat
             </button>
             <button 
               onClick={() => setMobileTab('app')} 
               className={cn("flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all", mobileTab === 'app' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
             >
               Application
             </button>
          </div>
        </div>

        <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
          {/* Left Panel: AI Agent (Process) */}
          <ResizablePanel
            defaultSize={35}
            minSize={30}
            maxSize={60}
            className={cn(
              "flex flex-col bg-muted/10 relative min-w-0 min-h-0 overflow-hidden transition-none",
              mobileTab === 'chat' ? "max-md:!flex max-md:!w-full max-md:!flex-1" : "max-md:!hidden"
            )}
          >
            <MessageContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </ResizablePanel>

          <ResizableHandle 
            withHandle 
            className="hidden md:flex w-px bg-border hover:bg-primary/40 hover:w-1 transition-all duration-300 ease-in-out cursor-col-resize active:bg-primary/60" 
          />

          {/* Right Panel: Preview & Code */}
          <ResizablePanel 
            defaultSize={65} 
            minSize={30} 
            className={cn(
              "flex flex-col min-w-0 min-h-0 overflow-hidden transition-none",
              mobileTab === 'app' ? "max-md:!flex max-md:!w-full max-md:!flex-1" : "max-md:!hidden"
            )}
          >
            <WorkspacePreview
              activeFragment={activeFragment}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}