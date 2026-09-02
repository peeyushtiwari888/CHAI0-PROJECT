import { LayoutDashboard, Users, ShoppingCart, CheckSquare, BarChart3, CreditCard, Activity, Package, Briefcase, TrendingUp } from "lucide-react";

export function MockDashboard() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm">
      <div className="flex h-10 items-center justify-between border-b border-border/40 bg-muted/20 px-4">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs font-medium text-muted-foreground">SaaS Analytics</div>
        <div className="w-12" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-1/4 flex-col gap-2 border-r border-border/40 bg-muted/10 p-4 sm:flex">
          <div className="flex items-center gap-2 rounded-md bg-primary/10 px-2 py-1.5 text-xs font-medium text-primary"><LayoutDashboard className="size-4" /> Overview</div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground"><Users className="size-4" /> Audience</div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground"><BarChart3 className="size-4" /> Reports</div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-4 text-sm font-semibold text-foreground">Dashboard</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border/40 bg-card p-3 shadow-sm">
              <div className="text-[10px] uppercase text-muted-foreground">Revenue</div>
              <div className="text-lg font-semibold text-foreground">$45,231</div>
              <div className="mt-1 flex items-center text-[10px] text-emerald-500"><TrendingUp className="mr-1 size-3" /> +12.5%</div>
            </div>
            <div className="rounded-lg border border-border/40 bg-card p-3 shadow-sm">
              <div className="text-[10px] uppercase text-muted-foreground">Active Users</div>
              <div className="text-lg font-semibold text-foreground">2,405</div>
              <div className="mt-1 flex items-center text-[10px] text-emerald-500"><TrendingUp className="mr-1 size-3" /> +4.2%</div>
            </div>
            <div className="hidden rounded-lg border border-border/40 bg-card p-3 shadow-sm sm:block">
              <div className="text-[10px] uppercase text-muted-foreground">Churn</div>
              <div className="text-lg font-semibold text-foreground">1.2%</div>
              <div className="mt-1 flex items-center text-[10px] text-emerald-500"><TrendingUp className="mr-1 size-3" /> -0.4%</div>
            </div>
          </div>
          <div className="mt-4 flex-1 rounded-lg border border-border/40 bg-muted/10" />
        </div>
      </div>
    </div>
  );
}

export function MockPortfolio() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm">
       <div className="flex h-10 items-center justify-between border-b border-border/40 bg-muted/20 px-4">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs font-medium text-muted-foreground">Designer Portfolio</div>
        <div className="w-12" />
      </div>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 size-16 rounded-full bg-primary/20" />
        <div className="text-xl font-bold text-foreground">Alex Design</div>
        <div className="text-xs text-muted-foreground">Product Designer & Developer</div>
        <div className="mt-6 flex gap-3">
          <div className="rounded-full bg-foreground px-4 py-1.5 text-xs text-background">View Work</div>
          <div className="rounded-full border border-border px-4 py-1.5 text-xs text-foreground">Contact</div>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 p-4">
        <div className="rounded-md bg-muted/30" />
        <div className="rounded-md bg-muted/30" />
      </div>
    </div>
  );
}

export function MockStorefront() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm">
       <div className="flex h-10 items-center justify-between border-b border-border/40 bg-muted/20 px-4">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs font-medium text-muted-foreground">E-commerce</div>
        <div className="flex items-center gap-2"><ShoppingCart className="size-4 text-muted-foreground" /></div>
      </div>
      <div className="h-24 w-full bg-primary/10 flex items-center justify-center">
        <div className="text-lg font-bold text-primary">New Collection</div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4 p-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-square w-full rounded-md bg-muted/40" />
            <div className="h-2 w-3/4 rounded bg-muted-foreground/30" />
            <div className="h-2 w-1/2 rounded bg-foreground/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockTaskManager() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm">
       <div className="flex h-10 items-center justify-between border-b border-border/40 bg-muted/20 px-4">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs font-medium text-muted-foreground">AI Task Manager</div>
        <div className="w-12" />
      </div>
      <div className="flex flex-1 p-4 gap-4">
        <div className="flex w-full flex-col gap-3 rounded-lg border border-border/40 bg-card p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-foreground">To Do</div>
            <div className="text-[10px] text-muted-foreground">3 items</div>
          </div>
          <div className="flex items-center gap-2 rounded border border-border/50 bg-muted/20 p-2 text-xs text-foreground">
             <CheckSquare className="size-3 text-muted-foreground" /> Design system audit
          </div>
          <div className="flex items-center gap-2 rounded border border-border/50 bg-muted/20 p-2 text-xs text-foreground">
             <CheckSquare className="size-3 text-muted-foreground" /> Write API docs
          </div>
          <div className="flex items-center gap-2 rounded border border-primary/20 bg-primary/5 p-2 text-xs text-primary shadow-sm">
             <div className="size-2 animate-pulse rounded-full bg-primary" /> AI suggests: Refactor auth
          </div>
        </div>
      </div>
    </div>
  );
}
