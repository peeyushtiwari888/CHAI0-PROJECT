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
  const [tabState, setTabState] = useState<"preview" | "code">("preview");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Auto-switch to Code tab when a file is selected
  const handleSelectFile = (filePath: string) => {
    setSelectedFile(filePath);
    if (tabState !== "code") {
      setTabState("code");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Workspace Header - Full Width */}
      <ProjectHeader projectId={projectId} />

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal" className="h-full">
          {/* Left Panel: File Explorer */}
          <ResizablePanel
            defaultSize={18}
            minSize={12}
            maxSize={30}
            className="flex flex-col min-w-[200px]"
          >
            <WorkspaceSidebar 
              files={activeFragment?.files}
              selectedFile={selectedFile}
              onSelectFile={handleSelectFile}
            />
          </ResizablePanel>

          <ResizableHandle className="w-px bg-border hover:bg-primary/40 transition-colors" />

          {/* Center Panel: AI Chat */}
          <ResizablePanel
            defaultSize={35}
            minSize={25}
            maxSize={50}
            className="flex flex-col bg-muted/10 relative"
          >
            <MessageContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </ResizablePanel>

          <ResizableHandle className="w-px bg-border hover:bg-primary/40 transition-colors" />

          {/* Right Panel: Preview & Code */}
          <ResizablePanel defaultSize={47} minSize={30} className="flex flex-col">
            <WorkspacePreview
              activeFragment={activeFragment}
              selectedFile={selectedFile}
              tabState={tabState}
              setTabState={setTabState}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}