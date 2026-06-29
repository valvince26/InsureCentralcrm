import DialerStats from "@/features/dialer/components/DialerStats";
import ActiveCallCard from "@/features/dialer/components/ActiveCallCard";
import CallContextPanels from "@/features/dialer/components/CallContextPanels";
import ScriptPanel from "@/features/dialer/components/ScriptPanel";
import QuickNotes from "@/features/dialer/components/QuickNotes";
import DispositionBar from "@/features/dialer/components/DispositionBar";
import { DialerProvider } from "@/features/dialer/context/DialerContext";
import { getAgentQueue } from "@/features/queue/actions/assignment.actions";

export const dynamic = "force-dynamic";

export default async function PowerDialerPage() {
  const queue = await getAgentQueue();

  return (
    <DialerProvider initialQueue={queue}>
      <div className="h-[calc(100vh-64px)] flex flex-col bg-surface-bright overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left: Dialer Primary Interface */}
          <section className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              <DialerStats />
              <ActiveCallCard />
              <CallContextPanels />
            </div>
          </section>

          {/* Right: Sidebar Panels */}
          <aside className="w-[380px] bg-white border-l border-outline-variant flex flex-col flex-shrink-0">
            <ScriptPanel />
            <QuickNotes />
          </aside>
        </div>

        {/* Bottom: Disposition Bar */}
        <DispositionBar />
      </div>
    </DialerProvider>
  );
}
