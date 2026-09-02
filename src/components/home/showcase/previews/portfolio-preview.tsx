import { Globe, MessageCircle, User, ArrowUpRight, Mail } from "lucide-react";

export function PortfolioPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#FAF9F6] text-[#1A1A1A] font-serif overflow-hidden">
      {/* Minimal Header */}
      <header className="flex items-center justify-between px-8 py-6 shrink-0">
        <div className="font-sans text-sm font-bold tracking-widest uppercase">E. Wells</div>
        <nav className="flex items-center gap-8 font-sans text-xs font-semibold tracking-wider uppercase">
          <span className="hover:opacity-50 transition-opacity cursor-pointer">Work</span>
          <span className="hover:opacity-50 transition-opacity cursor-pointer">About</span>
          <span className="hover:opacity-50 transition-opacity cursor-pointer">Journal</span>
          <div className="flex items-center gap-2 border-b border-[#1A1A1A] pb-0.5 cursor-pointer hover:opacity-50 transition-opacity">
            <span>Contact</span> <ArrowUpRight className="size-3" />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-12">
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
            Digital designer crafting thoughtful experiences.
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/60 max-w-lg mb-10">
            Based in New York. Specializing in interface design, design systems, and digital product strategy for forward-thinking brands.
          </p>
          <div className="flex gap-4">
            <div className="size-10 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#FAF9F6] transition-colors cursor-pointer">
              <MessageCircle className="size-4" />
            </div>
            <div className="size-10 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#FAF9F6] transition-colors cursor-pointer">
              <Globe className="size-4" />
            </div>
            <div className="size-10 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#FAF9F6] transition-colors cursor-pointer">
              <User className="size-4" />
            </div>
          </div>
        </div>

        {/* Selected Work */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="font-sans text-xs font-bold tracking-widest uppercase mb-8 flex items-center gap-4">
            Selected Work <div className="h-px bg-[#1A1A1A]/20 flex-1" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] w-full bg-[#E5E5E5] overflow-hidden mb-6 relative">
                <div className="absolute inset-0 bg-[#D4D4D4] transform transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start font-sans">
                <div>
                  <h3 className="text-lg font-medium mb-1">Luminary Architecture</h3>
                  <p className="text-sm text-[#1A1A1A]/60">Brand Identity, Web Design</p>
                </div>
                <div className="text-xs font-semibold tracking-wider">2023</div>
              </div>
            </div>
            
            <div className="group cursor-pointer md:mt-24">
              <div className="aspect-[4/3] w-full bg-[#E5E5E5] overflow-hidden mb-6 relative">
                <div className="absolute inset-0 bg-[#D4D4D4] transform transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start font-sans">
                <div>
                  <h3 className="text-lg font-medium mb-1">Aura Health</h3>
                  <p className="text-sm text-[#1A1A1A]/60">Mobile App, Design System</p>
                </div>
                <div className="text-xs font-semibold tracking-wider">2022</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
