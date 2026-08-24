import type { taskGroupConfigProps } from "@/app/types";

type TaskSummaryProps = {
  groups: taskGroupConfigProps[];
};

export function TaskSummary({ groups }: TaskSummaryProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/40 px-4 py-3 text-xs text-neutral-400">
      {groups.map((group) => (
        <span key={group.status} className="flex items-center gap-2">
          <span
            className={`h-6 w-6 rounded-full py-1 text-center font-bold text-black ${group.bg}`}
          >
            {group.tasks.length}
          </span>

          {group.title}
        </span>
      ))}
    </div>
  );
}
