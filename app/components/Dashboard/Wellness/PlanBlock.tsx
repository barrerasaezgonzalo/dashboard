"use client";

import {
  Ban,
  CalendarDays,
  Check,
  CheckCircle,
  ListOrdered,
  X,
} from "lucide-react";

import type { PlanTask, PlanTaskStatus } from "./Wellness";

type PlanBlockProps = {
  tasks: PlanTask[];
  progress: number;
  onStatusChange: (id: number, status: PlanTaskStatus) => void;
};

export function PlanBlock({ tasks, progress, onStatusChange }: PlanBlockProps) {
  return (
    <section className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800 p-5">
      <div className="flex items-start justify-between gap-3 border-b border-neutral-700 pb-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <ListOrdered size={20} className="text-green-500" />
            Plan Wellness
          </h2>

          <p className="mt-1 text-sm text-neutral-500">Wellness Action Plan</p>
        </div>

        <span className="rounded-lg bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-400">
          {progress}%
        </span>
      </div>

      <div className="border-b border-neutral-700 py-4">
        <h3 className="text-sm font-medium text-neutral-200">
          Reconectar con mi rutina
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-neutral-400">
          Plan generado en base a tus respuestas para ayudarte a recuperar el
          equilibrio de forma gradual y sostenible.
        </p>
      </div>

      <div className="mt-4 space-y-1">
        {tasks.map((task) => (
          <WellnessTaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-neutral-700 pt-4 sm:flex-row">
        <button
          type="button"
          onClick={() => {}}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-2 py-3 text-xs font-medium text-neutral-400 transition hover:border-red-500/60 hover:text-red-400 sm:w-auto"
        >
          <Ban size={15} />
          Rechazar Plan
        </button>

        <button
          type="button"
          onClick={() => {}}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-500/10 px-2 py-3 text-xs font-medium text-green-400 transition hover:bg-green-500/20 sm:w-auto"
        >
          <CheckCircle size={15} />
          Completar Plan
        </button>
      </div>
    </section>
  );
}

type WellnessTaskItemProps = {
  task: PlanTask;
  onStatusChange: (id: number, status: PlanTaskStatus) => void;
};

function WellnessTaskItem({ task, onStatusChange }: WellnessTaskItemProps) {
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
