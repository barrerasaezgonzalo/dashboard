import { TaskGroupProps } from "../../types";
import { TaskItem } from "./TaskItem";

export function TaskGroup({
  title,
  tasks,
  emptyMessage,
  icon: Icon,
  className,
  onNextStatus,
  onEdit,
  onDelete,
}: TaskGroupProps) {
  return (
    <section>
      <header className="mb-4 flex items-center gap-2">
        <span
          className={`ml-1 flex items-center gap-1.5 rounded-lg px-2 py-0.5 pr-3 text-xs font-bold ${className}`}
        >
          <Icon size={20} />
          {tasks.length}
        </span>

        <span className="text-sm font-medium text-neutral-300">{title}</span>
      </header>

      {tasks.length > 0 ? (
        <div className="space-y-1">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onNextStatus={onNextStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-20 items-center justify-center rounded-lg border border-dashed border-neutral-700">
          <p className="text-sm text-neutral-500">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}
