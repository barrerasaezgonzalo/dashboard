"use client";

import {
  Lock,
  MoveRight,
  SquarePen,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { weekDays } from "@/app/constants";
import { HabitItemProps } from "@/app/types/habits";

export function HabitItem({
  habit,
  currentDay,
  onToggleCompleted,
  onEdit,
  onDelete,
}: HabitItemProps) {
  const completedThisWeek = habit.completed.filter(
    (status) => status === "completed",
  ).length;

  const isBetter = completedThisWeek > habit.last_completed;
  const isWorse = completedThisWeek < habit.last_completed;

  return (
    <article className="relative rounded-lg border border-neutral-700 bg-neutral-900/20 px-3 py-3 transition hover:bg-neutral-700/20">
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="truncate text-base font-medium text-neutral-300">
          {habit.name}
        </span>

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <div
            className={`flex h-8 w-8 items-center justify-center ${
              isBetter
                ? "text-green-400"
                : isWorse
                  ? "text-red-400"
                  : "text-neutral-400"
            }`}
          >
            {isBetter ? (
              <TrendingUp size={18} />
            ) : isWorse ? (
              <TrendingDown size={18} />
            ) : (
              <MoveRight size={18} />
            )}
          </div>

          <button
            type="button"
            title="Editar hábito"
            onClick={() => onEdit(habit)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-white"
          >
            <SquarePen size={18} />
          </button>

          <button
            type="button"
            title="Eliminar hábito"
            onClick={() => onDelete(habit)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {habit.days.map((enabled, index) => {
          const future = index > currentDay;
          const status = habit.completed[index];
          const disabled = !enabled || future;
          const weekDay = weekDays[index];

          return (
            <button
              key={index}
              type="button"
              disabled={disabled}
              aria-label={
                !enabled
                  ? `${weekDay} no está habilitado`
                  : future
                    ? `${weekDay} todavía no disponible`
                    : `${weekDay}: ${status}`
              }
              onClick={() => onToggleCompleted(habit, index)}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border transition ${
                disabled
                  ? "cursor-not-allowed border-neutral-800 text-neutral-700"
                  : status === "completed"
                    ? "cursor-pointer border-green-500 bg-green-500/20 text-green-400"
                    : status === "failed"
                      ? "cursor-pointer border-red-500 bg-red-500/20 text-red-400"
                      : "cursor-pointer border-neutral-700 text-neutral-400"
              }`}
            >
              {!enabled ? <Lock size={14} /> : weekDay}
            </button>
          );
        })}
      </div>
    </article>
  );
}
