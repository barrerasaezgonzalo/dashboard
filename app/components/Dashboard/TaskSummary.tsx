"use client";
import { CheckCircle2, ListTodo } from "lucide-react";
import { useTask } from "@/app/hooks/useTask";
import { TaskGroup } from "../Task/TaskGroup";

export function TaskSummary() {
  const {
    overallProgress,
    completedTasks,
    totalTasks,
    expandedTasks,
    handleNextStatus,
    handleToggleSummary,
    taskGroups,
  } = useTask();

  return (
    <section className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-700 px-5 py-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <ListTodo size={20} />
            Tareas
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Avance general de tus tareas.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-neutral-700/70 px-3 py-1.5">
          <CheckCircle2 size={15} className="text-blue-400" />

          <span className="text-sm font-medium text-neutral-200">
            {overallProgress}%
          </span>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm text-neutral-400">Progreso general</span>

          <span className="text-xs text-neutral-500">
            {completedTasks} de {totalTasks} tareas
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-700">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${overallProgress}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-5 border-t border-neutral-700 px-3 py-4">
        {taskGroups.map((group) => (
          <TaskGroup
            key={group.title}
            title={group.title}
            tasks={group.tasks}
            emptyMessage={group.emptyMessage}
            expandedTasks={expandedTasks}
            onNextStatus={handleNextStatus}
            onToggleSummary={handleToggleSummary}
          />
        ))}
      </div>
    </section>
  );
}
