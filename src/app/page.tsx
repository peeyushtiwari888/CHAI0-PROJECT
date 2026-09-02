import { GlassNavbar } from "@/components/home/glass-navbar";
import { HomeBackground } from "@/components/home/home-background";
import { PromptInput } from "@/components/home/prompt-input";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { GeneratedShowcase } from "@/components/home/showcase/generated-showcase";
import { AgentExperience } from "@/components/home/agent-experience/agent-experience";
import { CapabilitiesSection } from "@/components/home/capabilities/capabilities-section";
import { TrustSection } from "@/components/home/trust/trust-section";
import { PricingSection } from "@/components/home/pricing/pricing-section";
import { FAQSection } from "@/components/home/faq/faq-section";
import { FinalCTASection } from "@/components/home/cta/final-cta-section";
import { SiteFooter } from "@/components/home/footer/site-footer";
import { onBoardUser } from "@/features/auth/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  await onBoardUser();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20 selection:text-primary">
      <HomeBackground />
      <GlassNavbar />
      <main className="relative z-10 flex flex-1 flex-col items-center justify-start px-4 pb-0 pt-32 sm:px-6 md:pt-40">
        <section className="flex w-full max-w-4xl flex-col items-center text-center">
          <p className="mb-6 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
            The AI Builder for Developers
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
            Build anything. <br className="hidden sm:block" />
            <span className="text-muted-foreground">Just describe it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            Turn your ideas into working applications with an AI coding agent that understands your project, writes the code, and runs it instantly.
          </p>
          <div className="mt-12 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <PromptInput />
          </div>
        </section>
        
        <div id="interactive-demo-section" className="w-full">
          <InteractiveDemo />
        </div>

        <GeneratedShowcase />
        <AgentExperience />
        <CapabilitiesSection />
        <TrustSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
