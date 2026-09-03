import { LayoutDashboard, Users, CreditCard, Settings, Activity, ArrowUpRight, ArrowDownRight, Bell, Search } from "lucide-react";

export function SaaSPreview() {
  return (
    <div className="flex h-full w-full bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-200">
      {/* Sidebar */}
      <div className="w-56 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f0f0f] p-4 flex flex-col gap-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white px-2">
          <div className="size-6 rounded bg-indigo-600 flex items-center justify-center">
            <Activity className="size-4 text-slate-900 dark:text-white" />
          </div>
          Analytics Pro
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="text-xs font-semibold text-slate-500 mb-2 px-2 uppercase tracking-wider">Overview</div>
          <div className="flex items-center gap-3 rounded-lg bg-indigo-500/10 text-indigo-400 px-3 py-2 text-sm font-medium">
            <LayoutDashboard className="size-4" /> Dashboard
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50">
            <Users className="size-4" /> Customers
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50">
            <CreditCard className="size-4" /> Billing
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50">
            <Settings className="size-4" /> Settings
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f0f0f]/80 flex items-center justify-between px-6 shrink-0 backdrop-blur-sm">
          <div className="flex items-center gap-2 w-64 bg-slate-100 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-md px-3 py-1.5">
            <Search className="size-4 text-slate-500" />
            <span className="text-sm text-slate-500">Search metrics...</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="size-4 text-slate-500 dark:text-slate-400" />
            <div className="size-7 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600" />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111] p-5">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</div>
              <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">$45,231.89</div>
              <div className="mt-2 flex items-center text-xs text-emerald-400">
                <ArrowUpRight className="mr-1 size-3" /> +20.1% from last month
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111] p-5">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Subscriptions</div>
              <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">+2,350</div>
              <div className="mt-2 flex items-center text-xs text-emerald-400">
                <ArrowUpRight className="mr-1 size-3" /> +180.1% from last month
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111] p-5">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Now</div>
              <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">573</div>
              <div className="mt-2 flex items-center text-xs text-emerald-400">
                <ArrowUpRight className="mr-1 size-3" /> +201 since last hour
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111] p-5">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Churn Rate</div>
              <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">1.2%</div>
              <div className="mt-2 flex items-center text-xs text-rose-400">
                <ArrowDownRight className="mr-1 size-3" /> -0.1% from last month
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111] p-5 flex flex-col">
              <div className="text-base font-medium text-slate-900 dark:text-white mb-6">Revenue Over Time</div>
              <div className="flex-1 flex items-end gap-2 h-48">
                {[40, 70, 45, 90, 65, 85, 120, 95, 130, 110, 140, 160].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-t-sm transition-colors" style={{ height: `${(h/160)*100}%` }}>
                    <div className="w-full bg-indigo-500 h-1 rounded-t-sm" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111] p-5">
              <div className="text-base font-medium text-slate-900 dark:text-white mb-4">Recent Sales</div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">User {i}</div>
                        <div className="text-xs text-slate-500">user{i}@example.com</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">+$299.00</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
