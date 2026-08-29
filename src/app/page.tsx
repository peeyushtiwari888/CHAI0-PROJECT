import { GlassNavbar } from "@/components/home/glass-navbar";
import { HomeBackground } from "@/components/home/home-background";
import { PromptInput } from "@/components/home/prompt-input";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <HomeBackground />
      <GlassNavbar />
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-16 pt-28 sm:px-6">
        <section className="flex w-full max-w-3xl flex-col items-center text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Your creative workspace
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            What will you build today?
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Turn an idea into a polished web experience with a single prompt.
          </p>
          <div className="mt-10 w-full">
            <PromptInput />
          </div>
        </section>
      </main>
    </div>
  );
}
