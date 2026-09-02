import { Bot, User, Sparkles, FileText, Send, MoreHorizontal, Settings, History, Plus } from "lucide-react";

export function AIPreview() {
  return (
    <div className="flex h-full w-full bg-[#FAFAFA] text-zinc-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="hidden sm:flex w-64 flex-col border-r border-zinc-200 bg-zinc-50 shrink-0">
        <div className="h-14 flex items-center px-4 border-b border-zinc-200 justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="size-4 text-violet-600" /> Workspace AI
          </div>
          <button className="size-8 flex items-center justify-center hover:bg-zinc-200 rounded-md transition-colors">
            <Plus className="size-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <div>
            <div className="text-xs font-semibold text-zinc-500 mb-2 px-2">Today</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-zinc-200/60 rounded-md text-sm font-medium">
                Document analysis...
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-200/50 rounded-md text-sm text-zinc-600">
                Marketing copy for Q3
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-zinc-500 mb-2 px-2">Yesterday</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-200/50 rounded-md text-sm text-zinc-600">
                React component refactor
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-200/50 rounded-md text-sm text-zinc-600">
                Data pipeline architecture
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-zinc-200 space-y-1">
          <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-200/50 rounded-md text-sm text-zinc-600 cursor-pointer">
            <Settings className="size-4" /> Settings
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="h-14 border-b border-zinc-200 flex items-center justify-between px-6 shrink-0">
          <div className="font-medium text-sm">Document analysis</div>
          <MoreHorizontal className="size-5 text-zinc-400" />
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* User Message */}
          <div className="flex gap-4 max-w-3xl mx-auto">
            <div className="size-8 rounded-full bg-zinc-200 flex items-center justify-center shrink-0">
              <User className="size-4 text-zinc-600" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm">Can you summarize the key points from the attached Q3 strategy document? Focus specifically on the engineering goals.</p>
              <div className="mt-3 flex items-center gap-3 p-3 border border-zinc-200 rounded-lg max-w-sm bg-zinc-50">
                <div className="size-8 rounded bg-red-100 flex items-center justify-center text-red-600">
                  <FileText className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Q3_Strategy.pdf</div>
                  <div className="text-xs text-zinc-500">2.4 MB</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Message */}
          <div className="flex gap-4 max-w-3xl mx-auto">
            <div className="size-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
              <Bot className="size-4 text-violet-600" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm leading-relaxed mb-4">Based on the Q3 Strategy document, here are the primary engineering goals:</p>
              <ul className="space-y-2 text-sm leading-relaxed list-disc list-outside ml-4">
                <li><span className="font-semibold text-zinc-900">Infrastructure Migration:</span> Move the remaining legacy services to Kubernetes by end of August to reduce latency by projected 15%.</li>
                <li><span className="font-semibold text-zinc-900">Core V2 API:</span> Finalize the GraphQL endpoints for the mobile team, specifically ensuring the authentication flow is robust.</li>
                <li><span className="font-semibold text-zinc-900">Technical Debt:</span> Allocate 20% of sprint capacity to addressing the backlog of P2 frontend bugs identified in the Q2 audit.</li>
              </ul>
              <p className="text-sm leading-relaxed mt-4 text-zinc-500">Would you like me to break down any of these goals into actionable tasks?</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-zinc-100">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-zinc-50 border border-zinc-200 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all">
            <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
              <Plus className="size-5" />
            </button>
            <textarea 
              className="w-full bg-transparent resize-none outline-none text-sm max-h-32 min-h-[40px] py-2.5 placeholder:text-zinc-400"
              placeholder="Ask a question or type '/' for commands..."
              rows={1}
            />
            <button className="p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
              <Send className="size-4" />
            </button>
          </div>
          <div className="text-center mt-2 text-[10px] text-zinc-400">
            AI can make mistakes. Verify important information.
          </div>
        </div>
      </div>
    </div>
  );
}
