import PipelinesHeader from "@/features/pipelines/components/PipelinesHeader";
import KanbanBoard from "@/features/pipelines/components/KanbanBoard";

export default function PipelinesPage() {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] w-full">
      <PipelinesHeader />
      <KanbanBoard />
    </div>
  );
}
