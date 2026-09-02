"use client";

import Link from "next/link";
import { ChevronDownIcon, ChevronLeftIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Chai0Mark } from "@/components/brand/chai0-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useGetProjectById } from "@/features/projects/hooks/projects";
import { Badge } from "@/components/ui/badge";

/**
 * Turn a kebab-case project slug into a human-friendly, spaced name.
 *
 * @param name - The raw project name (e.g. `"sunny-otter"`).
 * @returns The same name with hyphens replaced by spaces.
 */
function formatProjectName(name: string) {
  return name.replace(/-/g, " ");
}

/**
 * Header bar for the project workspace.
 *
 * Shows the project name (loading spinner while fetching) inside a dropdown that
 * offers navigation back to the dashboard and a light/dark/system theme picker.
 *
 * @param projectId - The project whose name/menu is rendered.
 */
export default function ProjectHeader({ projectId }: { projectId: string }) {
  const { data: project, isPending } = useGetProjectById(projectId);
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/40 bg-background px-4">
      
      {/* Left: Branding & Project Name */}
      <div className="flex items-center gap-2">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
          <Chai0Mark className="h-6 w-auto shrink-0" />
        </Link>
        
        <span className="text-muted-foreground/40 font-light text-lg">/</span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="px-2 transition-colors hover:bg-muted/50 focus-visible:ring-0 text-foreground"
            >
              <span className="text-sm font-semibold capitalize tracking-tight">
                {isPending ? (
                  <Spinner className="size-3" />
                ) : (
                  formatProjectName(project?.name || "Untitled")
                )}
              </span>
              <ChevronDownIcon className="ml-1.5 size-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
  
          <DropdownMenuContent side="bottom" align="start" className="w-48">
            <DropdownMenuItem onSelect={() => router.push("/root")} className="cursor-pointer">
              <ChevronLeftIcon className="mr-2 size-4" />
              <span>Go to Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <SunMoonIcon className="size-4 text-muted-foreground" />
                <span>Appearance</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={5}>
                  <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>

        <Badge variant="outline" className="hidden sm:inline-flex ml-2 h-5 px-1.5 text-[10px] uppercase tracking-wider font-medium text-emerald-500 border-emerald-500/20 bg-emerald-500/5">
          <span className="size-1 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
          Active
        </Badge>
      </div>

      {/* Right: User Controls */}
      <div className="flex items-center gap-3">
        <UserButton />
      </div>

    </header>
  );
}
