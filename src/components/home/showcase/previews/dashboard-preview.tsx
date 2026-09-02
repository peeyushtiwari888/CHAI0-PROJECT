import { Server, Activity, Database, Shield, Zap, RefreshCw, Cpu, Wifi } from "lucide-react";

export function DashboardPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-200">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Server className="size-4" />
          </div>
          <div>
            <div className="text-sm font-bold leading-none">Command Center</div>
            <div className="text-[10px] text-slate-500">System Status: All Systems Operational</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <RefreshCw className="size-3" /> Auto-refresh: 5s
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Infrastructure Overview</h1>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1"><div className="size-2 rounded-full bg-emerald-500" /> Healthy (24)</div>
            <div className="flex items-center gap-1"><div className="size-2 rounded-full bg-amber-500" /> Warning (2)</div>
            <div className="flex items-center gap-1"><div className="size-2 rounded-full bg-rose-500" /> Critical (0)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "CPU Usage", value: "42%", icon: Cpu, color: "text-blue-500" },
            { label: "Memory Allocation", value: "12.4 GB", icon: Database, color: "text-purple-500" },
            { label: "Network I/O", value: "1.2 GB/s", icon: Wifi, color: "text-emerald-500" },
            { label: "Active Threats", value: "0", icon: Shield, color: "text-slate-500" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className={`flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Active Nodes Table */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm font-semibold">Active Nodes</div>
              <div className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer">View All</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <th className="pb-2 font-medium">Node ID</th>
                    <th className="pb-2 font-medium">Region</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { id: "nd-east-1a", region: "us-east-1", status: "Healthy", lat: "12ms" },
                    { id: "nd-east-1b", region: "us-east-1", status: "Healthy", lat: "15ms" },
                    { id: "nd-west-2a", region: "us-west-2", status: "Warning", lat: "89ms" },
                    { id: "nd-eu-west", region: "eu-west-1", status: "Healthy", lat: "45ms" },
                  ].map((node, i) => (
                    <tr key={i}>
                      <td className="py-3 font-medium">{node.id}</td>
                      <td className="py-3 text-slate-500">{node.region}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          node.status === 'Healthy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                        }`}>
                          {node.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono text-xs">{node.lat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Load */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-sm font-semibold mb-6">System Load</div>
            <div className="relative flex h-40 items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-32 rounded-full border-[12px] border-blue-100 dark:border-slate-800"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="size-32 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="12" fill="transparent"
                    className="text-blue-500" strokeDasharray="251.2" strokeDashoffset="80" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">68%</div>
                <div className="text-[10px] uppercase text-slate-500">Average</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1"><div className="size-2 bg-blue-500 rounded-sm"/> User</div>
              <div className="flex items-center gap-1"><div className="size-2 bg-blue-200 dark:bg-slate-700 rounded-sm"/> System</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
