import { WellnessTaskItemProps } from "@/app/types";
import { CalendarDays, Check, X } from "lucide-react";

export function WellnessTaskItem({
  task,
  onStatusChange,
}: WellnessTaskItemProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-3 transition bg-neutral-700 hover:bg-neutral-600">
      <div className="flex flex-col gap-2">
        <div
          className={[
            "min-w-0 flex-1 truncate text-sm",
            task.status === "completed"
              ? "text-neutral-500 line-through"
              : task.status === "rejected"
                ? "text-orange-700/80 line-through"
                : "text-neutral-400",
          ].join(" ")}
        >
          {task.title}
        </div>
        <div className="flex text-xs text-neutral-300">{task.description}</div>
      </div>
      <div className="flex w-[58px] shrink-0 items-center gap-1.5 text-xs text-neutral-500">
        <CalendarDays size={13} />
        Día {task.day}
      </div>

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
            "flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border transition",
            task.status === "completed"
              ? "border-wellness/50 bg-wellnewss/15 text-green-400"
              : "border-neutral-700 text-neutral-400",
          ].join(" ")}
        >
          <Check size={14} strokeWidth={3} />
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
            "flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border transition",
            task.status === "rejected"
              ? "border-orange-700/80 bg-orange-700/10 text-orange-700/80"
              : "border-neutral-700 text-neutral-400",
          ].join(" ")}
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
