"use client";

import { Lock } from "lucide-react";
import { HabitDayProps } from "@/app/types";

export function HabitDay({
  habit,
  index,
  enabled,
  currentDay,
  weekDay,
  onToggleCompleted,
}: HabitDayProps) {
  const future = index > currentDay;
  const completed = habit.completed[index];
  const disabled = !enabled || future;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onToggleCompleted(habit, index)}
      className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-medium transition ${
        !enabled
          ? "cursor-not-allowed border-neutral-700/40 bg-neutral-900/30 text-neutral-600"
          : future
            ? "cursor-not-allowed border-neutral-500 bg-neutral-900/30 text-neutral-400 opacity-30"
            : completed
              ? "cursor-pointer border-cyan-500 bg-cyan-500/15 text-cyan-400"
              : "cursor-pointer border-neutral-600 text-neutral-400 hover:border-cyan-500/60 hover:text-cyan-400"
      }`}
    >
      {!enabled ? <Lock size={11} /> : weekDay}
    </button>
  );
}
