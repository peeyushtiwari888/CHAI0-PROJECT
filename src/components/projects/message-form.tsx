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
        className="relative flex flex-col rounded-xl border border-border/60 bg-background p-3 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20"
      >
        {suggestions.length > 0 && !content && !isFocused && (
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-border/40 bg-muted/20 text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
                onClick={() => {
                  setContent(suggestion);
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
            "w-full resize-none border-none bg-transparent text-[14px] leading-relaxed text-foreground placeholder:text-muted-foreground/50 outline-none",
            isPending && "opacity-50 cursor-not-allowed"
          )}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void onSubmit();
            }
          }}
        />

        <div className="mt-2 flex items-center justify-end">
          <Button
            size="icon"
            className={cn(
              "h-7 w-7 rounded-md transition-all shadow-none",
              !content.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
            )}
            disabled={isPending || !content.trim()}
            type="submit"
          >
            {isPending ? (
              <Spinner className="size-3 text-primary-foreground" />
            ) : (
              <ArrowUpIcon className="size-3.5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
