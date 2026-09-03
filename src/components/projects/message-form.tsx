"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateMessage } from "@/features/messages/hooks/messages";
import { cn } from "@/lib/utils";

/** Maximum allowed length for a single message. */
const MAX_LENGTH = 1000;

/**
 * Auto-growing composer for sending a new message to a project.
 *
 * Validates that the message is non-empty and within {@link MAX_LENGTH},
 * sends it, clears the field on success, and reports outcomes via toasts.
 * Cmd/Ctrl+Enter submits.
 *
 * @param projectId - The project the message is sent to.
 */
export default function MessageForm({ 
  projectId,
  placeholder = "Describe what you want to build...",
  suggestions = []
}: { 
  projectId: string,
  placeholder?: string,
  suggestions?: string[]
}) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { mutateAsync, isPending } = useCreateMessage(projectId);

  /**
   * Validate and send the current message, then reset the input on success.
   */
  async function onSubmit() {
    const trimmed = content.trim();

    if (!trimmed) {
      toast.error("Message description is required");
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      toast.error("Description is too long");
      return;
    }

    try {
      await mutateAsync(trimmed);
      setContent("");
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-3xl pb-6 px-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
        className={cn(
          "relative flex flex-col rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl p-4 shadow-sm transition-all duration-300",
          isFocused ? "border-primary/30 bg-background/80 shadow-primary/5 ring-4 ring-primary/10" : "hover:border-border hover:bg-background/60 hover:shadow-md"
        )}
      >
        {suggestions.length > 0 && !content && !isFocused && (
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                onClick={() => {
                  setContent(suggestion);
                  // We can't safely auto-submit immediately here without waiting for React state, 
                  // but for UX, users often want to review/edit a suggestion before sending.
                  // If we want instant submit, we'd call the mutation directly here.
                  // For now, it populates the textarea cleanly.
                  setTimeout(() => {
                    const el = document.querySelector('textarea');
                    if (el) el.focus();
                  }, 10);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <TextareaAutosize
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={isPending}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          minRows={1}
          maxRows={8}
          className={cn(
            "w-full resize-none border-none bg-transparent text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/60 outline-none",
            isPending && "opacity-50 cursor-not-allowed"
          )}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              // Standard enter to submit, shift+enter for newline
              event.preventDefault();
              void onSubmit();
            }
          }}
        />

        <div className="mt-3 flex flex-wrap items-center justify-end gap-3">
          <Button
            className={cn(
              "h-8 rounded-full px-4 text-xs font-semibold shadow-sm transition-all ml-auto",
              !content.trim() ? "opacity-50" : "hover:scale-105 active:scale-95"
            )}
            disabled={isPending || !content.trim()}
            type="submit"
          >
            {isPending ? (
              <span className="flex items-center gap-2"><Spinner className="size-3" /> Building...</span>
            ) : (
              <span className="flex items-center gap-2">Send <ArrowUpIcon className="size-3" /></span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
