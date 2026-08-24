import { CalendarDays, Check, X } from "lucide-react";

type PlanTask = {
  id: number;
  title: string;
  day: number;
  status: PlanTaskStatus;
};
type PlanTaskStatus = "pending" | "completed" | "rejected";
type WellnessTaskItemProps = {
  task: PlanTask;
  onStatusChange: (id: number, status: PlanTaskStatus) => void;
};

export function WellnessTaskItem({
  task,
  onStatusChange,
}: WellnessTaskItemProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-neutral-700/40">
      <span
        className={[
          "min-w-0 flex-1 truncate text-sm",
          task.status === "completed"
            ? "text-neutral-500 line-through"
            : task.status === "rejected"
              ? "text-red-400/70 line-through"
              : "text-neutral-300",
        ].join(" ")}
      >
        {task.title}
      </span>

      <div className="flex w-[58px] shrink-0 items-center gap-1.5 text-xs text-neutral-500">
        <CalendarDays size={13} />
        Día {task.day}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onStatusChange(task.id, "completed")}
          title="Marcar como completada"
          aria-label="Marcar como completada"
          className={[
            "flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border transition",
            task.status === "completed"
              ? "border-green-500 bg-green-500/15 text-green-400"
              : "border-neutral-700 text-neutral-500 hover:border-green-500/60 hover:bg-green-500/10 hover:text-green-400",
          ].join(" ")}
        >
          <Check size={14} strokeWidth={3} />
        </button>

        <button
          type="button"
          onClick={() => onStatusChange(task.id, "rejected")}
          title="Marcar como muy difícil"
          aria-label="Marcar como muy difícil"
          className={[
            "flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border transition",
            task.status === "rejected"
              ? "border-red-500 bg-red-500/15 text-red-400"
              : "border-neutral-700 text-neutral-500 hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-400",
          ].join(" ")}
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
