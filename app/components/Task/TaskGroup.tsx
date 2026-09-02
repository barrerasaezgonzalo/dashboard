import { TaskGroupProps } from "../../types";
import { TaskItem } from "./TaskItem";

export function TaskGroup({
  taskGroupConfig,
  onNextStatus,
  onEdit,
  onDelete,
}: TaskGroupProps) {
  return (
    <div className="space-y-2 px-3 py-4">
      {taskGroupConfig.map((group) => (
        <section key={group.status}>
          <p className="ml-1 mb-2 text-lg font-medium text-neutral-200">
            {group.title}
          </p>

          {group.tasks.length > 0 ? (
            <div className="space-y-1">
              {group.tasks.map((task) => (
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
              <p className="text-base text-neutral-500">{group.emptyMessage}</p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
