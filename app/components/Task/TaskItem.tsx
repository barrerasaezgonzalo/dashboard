import {
  AlertTriangle,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Circle,
  Flag,
  SquarePen,
  Trash2,
} from "lucide-react";

import { TaskItemProps, TaskStatus } from "../../types";
import { isDateOverdue } from "@/app/utils";

export function TaskItem({
  task,
  expanded,
  selected,
  onNextStatus,
  onToggleSummary,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const overdue =
    task.status !== "done" && !!task.date && isDateOverdue(task.date);
  const hasSummary = Boolean(task.summary?.trim());
  const hasActions = Boolean(onEdit || onDelete);
  const titleClassName = [
    "min-w-0 flex-1 truncate text-sm",
    task.status === "done"
      ? "text-neutral-500 line-through"
      : "text-neutral-200",
  ].join(" ");

  return (
    <div className="overflow-hidden rounded-lg transition border border-white/20 mb-2 bg-neutral-900/50 hover:bg-neutral-900 ">
      <div className="flex min-w-0 items-center gap-2 px-2 py-2.5">
        <button
          type="button"
          onClick={() => onNextStatus(task.id)}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg transition hover:bg-neutral-700"
          title="Cambiar estado"
          aria-label="Cambiar estado"
        >
          <TaskStatusIcon status={task.status} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-1">
          <div
            className={[
              "min-w-0",
              selected ? "border-b-2 border-blue-500 pb-1" : "",
            ].join(" ")}
          >
            {hasSummary ? (
              <button
                type="button"
                onClick={() => onToggleSummary(task.id)}
                className="flex min-w-0 cursor-pointer items-center gap-1 rounded text-left"
              >
                <span className={titleClassName}>{task.title}</span>

                <span className="shrink-0 rounded p-1 text-neutral-500 transition hover:bg-neutral-600 hover:text-neutral-200">
                  {expanded ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </span>
              </button>
            ) : (
              <span className={titleClassName}>{task.title}</span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 justify-end ">
          {task.important && (
            <span className="flex  items-center gap-1 rounded-md bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-400">
              <Flag size={12} fill="currentColor" />
              <span className="hidden sm:inline ">Importante</span>
            </span>
          )}

          {overdue && (
            <span className="flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-1 text-[11px] font-medium text-red-400">
              <AlertTriangle size={12} />

              <span className="hidden sm:inline">Atrasada</span>
            </span>
          )}

          {task.date && (
            <div
              className={[
                "hidden w-[110px] shrink-0 items-center gap-1.5 text-xs sm:flex",
                overdue ? "text-red-400" : "text-neutral-400",
              ].join(" ")}
            >
              <CalendarDays size={12} />
              {task.date}
            </div>
          )}

          {hasActions && (
            <div className="ml-2 flex shrink-0 items-center gap-1">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-600 hover:text-white"
                  title="Editar tarea"
                  aria-label="Editar tarea"
                >
                  <SquarePen size={15} />
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
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {hasSummary && expanded && (
        <div className="ml-10 border-l border-neutral-700 px-4 pb-3 pt-1">
          <p className="text-xs leading-5 text-neutral-500">{task.summary}</p>
        </div>
      )}
    </div>
  );
}

function TaskStatusIcon({ status }: { status: TaskStatus }) {
  if (status === "done") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
        <Check size={12} strokeWidth={3} className="text-white" />
      </div>
    );
  }

  if (status === "in_progress") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-400">
        <div className="h-2 w-2 rounded-full bg-cyan-400" />
      </div>
    );
  }

  return (
    <Circle
      size={20}
      className="text-neutral-500 transition hover:text-neutral-300"
    />
  );
}
