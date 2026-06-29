import React from "react";
import AutoQueueTable from "@/features/queue/components/AutoQueueTable";
import { getAgentQueue } from "@/features/queue/actions/assignment.actions";

export const dynamic = "force-dynamic";

export default async function AutoQueuePage() {
  const queueItems = await getAgentQueue();

  return (
    <div className="p-8 space-y-6 max-w-[1440px] mx-auto w-full">
      <div className="flex justify-between items-end border-b border-outline-variant/50 pb-4 mb-6">
        <div>
          <h1 className="text-display-sm font-display-sm text-on-surface mb-2">Auto Queue</h1>
          <p className="text-body-lg text-on-surface-variant">Manage your pending leads and prioritize your dialing queue.</p>
        </div>
      </div>
      
      <AutoQueueTable queueItems={queueItems} />
    </div>
  );
}
