
import { ShieldCheck } from "lucide-react";
import { PipelineVisual } from "./visuals/pipeline-visual";
import { SandboxVisual } from "./visuals/sandbox-visual";
import { CodeOwnershipVisual } from "./visuals/code-ownership-visual";
import { ReliabilityVisual } from "./visuals/reliability-visual";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function TrustSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6">
      {/* Section Header */}
      <RevealOnScroll className="flex flex-col items-center text-center mb-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
          <ShieldCheck className="size-4" /> Trusted Development Workflow
        </p>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          See what your AI is doing.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          From generated files to a running preview, CodePilot keeps the development workflow visible instead of hiding everything behind a black box.
        </p>
      </RevealOnScroll>

      {/* Bento Grid */}
      <RevealOnScroll delayMs={200} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* Top Row: Full Width Execution Pipeline */}
        <div className="md:col-span-2">
          <PipelineVisual />
        </div>

        {/* Middle Row: Left/Right Split */}
        <div className="md:col-span-1">
          <SandboxVisual />
        </div>
        <div className="md:col-span-1">
          <CodeOwnershipVisual />
        </div>

        {/* Bottom Row: Full Width Reliability */}
        <div className="md:col-span-2">
          <ReliabilityVisual />
        </div>

      </RevealOnScroll>
    </section>
  );
}
