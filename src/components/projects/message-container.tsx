"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import {
  parseFragmentFiles,
  type ProjectFragment,
} from "@/features/projects/fragment-types";
import {
  prefetchMessages,
  useGetMessages,
} from "@/features/messages/hooks/messages";
import { MessageRole } from "@/generated/prisma/enums";
import MessageCard from "./message-card";
import MessageForm from "./message-form";
import MessageLoading from "./message-loader";
import { CodePilotMark } from "@/components/brand/codepilot-logo";
import { AlertCircle, CheckCircle2Icon } from "lucide-react";

/**
 * Scrollable list of a project's messages plus the composer.
 *
 * Loads (and polls) messages, prefetches them on mount, auto-selects the latest
 * assistant fragment, auto-scrolls to the newest message, and shows a loading
 * indicator while the assistant is responding to the last user message. Handles
 * loading, error, and empty states.
 *
 * @param projectId - The project whose conversation is shown.
 * @param activeFragment - The currently selected fragment (for preview/code).
 * @param setActiveFragment - Setter to change the active fragment.
 */
export default function MessageContainer({
  projectId,
  activeFragment,
  setActiveFragment,
}: {
  projectId: string;
  activeFragment: ProjectFragment | null;
  setActiveFragment: (fragment: ProjectFragment | null) => void;
}) {
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageIdRef = useRef<string | null>(null);

  const {
    data: messages,
    isPending,
    isError,
    error,
  } = useGetMessages(projectId);

  useEffect(() => {
    if (projectId) {
      void prefetchMessages(queryClient, projectId);
    }
  }, [projectId, queryClient]);

  useEffect(() => {
    const lastAssistantMessage = messages?.findLast(
      (message: any) => message.role === MessageRole.ASSISTANT
    );

    if (
      lastAssistantMessage?.fragments &&
      lastAssistantMessage.id !== lastAssistantMessageIdRef.current
    ) {
      setActiveFragment({
        ...lastAssistantMessage.fragments,
        files: parseFragmentFiles(lastAssistantMessage.fragments.files),
      });
      lastAssistantMessageIdRef.current = lastAssistantMessage.id;
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner className="text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center p-6 w-full min-w-[300px]">
        <div className="flex flex-col items-center text-center w-full max-w-sm overflow-hidden">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 shrink-0">
            <AlertCircle className="size-6 text-destructive" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Something went wrong</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error?.message || "We couldn't load your project messages."}
          </p>
          <p className="text-xs text-muted-foreground/60">
            Please try refreshing the page or navigating back to your dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 flex-col min-w-[300px]">
        <div className="flex flex-1 flex-col items-center justify-center text-center p-6 text-muted-foreground">
          <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 shadow-sm border border-primary/20">
             <CodePilotMark className="h-6 w-auto" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">What do you want to build?</h3>
          <p className="max-w-md text-sm text-muted-foreground/80 leading-relaxed">
            Describe your idea and CodePilot will help you turn it into a working full-stack application.
          </p>
        </div>
        <div className="relative pt-1">
          <div className="pointer-events-none absolute -top-8 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-background/50" />
          <MessageForm 
            projectId={projectId} 
            placeholder="Describe what you want to build..."
            suggestions={[
              "Create a modern SaaS analytics dashboard",
              "Build a responsive landing page",
              "Design a personal portfolio with a blog"
            ]}
          />
        </div>
      </div>
    );
  }

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage.role === MessageRole.USER;

  return (
    <div className="flex min-h-0 flex-1 flex-col relative min-w-[300px]">
      {/* AI Agent Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border/40 px-4 bg-background z-10">
        <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
          <span className="text-primary/70">✦</span> CodePilot Agent
        </h3>
        <div className="flex items-center gap-2">
          {isLastMessageUser ? (
             <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
               <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Building
             </span>
          ) : (
             <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
               <CheckCircle2Icon className="size-3 text-muted-foreground/50" />
               Ready
             </span>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-10">
        {messages.map((message: any) => (
          <MessageCard
            key={message.id}
            content={message.content}
            role={message.role}
            fragment={message.fragments}
            createdAt={message.createdAt}
            isActiveFragment={activeFragment?.id === message.fragments?.id}
            onFragmentClick={setActiveFragment}
            type={message.type}
          />
        ))}
        {isLastMessageUser && (
          <div className="px-4 py-8 bg-muted/5 border-y border-border/20">
             <div className="mx-auto flex w-full max-w-3xl">
                <MessageLoading />
             </div>
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>

      <div className="relative shrink-0 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent">
        <MessageForm 
          projectId={projectId} 
          placeholder="Ask CodePilot to change your application..."
          suggestions={isLastMessageUser ? [] : [
            "Add mobile responsiveness",
            "Improve the layout",
            "Add a dark mode toggle"
          ]}
        />
      </div>
    </div>
  );
}
