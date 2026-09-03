
import { MessageCircleQuestion, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "./faq-accordion";
import { FAQBoundaryCard } from "./faq-boundary-card";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function FAQSection() {
  return (
    <section id="faq-section" className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 relative z-10">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column: Intro & Trust */}
        <div className="w-full lg:w-5/12 shrink-0 flex flex-col">
           <RevealOnScroll>
             <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
               <MessageCircleQuestion className="size-4" /> Questions, Answered
             </p>
             <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl mb-6">
               Still wondering how CodePilot works?
             </h2>
             <p className="text-lg text-muted-foreground mb-10">
               Everything you need to know before turning your next idea into an application.
             </p>
             
             <div className="hidden lg:flex flex-col items-start gap-4 mb-12">
               <span className="text-sm font-medium text-foreground">Ready to jump in?</span>
               <Button asChild size="lg" className="rounded-full shadow-md group">
                 <Link href="/root">
                   Start Building <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                 </Link>
               </Button>
             </div>
           </RevealOnScroll>
           
           <RevealOnScroll delayMs={100}>
             <FAQBoundaryCard />
           </RevealOnScroll>
        </div>

        {/* Right Column: Accordion */}
        <RevealOnScroll delayMs={200} className="w-full lg:w-7/12">
           <FAQAccordion />
           
           {/* Mobile CTA (Hidden on Desktop) */}
           <div className="mt-12 flex lg:hidden flex-col items-center gap-4">
               <span className="text-sm font-medium text-foreground">Ready to jump in?</span>
               <Button asChild size="lg" className="rounded-full shadow-md group w-full sm:w-auto">
                 <Link href="/root">
                   Start Building <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                 </Link>
               </Button>
           </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
