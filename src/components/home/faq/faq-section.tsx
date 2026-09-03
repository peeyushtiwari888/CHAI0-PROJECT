import { MessageCircleQuestion, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "./faq-accordion";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function FAQSection() {
  return (
    <section id="faq-section" className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 relative z-10">
      <div className="flex flex-col items-center max-w-3xl mx-auto text-center mb-16">
        <RevealOnScroll>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary flex items-center justify-center gap-2">
            <MessageCircleQuestion className="size-4" /> Questions, Answered
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl mb-6">
            Still wondering how CodePilot works?
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know before turning your next idea into an application.
          </p>
        </RevealOnScroll>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <RevealOnScroll delayMs={200}>
          <FAQAccordion />
          
          <div className="mt-16 flex flex-col items-center gap-4">
            <span className="text-sm font-medium text-foreground">Ready to jump in?</span>
            <Button asChild size="lg" className="rounded-full shadow-md group">
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
