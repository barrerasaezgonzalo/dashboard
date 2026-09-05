import { CalendarDays, SquarePen, Trash2, X } from "lucide-react";

import { TaskItemProps } from "../../types";

import { useTaskItem } from "@/app/hooks/useTaskItem";

export function TaskItem({
  task,
  onNextStatus,
  onEdit,
  onDelete,
  taskGroupConfig,
  getNextStatus,
}: TaskItemProps) {
  const {
    overdue,
    confirming,
    setConfirming,
    currentStatus,
    availableStatusOptions,
  } = useTaskItem(task, taskGroupConfig, getNextStatus);

  const StatusIcon = currentStatus.icon;

  return (
    <div
      className={`mb-1 rounded-lg border bg-neutral-900/50 p-3 transition hover:bg-neutral-800 ${
        task.important ? "border-blue-500/50" : "border-white/20"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => setConfirming((current) => !current)}
          className="mt-0.5 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center"
          title="Cambiar estado"
        >
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full border ${currentStatus.bg} ${currentStatus.border}`}
          >
            <StatusIcon size={14} strokeWidth={3} className="text-white" />
          </div>
        </button>

        <div className="min-w-0 flex-1">
          <div className="relative text-base font-medium leading-6 text-neutral-300">
            {task.title}

            {confirming && (
              <div className="mt-2 flex w-fit shrink-0 items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-3">
                {availableStatusOptions.map((option) => (
                  <button
                    key={option.status}
                    type="button"
                    onClick={() => {
                      onNextStatus(task.id, option.status);
                      setConfirming(false);
                    }}
                    className={[
                      "cursor-pointer rounded-md px-1 py-1 text-sm font-medium transition hover:opacity-80",
                      option.className,
                    ].join(" ")}
                  >
                    {option.title}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-700 hover:text-white"
                  title="Cancelar"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-white"
            title="Editar tarea"
          >
            <SquarePen size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-red-400"
            title="Eliminar tarea"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {task.date && (
        <div
          className={`mt-2 inline-flex items-center gap-1 rounded-md border border-white/20 px-2 py-1 text-xs ${
            overdue ? "text-red-400" : "text-neutral-400"
          }`}
        >
          <CalendarDays size={13} />
          {task.date}
        </div>
      )}

      {task.summary && (
        <p className="mt-2 line-clamp-3 w-full text-sm leading-5 text-neutral-500">
          {task.summary}
        </p>
      )}
    </div>
  );
}
