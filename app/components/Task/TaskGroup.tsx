import { TaskGroupProps } from "../../types";
import { TaskItem } from "./TaskItem";
import { useTask } from "@/app/hooks/useTask";

export function TaskGroup({
  taskGroupConfig,
  onNextStatus,
  onEdit,
  onDelete,
}: TaskGroupProps) {
  const { getNextStatus } = useTask();

  return (
    <div className="grid grid-cols-1 gap-4 px-3 py-4 lg:grid-cols-3">
      {taskGroupConfig.map((group) => (
        <section
          key={group.status}
          className="rounded-xl border border-neutral-700 bg-neutral-900/40 p-3"
        >
          <p
            className={`mb-3 text-sm font-medium text-neutral-200 rounded-lg px-4 w-fit ${group.className}`}
          >
            {group.title}
          </p>

          {group.tasks.length > 0 ? (
            <div className="space-y-2">
              {group.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onNextStatus={onNextStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  taskGroupConfig={taskGroupConfig}
                  getNextStatus={getNextStatus}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-neutral-700">
              <p className="text-center text-base text-neutral-500">
                {group.emptyMessage}
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
