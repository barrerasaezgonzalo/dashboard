import { TaskGroupProps } from "../../types";
import { TaskItem } from "./TaskItem";

export function TaskGroup({
  title,
  tasks,
  emptyMessage,
  expandedTasks,
  onNextStatus,
  onToggleSummary,
  onEdit,
  onDelete,
  selectedTaskId,
}: TaskGroupProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 px-2">
        <span
          className={[
            "h-2 w-2 rounded-full",
            title === "Pendientes" && "bg-neutral-400",
            title === "En progreso" && "bg-cyan-400",
            title === "Finalizadas" && "bg-blue-500",
          ]
            .filter(Boolean)
            .join(" ")}
        />

        <span className="text-sm font-medium text-neutral-300">{title}</span>

        <span className="rounded-full bg-neutral-700 ml-2 px-2 py-0.5 text-xs text-neutral-400">
          {tasks.length}
        </span>
      </div>

      {tasks.length > 0 ? (
        <div className="space-y-1">
          {tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                expanded={expandedTasks.includes(task.id)}
                onNextStatus={onNextStatus}
                onToggleSummary={onToggleSummary}
                onEdit={onEdit}
                onDelete={onDelete}
                selected={task.id === selectedTaskId}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-20 items-center justify-center rounded-lg border border-dashed border-neutral-700">
          <p className="text-sm text-neutral-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
