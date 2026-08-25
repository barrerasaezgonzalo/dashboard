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
import { HabitItemProps } from "@/app/types";

export function HabitItem({
  habit,
  currentDay,
  onToggleCompleted,
  onEdit,
  onDelete,
}: HabitItemProps) {
  const completedThisWeek = habit.completed.filter(Boolean).length;
  const isBetter = completedThisWeek > habit.last_completed;
  const isWorse = completedThisWeek < habit.last_completed;

  return (
    <article className="rounded-lg border border-neutral-700 bg-neutral-900/20 px-3 py-3 transition hover:bg-neutral-700/20">
      <div className="flex min-w-0 items-center gap-3">
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-300">
          {habit.name}
        </span>

        <div
          title={`${completedThisWeek} esta semana / ${habit.last_completed} semana anterior`}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
            isBetter
              ? "bg-green-500/10 text-green-400"
              : isWorse
                ? "bg-red-500/10 text-red-400"
                : "bg-neutral-700/40 text-neutral-400"
          }`}
        >
          {isBetter ? (
            <TrendingUp size={14} />
          ) : isWorse ? (
            <TrendingDown size={14} />
          ) : (
            <MoveRight size={14} />
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          11
          <button
            type="button"
            title="Editar hábito"
            onClick={() => onEdit(habit)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 text-neutral-500 transition hover:border-habits/60 hover:text-habits"
          >
            <SquarePen size={14} />
          </button>
          <button
            type="button"
            title="Eliminar hábito"
            onClick={() => onDelete(habit)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 text-neutral-500 transition hover:border-red-500/60 hover:text-red-400"
          >
            <Trash2 size={14} />
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
