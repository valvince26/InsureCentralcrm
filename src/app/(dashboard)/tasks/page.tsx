import TasksHeader from "@/features/tasks/components/TasksHeader";
import QuickAdd from "@/features/tasks/components/QuickAdd";
import TaskList from "@/features/tasks/components/TaskList";
import TaskDetailPanel from "@/features/tasks/components/TaskDetailPanel";
import TaskFAB from "@/features/tasks/components/TaskFAB";

export default function TasksPage() {
  return (
    <div className="flex-1 flex overflow-hidden h-[calc(100vh-64px)]">
      {/* Task Central Panel */}
      <section className="flex-1 flex flex-col min-w-0 bg-background p-6">
        <TasksHeader />
        <QuickAdd />
        <TaskList />
      </section>

      {/* Task Detail Right Sidebar */}
      <TaskDetailPanel />
      
      {/* Mobile FAB */}
      <TaskFAB />
    </div>
  );
}
