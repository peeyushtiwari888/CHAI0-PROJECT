"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="flex h-[100dvh] flex-col bg-background overflow-hidden">
      {/* Workspace Header - Full Width */}
      <ProjectHeader projectId={projectId} />

      <div className="flex-1 min-h-0 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
          {/* Left Panel: AI Agent (Process) */}
          <ResizablePanel
            defaultSize={35}
            minSize={30}
            maxSize={60}
            className="flex flex-col bg-muted/10 relative min-w-0 min-h-0 overflow-hidden"
          >
            <MessageContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </ResizablePanel>

          <ResizableHandle className="w-px bg-border hover:bg-primary/40 transition-colors" />

          {/* Right Panel: Preview & Code */}
          <ResizablePanel defaultSize={65} minSize={30} className="flex flex-col min-w-0 min-h-0 overflow-hidden">
            <WorkspacePreview
              activeFragment={activeFragment}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}