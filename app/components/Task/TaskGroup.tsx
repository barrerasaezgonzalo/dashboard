import { TaskGroupProps } from "../../types";
import { TaskItem } from "./TaskItem";

export function TaskGroup({
  title,
  tasks,
  emptyMessage,
  onNextStatus,
  onEdit,
  onDelete,
}: TaskGroupProps) {
  return (
    <section>
      <p className="ml-1 mb-2 text-lg font-medium text-neutral-200">{title}</p>
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
          <p className="text-base text-neutral-500">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}
