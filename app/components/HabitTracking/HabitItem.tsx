"use client";

import {
  MoveRight,
  SquarePen,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { HabitDay } from "./HabitDay";
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
              <TrendingUp size={25} />
            ) : isWorse ? (
              <TrendingDown size={25} />
            ) : (
              <MoveRight size={25} />
            )}
          </div>

          <button
            type="button"
            title="Editar hábito"
            onClick={() => onEdit(habit)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-white"
          >
            <SquarePen size={25} />
          </button>

          <button
            type="button"
            title="Eliminar hábito"
            onClick={() => onDelete(habit)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-red-400"
          >
            <Trash2 size={25} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {habit.days.map((enabled, index) => (
          <HabitDay
            key={index}
            habit={habit}
            index={index}
            enabled={enabled}
            currentDay={currentDay}
            weekDay={weekDays[index]}
            onToggleCompleted={onToggleCompleted}
          />
        ))}
      </div>
    </article>
  );
}
