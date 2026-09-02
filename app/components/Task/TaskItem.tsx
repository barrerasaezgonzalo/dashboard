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
  const {
    overdue,
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
      className={`mb-2  overflow-hidden rounded-lg border-2 bg-neutral-900/50 transition hover:bg-neutral-800 
        ${task.important ? "border-blue-500/50" : "border-white/20"}`}
    >
      <div className="flex min-w-0 items-center gap-2 p-2">
        <button
          type="button"
          onClick={() => setConfirming((current) => !current)}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition mr-2 ml-2"
          title="Cambiar estado"
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full border ${currentStatus.bg} ${currentStatus.border} `}
          >
            <StatusIcon size={15} strokeWidth={3} className="text-white" />
          </div>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-neutral-300 text-lg">
            {task.title}
            {confirming && (
              <TaskStatusMenu
                taskId={task.id}
                options={availableStatusOptions}
                onChangeStatus={onNextStatus}
                onClose={() => setConfirming(false)}
              />
            )}
          </div>
          <p className="line-clamp-2 text-base mt-1 leading-5 max-w-2xl text-neutral-500">
            {task.summary}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {task.date && (
            <div className="hidden sm:flex h- p-2 rounded-md border border-white/20 px-2">
              <div
                className={` shrink-0 items-center gap-2 text-sm sm:flex 
                ${overdue ? "text-red-400" : "text-neutral-400"}`}
              >
                <CalendarDays size={16} className="mb-0.5" />
                {task.date}
              </div>
            </div>
          )}

          <div className="flex h-8 shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-white"
              title="Editar tarea"
            >
              <SquarePen size={25} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(task)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-red-400"
              title="Eliminar tarea"
            >
              <Trash2 size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
