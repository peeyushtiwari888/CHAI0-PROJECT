import { CheckCircle2, Circle, Clock, MoreHorizontal, Calendar, Layout, Hash, AlertCircle } from "lucide-react";

export function ProductivityPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#FDFDF9] text-[#2C2C2A] font-sans">
      {/* Top Nav */}
      <header className="flex h-12 items-center justify-between px-6 border-b border-[#EAEAE2] shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-6 bg-[#E05A33] rounded flex items-center justify-center">
            <CheckCircle2 className="size-4 text-white" />
          </div>
          <div className="font-semibold text-sm">Focus Board</div>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#7D7D75]">
          <span className="text-[#2C2C2A]">My Tasks</span>
          <span>Projects</span>
          <span>Calendar</span>
        </div>
        <div className="size-7 rounded-full bg-[#EAEAE2]" />
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 shrink-0 border-r border-[#EAEAE2] bg-[#F8F8F4] p-4 flex flex-col gap-6">
          <div>
            <div className="text-[10px] font-bold text-[#7D7D75] uppercase tracking-wider mb-2 px-2">Views</div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-[#EAEAE2]/50 text-[#2C2C2A] rounded font-medium text-sm">
                <Layout className="size-4 text-[#7D7D75]" /> Board
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-[#7D7D75] hover:bg-[#EAEAE2]/50 rounded font-medium text-sm cursor-pointer">
                <Calendar className="size-4" /> Calendar
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-[10px] font-bold text-[#7D7D75] uppercase tracking-wider mb-2 px-2">Projects</div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 text-[#7D7D75] hover:bg-[#EAEAE2]/50 rounded font-medium text-sm cursor-pointer">
                <Hash className="size-4" /> Marketing Site
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-[#7D7D75] hover:bg-[#EAEAE2]/50 rounded font-medium text-sm cursor-pointer">
                <Hash className="size-4" /> Q3 Roadmap
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-[#7D7D75] hover:bg-[#EAEAE2]/50 rounded font-medium text-sm cursor-pointer">
                <Hash className="size-4" /> Design System
              </div>
            </div>
          </div>
        </div>

        {/* Board */}
        <div className="flex-1 overflow-x-auto p-6 bg-[#FDFDF9]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#2C2C2A]">Marketing Site</h1>
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full border-2 border-[#FDFDF9] bg-blue-100" />
              <div className="size-8 rounded-full border-2 border-[#FDFDF9] bg-emerald-100" />
              <div className="size-8 rounded-full border-2 border-[#FDFDF9] bg-rose-100" />
            </div>
          </div>

          <div className="flex gap-6 h-[calc(100%-4rem)]">
            {/* Column 1 */}
            <div className="w-80 shrink-0 flex flex-col gap-3">
              <div className="flex items-center justify-between font-semibold text-sm px-1">
                <div className="flex items-center gap-2">To Do <span className="text-xs bg-[#EAEAE2] text-[#7D7D75] px-2 py-0.5 rounded-full">3</span></div>
                <MoreHorizontal className="size-4 text-[#7D7D75]" />
              </div>
              
              <div className="bg-white border border-[#EAEAE2] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex gap-2 items-start mb-2">
                  <Circle className="size-4 text-[#EAEAE2] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-tight text-[#2C2C2A]">Draft landing page copy</span>
                </div>
                <div className="flex items-center gap-3 mt-4 text-[10px] font-medium text-[#7D7D75]">
                  <span className="flex items-center gap-1 text-rose-500"><AlertCircle className="size-3" /> High</span>
                  <span className="flex items-center gap-1"><Clock className="size-3" /> Sep 15</span>
                </div>
              </div>
              
              <div className="bg-white border border-[#EAEAE2] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex gap-2 items-start mb-2">
                  <Circle className="size-4 text-[#EAEAE2] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-tight text-[#2C2C2A]">Finalize color palette</span>
                </div>
                <div className="flex items-center gap-3 mt-4 text-[10px] font-medium text-[#7D7D75]">
                  <span className="flex items-center gap-1"><Clock className="size-3" /> Sep 18</span>
                  <div className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">Design</div>
                </div>
              </div>
              
              <div className="bg-white border border-[#EAEAE2] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex gap-2 items-start mb-2">
                  <Circle className="size-4 text-[#EAEAE2] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-tight text-[#2C2C2A]">Set up Next.js repository</span>
                </div>
                <div className="flex items-center gap-3 mt-4 text-[10px] font-medium text-[#7D7D75]">
                  <span className="flex items-center gap-1 text-[#E05A33]"><AlertCircle className="size-3" /> Medium</span>
                  <div className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Engineering</div>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="w-80 shrink-0 flex flex-col gap-3">
              <div className="flex items-center justify-between font-semibold text-sm px-1">
                <div className="flex items-center gap-2">In Progress <span className="text-xs bg-[#EAEAE2] text-[#7D7D75] px-2 py-0.5 rounded-full">1</span></div>
                <MoreHorizontal className="size-4 text-[#7D7D75]" />
              </div>
              
              <div className="bg-white border border-[#EAEAE2] p-4 rounded-lg shadow-sm border-l-2 border-l-[#E05A33]">
                <div className="flex gap-2 items-start mb-2">
                  <div className="size-4 rounded-full border-2 border-[#E05A33] border-t-transparent animate-spin shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-tight text-[#2C2C2A]">Wireframe hero section</span>
                </div>
                <div className="flex items-center gap-3 mt-4 text-[10px] font-medium text-[#7D7D75]">
                  <span className="flex items-center gap-1"><Clock className="size-3 text-[#E05A33]" /> Sep 12</span>
                  <div className="size-5 rounded-full bg-emerald-100" />
                </div>
              </div>
            </div>
            
            {/* Column 3 */}
            <div className="w-80 shrink-0 flex flex-col gap-3">
              <div className="flex items-center justify-between font-semibold text-sm px-1">
                <div className="flex items-center gap-2">Done <span className="text-xs bg-[#EAEAE2] text-[#7D7D75] px-2 py-0.5 rounded-full">1</span></div>
                <MoreHorizontal className="size-4 text-[#7D7D75]" />
              </div>
              
              <div className="bg-white border border-[#EAEAE2] p-4 rounded-lg shadow-sm opacity-60">
                <div className="flex gap-2 items-start mb-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-tight text-[#2C2C2A] line-through decoration-[#EAEAE2]">Project kickoff meeting</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
