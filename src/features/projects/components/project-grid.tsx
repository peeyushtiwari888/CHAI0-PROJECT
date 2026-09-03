"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjects } from "@/features/projects/hooks/projects";
import { getProjectThumbnailUrl } from "../lib";
import { cn } from "@/lib/utils";
import { Search, FolderGit2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function ProjectCardSkeleton() {
    return (
      <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/50 py-0 shadow-sm backdrop-blur-sm">
        <Skeleton className="aspect-square w-full rounded-none" />
        <CardHeader className="px-4 pb-4">
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
      </Card>
    );
  }

function formatProjectName(name: string) {
    return name.replace(/-/g, " ");
  }

export function ProjectGrid() {
  const { data: projects, isLoading, isError } = useGetProjects();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (!searchQuery.trim()) return projects;
    return projects.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card/50">
        <p className="text-destructive font-medium">Failed to load projects.</p>
      </div>
    );
  }

  if (!isLoading && (!projects || projects.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card/50">
        <FolderGit2 className="size-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-1">No projects yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Describe what you want to build above, and CodePilot will create your first application.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Your Projects
        </h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-full border border-border/60 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {filteredProjects.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No projects match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))
            : filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/root/projects/${project.id}`}
                  className="group block outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
                >
                  <Card
                    className={cn(
                      "overflow-hidden rounded-2xl border-border/60 bg-card/50 py-0 shadow-sm backdrop-blur-sm",
                      "transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5",
                    )}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20 border-b border-border/40">
                      <img
                        src={getProjectThumbnailUrl(project.id)}
                        alt=""
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <CardTitle className="truncate font-semibold tracking-tight text-lg text-foreground group-hover:text-primary transition-colors drop-shadow-sm">
                          {formatProjectName(project.name)}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between bg-card/50">
                      <div className="flex items-center text-xs text-muted-foreground font-medium">
                        <Clock className="size-3 mr-1.5 opacity-70" />
                        {project.updatedAt ? (
                          `Updated ${formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}`
                        ) : (
                          "Just now"
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
        </div>
      )}
    </section>
  );
}
  