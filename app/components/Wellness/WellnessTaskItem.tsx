import { WellnessTaskItemProps } from "@/app/types";
import { Ban, CalendarDays, CheckCircle } from "lucide-react";

export function WellnessTaskItem({
  task,
  onStatusChange,
  readOnly = false,
}: WellnessTaskItemProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg bg-neutral-700 px-2 py-3 transition hover:bg-neutral-600">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div
          title={task.title}
          className={[
            "truncate text-lg",
            task.status === "completed"
              ? "text-neutral-500 line-through"
              : task.status === "rejected"
                ? "text-orange-700/80 line-through"
                : "text-neutral-400",
          ].join(" ")}
        >
          {task.title}
        </div>

        <div
          className="truncate text-base text-neutral-300"
          title={task.description}
        >
          {task.description}
        </div>
      </div>

      <div className="flex w-[58px] shrink-0 items-center gap-1.5 text-sm text-neutral-400">
        <CalendarDays size={13} />
        Día {task.day}
      </div>

      {!readOnly && (
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onStatusChange(
                task.id,
                task.status === "completed" ? "pending" : "completed",
              )
            }
            title="Marcar como completada"
            aria-label="Marcar como completada"
            className={[
              "flex h-6 w-6 cursor-pointer items-center justify-center transition",
              task.status === "completed"
                ? "text-green-400"
                : "text-neutral-400 hover:text-green-500",
            ].join(" ")}
          >
            <CheckCircle size={20} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() =>
              onStatusChange(
                task.id,
                task.status === "rejected" ? "pending" : "rejected",
              )
            }
            title="Marcar como muy difícil"
            aria-label="Marcar como muy difícil"
            className={[
              "flex h-6 w-6 cursor-pointer items-center justify-center transition",
              task.status === "rejected"
                ? "text-orange-700/80"
                : "text-neutral-400 hover:text-orange-500",
            ].join(" ")}
          >
            <Ban size={20} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}
