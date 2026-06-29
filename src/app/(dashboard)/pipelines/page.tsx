import PipelinesHeader from "@/features/pipelines/components/PipelinesHeader";
import KanbanBoard from "@/features/pipelines/components/KanbanBoard";
import { getPipelines } from "@/features/pipelines/actions/pipelines.actions";

export const dynamic = "force-dynamic";

export default async function PipelinesPage() {
  const pipelines = await getPipelines();
  const activePipeline = pipelines[0];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] w-full">
      <PipelinesHeader />
      <KanbanBoard pipeline={activePipeline} />
    </div>
  );
}
