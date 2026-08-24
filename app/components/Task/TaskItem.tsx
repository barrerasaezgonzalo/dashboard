import { CalendarDays, SquarePen, Trash2 } from "lucide-react";

import { TaskItemProps } from "../../types";
import { useTaskItem } from "@/app/hooks/useTaskItem";
import { TaskStatusMenu } from "./TaskStatusMenu";

export function TaskItem({
  task,
  onNextStatus,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const hasActions = Boolean(onEdit || onDelete);

  const {
    overdue,
    hasSummary,
    confirming,
    setConfirming,
    currentStatus,
    availableStatusOptions,
    statusMenuRef,
  } = useTaskItem(task);
  const StatusIcon = currentStatus.icon;
  return (
    <div
      ref={statusMenuRef}
      className={`mb-2 overflow-hidden rounded-lg border-2 bg-neutral-900/50 transition hover:bg-neutral-800 
        ${task.important ? "border-tasks" : "border-white/20"}`}
    >
      <div className="flex min-w-0 items-start gap-3 px-3 py-4">
        <button
          type="button"
          onClick={() => setConfirming((current) => !current)}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg transition hover:bg-neutral-700"
          title="Cambiar estado"
        >
          <div
            className={[
              "flex h-5 w-5 items-center justify-center rounded-full border",
              currentStatus.bg,
              currentStatus.border,
            ].join(" ")}
          >
            <StatusIcon size={12} strokeWidth={3} className="text-white" />
          </div>
        </button>

        <div
          className={`min-w-0 flex-1 ${
            !hasSummary ? "flex h-8 items-center" : ""
          }`}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit?.(task)}
                className="block max-w-full cursor-pointer truncate text-left text-sm font-medium text-neutral-200 transition hover:text-white"
                title="Editar tarea"
              >
                {task.title}
              </button>

              {confirming && (
                <TaskStatusMenu
                  taskId={task.id}
                  options={availableStatusOptions}
                  onChangeStatus={onNextStatus}
                  onClose={() => setConfirming(false)}
                />
              )}
            </div>

            {hasSummary && (
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                {task.summary}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-start gap-2">
          {task.date && (
            <div className="flex h-8 items-center rounded-md border border-white/20 px-3">
              <div
                className={`hidden shrink-0 items-center gap-1.5 text-sm sm:flex ${
                  overdue ? "text-red-400" : "text-neutral-400"
                }`}
              >
                <CalendarDays size={16} />
                {task.date}
              </div>
            </div>
          )}

          {hasActions && (
            <div className="flex h-8 shrink-0 items-center gap-1">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-600 hover:text-white"
                  title="Editar tarea"
                  aria-label="Editar tarea"
                >
                  <SquarePen size={20} />
                </button>
              )}

              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(task)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Eliminar tarea"
                  aria-label="Eliminar tarea"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
