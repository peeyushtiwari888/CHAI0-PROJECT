
import { InteractivePromptDemo } from "./interactive-prompt-demo";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function FinalCTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-32 pb-40">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        {/* Subtle dot pattern fallback */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-background/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Headline */}
        <RevealOnScroll className="mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6">
            Your next app starts <br className="hidden sm:block" />
            with a sentence.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop staring at the blank page. Describe what you want to build and let Chai0 turn your idea into a working application.
          </p>
        </RevealOnScroll>

        {/* Prompt Interface */}
        <RevealOnScroll delayMs={200} className="w-full">
          <InteractivePromptDemo />
        </RevealOnScroll>

      </div>
    </section>
  );
}
