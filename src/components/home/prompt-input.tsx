"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

import {
  allPromptTemplates,
  getRandomPromptTemplate,
} from "@/components/home/prompt-template";
import { useCreateProject } from "@/features/projects/hooks/projects";
import type { PromptTemplate } from "@/components/home/prompt-template";

export function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<PromptTemplate[]>([]);
  
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { mutate: createProject, isPending } = useCreateProject();

  // Initialize random suggestions on client side
  useEffect(() => {
    const shuffled = [...allPromptTemplates].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 3));
  }, []);

  // Rotate placeholder every 3 seconds if not focused and empty
  useEffect(() => {
    if (isFocused || prompt.length > 0) return;
    
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % allPromptTemplates.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isFocused, prompt.length]);

  function handleSubmit() {
    if (!isLoaded) return;
    if (!prompt.trim()) return;

    if (!isSignedIn) {
      toast.error("Please sign in before creating a project.");
      router.push("/sign-in");
      return;
    }

    createProject(prompt, {
      onSuccess: (project) => {
        router.push(`/root/projects/${project.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  }

  function applySuggestion(nextPrompt: string) {
    setPrompt(nextPrompt);
  }

  const currentPlaceholder = allPromptTemplates[placeholderIndex]?.prompt || "Ask codepilot to build...";

  return (
    <div className="flex w-full flex-col gap-6">
      <div 
        className={cn(
          "relative flex flex-col rounded-2xl border bg-card/40 shadow-sm backdrop-blur-xl transition-all duration-300",
          isFocused ? "border-primary/50 shadow-primary/10 shadow-lg ring-4 ring-primary/10" : "border-border/60 hover:border-border"
        )}
      >
        <div className="relative min-h-[140px] w-full p-4">
          {!prompt && !isFocused && (
            <div className="pointer-events-none absolute left-4 top-4 right-4 animate-in fade-in zoom-in duration-500">
               <p className="line-clamp-3 text-lg text-muted-foreground/60 transition-opacity">
                 {currentPlaceholder}
               </p>
            </div>
          )}
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? "Describe what you want to build..." : ""}
            rows={4}
            className="h-full min-h-[100px] w-full resize-none bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
        
        <div className="flex w-full items-center justify-between border-t border-border/40 p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            <span className="hidden sm:inline">AI Agent Ready</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 text-xs font-medium text-muted-foreground sm:flex">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 shadow-sm">⌘</kbd>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 shadow-sm">Enter</kbd>
            </div>
            <Button
              size="sm"
              variant="default"
              onClick={handleSubmit}
              disabled={!prompt.trim() || isPending}
              className="rounded-full px-5 transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              {isPending ? <Spinner className="mr-2 size-4" /> : null}
              {isPending ? "Building..." : "Build"}
              {!isPending && <ArrowRight className="ml-2 size-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both">
        {suggestions.map(({ label, icon: Icon, prompt: templatePrompt }) => (
          <button
            key={label}
            type="button"
            disabled={isPending}
            onClick={() => applySuggestion(templatePrompt)}
            className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/30 hover:bg-muted hover:text-foreground active:scale-95 backdrop-blur-sm"
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
