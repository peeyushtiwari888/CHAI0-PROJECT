"use client";

import { Response } from "@/components/ai-elements/response";
import { Card } from "@/components/ui/card";
import {
  parseFragmentFiles,
  type ProjectFragment,
} from "@/features/projects/fragment-types";
import { cn } from "@/lib/utils";
import type { Fragment } from "@/generated/prisma/client";
import { MessageRole, MessageType } from "@/generated/prisma/enums";
import { format } from "date-fns";
import { ChevronRightIcon, Code2Icon, FileCode2Icon, CheckCircle2Icon } from "lucide-react";
import { CodePilotMark } from "@/components/brand/codepilot-logo";

function AgentActivityBlock({ files }: { files: Record<string, string> }) {
  const filePaths = Object.keys(files);
  if (filePaths.length === 0) return null;

  return (
    <details className="group overflow-hidden rounded-xl border border-border/50 bg-background/50 shadow-sm mt-4 transition-all">
      <summary className="flex cursor-pointer items-center justify-between bg-muted/30 px-4 py-3 hover:bg-muted/50 focus:outline-none">
        <div className="flex items-center gap-2">
          <CheckCircle2Icon className="size-4 text-emerald-500" />
          <span className="text-sm font-medium text-foreground">Generated {filePaths.length} file{filePaths.length > 1 ? 's' : ''}</span>
        </div>
        <ChevronRightIcon className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
      </summary>
      <div className="border-t border-border/50 bg-background px-4 py-3">
        <ul className="flex flex-col gap-2">
          {filePaths.map((path) => (
            <li key={path} className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileCode2Icon className="size-3.5 text-primary/70" />
              <span className="font-mono text-xs">{path}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

/**
 * Clickable card representing a generated fragment inside an assistant message.
 *
 * Highlights itself when it is the active fragment and notifies the parent (with
 * the fragment's files parsed) when clicked.
 *
 * @param fragment - The fragment record to display.
 * @param isActiveFragment - Whether this fragment is currently selected.
 * @param onFragmentClick - Called with the parsed fragment when clicked.
 */
function FragmentCard({
  fragment,
  isActiveFragment,
  onFragmentClick,
}: {
  fragment: Fragment;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group flex w-full max-w-md items-center gap-4 rounded-xl border bg-background/50 p-4 text-start shadow-sm transition-all hover:shadow-md hover:bg-muted/50",
        isActiveFragment ? "border-primary/50 ring-1 ring-primary/50 shadow-primary/10" : "border-border/50"
      )}
      onClick={() =>
        onFragmentClick({
          ...fragment,
          files: parseFragmentFiles(fragment.files),
        })
      }
    >
      <div className={cn(
        "flex size-10 items-center justify-center rounded-lg transition-colors",
        isActiveFragment ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground group-hover:bg-muted-foreground/10"
      )}>
        <Code2Icon className="size-5" />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <span className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {fragment.title}
        </span>
        <span className="text-xs text-muted-foreground truncate">
          Click to inspect generated code
        </span>
      </div>
      
      <div className={cn(
         "flex size-6 items-center justify-center rounded-full transition-all",
         isActiveFragment ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
      )}>
         <ChevronRightIcon className="size-3.5" />
      </div>
    </button>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex w-full min-w-0 justify-end py-6 px-4">
      <div className="max-w-[85%] rounded-2xl bg-primary/10 px-5 py-3.5 text-[15px] leading-relaxed text-foreground shadow-sm break-words whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}

/**
 * A message rendered by the assistant.
 *
 * Shows the codepilot mark, a hover-revealed timestamp, the markdown response, and —
 * for successful results — a {@link FragmentCard} linking to the generated app.
 * Error-type messages are styled in red.
 *
 * @param content - The assistant's message text (markdown).
 * @param fragment - Associated fragment, or `null` if none.
 * @param createdAt - When the message was created.
 * @param isActiveFragment - Whether this message's fragment is selected.
 * @param onFragmentClick - Called when the fragment card is clicked.
 * @param type - The message type (e.g. RESULT or ERROR).
 */
function AssistantMessage({
  content,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: {
  content: string;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
  type: MessageType;
}) {
  return (
    <div
      className={cn(
        "group flex w-full min-w-0 flex-col px-4 py-8 bg-muted/5 border-y border-border/20",
        type === MessageType.ERROR && "bg-red-500/5 border-red-500/20"
      )}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 shadow-sm border border-primary/20">
            <CodePilotMark className="h-4 w-auto" />
          </div>
          <div className="flex flex-col">
             <span className="text-sm font-semibold text-foreground">CodePilot Agent</span>
             <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
               {format(new Date(createdAt), "HH:mm")}
             </span>
          </div>
        </div>

        <div className="flex flex-col min-w-0 gap-y-6 pl-11">
          <div className={cn(
             "prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:my-0 prose-pre:overflow-x-auto text-[15px]",
             type === MessageType.ERROR && "text-red-500"
          )}>
            <Response>{content}</Response>
          </div>
          
          {fragment && type === MessageType.RESULT && (
            <div className="mt-4 flex flex-col gap-3">
              <AgentActivityBlock files={parseFragmentFiles(fragment.files)} />
              <FragmentCard
                fragment={fragment}
                isActiveFragment={isActiveFragment}
                onFragmentClick={onFragmentClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a single chat message, dispatching to the assistant or user variant
 * based on `role`.
 *
 * @param content - The message text.
 * @param role - Who authored the message (USER or ASSISTANT).
 * @param fragment - Associated fragment, or `null`.
 * @param createdAt - When the message was created.
 * @param isActiveFragment - Whether this message's fragment is selected.
 * @param onFragmentClick - Called when the fragment card is clicked.
 * @param type - The message type (e.g. RESULT or ERROR).
 */
export default function MessageCard({
  content,
  role,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: {
  content: string;
  role: MessageRole;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
  type: MessageType;
}) {
  if (role === MessageRole.ASSISTANT) {
    return (
      <AssistantMessage
        content={content}
        fragment={fragment}
        createdAt={createdAt}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
        type={type}
      />
    );
  }

  return (
    <div className="w-full">
      <UserMessage content={content} />
    </div>
  );
}
