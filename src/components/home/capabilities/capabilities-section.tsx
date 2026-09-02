
import { Layers } from "lucide-react";
import { GenerationVisual } from "./visuals/generation-visual";
import { PreviewVisual } from "./visuals/preview-visual";
import { IterationVisual } from "./visuals/iteration-visual";
import { FilesVisual } from "./visuals/files-visual";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function CapabilitiesSection() {
  return (
    <section id="capabilities-section" className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6">
      {/* Section Header */}
      <RevealOnScroll className="flex flex-col items-center text-center mb-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
          <Layers className="size-4" /> Built for Builders
        </p>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Everything you need to <br className="hidden sm:block" />
          turn an idea into software.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          From generating code to running your application, Chai0 brings the essential building blocks of AI-powered development into one workflow.
        </p>
      </RevealOnScroll>

      {/* Bento Grid */}
      <RevealOnScroll delayMs={200} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* Top Row: Full Width AI Code Generation */}
        <div className="md:col-span-2">
          <GenerationVisual />
        </div>

        {/* Middle Row: Left/Right Split */}
        <div className="md:col-span-1">
          <PreviewVisual />
        </div>
        <div className="md:col-span-1">
          <IterationVisual />
        </div>

        {/* Bottom Row: Full Width Project Files */}
        <div className="md:col-span-2">
          <FilesVisual />
        </div>

      </RevealOnScroll>
    </section>
  );
}
