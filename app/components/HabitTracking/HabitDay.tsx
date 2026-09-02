"use client";

import { HabitDayProps } from "@/app/types/habits";
import { Lock } from "lucide-react";

export function HabitDay({
  habit,
  index,
  enabled,
  currentDay,
  weekDay,
  onToggleCompleted,
}: HabitDayProps) {
  const future = index > currentDay;
  const status = habit.completed[index];
  const disabled = !enabled || future;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onToggleCompleted(habit, index)}
      className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
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
}
