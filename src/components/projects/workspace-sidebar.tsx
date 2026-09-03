"use client";

import { useMemo } from "react";
import { FolderGit2 } from "lucide-react";
import { TreeView } from "./tree-view";
import { convertFilesToTreeItems } from "@/lib/utils";

interface WorkspaceSidebarProps {
  files?: Record<string, string>;
  selectedFile: string | null;
  onSelectFile: (filePath: string) => void;
}

export function WorkspaceSidebar({ files, selectedFile, onSelectFile }: WorkspaceSidebarProps) {
  const treeData = useMemo(() => {
    if (!files || Object.keys(files).length === 0) return [];
    return convertFilesToTreeItems(files);
  }, [files]);

  return (
    <div className="flex h-full flex-col bg-background/50 border-r border-border/40 min-w-[180px]">
      <div className="flex h-12 shrink-0 items-center justify-between px-4 border-b border-border/40">
        <h3 className="text-[11px] font-semibold text-foreground uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
          Project Files
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {treeData.length > 0 ? (
          <TreeView
            data={treeData}
            value={selectedFile}
            onSelect={onSelectFile}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center p-4 text-muted-foreground">
            <FolderGit2 className="size-8 mb-3 opacity-20" />
            <p className="text-xs font-medium">No files yet</p>
            <p className="text-[10px] mt-1 opacity-60">Generate an app to see files</p>
          </div>
        )}
      </div>
    </div>
  );
}
