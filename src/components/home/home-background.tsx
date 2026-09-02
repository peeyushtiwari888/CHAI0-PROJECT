import { cn } from "@/lib/utils";

export function HomeBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-background" />

      {/* Very subtle fine grid */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklch, var(--foreground) 30%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 30%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 80%)",
        }}
      />

      {/* Top ambient glow */}
      <div 
        className="absolute -top-[20%] left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, color-mix(in oklch, var(--primary) 15%, transparent), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Subtle bottom edge glow for depth */}
      <div 
        className="absolute bottom-0 left-1/2 h-[30%] w-[100%] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at bottom, color-mix(in oklch, var(--primary) 8%, transparent), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}
