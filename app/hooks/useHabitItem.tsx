"use client";

import { useContext } from "react";

import { HabitContext } from "@/app/providers/HabitProvider";
import type { Habit, HabitDayStatus } from "@/app/types";

export function useHabitItem() {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error("useHabitItem debe usarse dentro de HabitProvider");
  }

  const { updateHabitCompleted } = context;

  const handleToggleCompleted = async (habit: Habit, index: number) => {
    const completed: HabitDayStatus[] = habit.completed.map(
      (status, dayIndex) => {
        if (dayIndex !== index) {
          return status;
        }

        if (status === "pending") {
          return "completed";
        }

        if (status === "completed") {
          return "failed";
        }

        return "pending";
      },
    );

    await updateHabitCompleted(habit.id, completed);
  };

  return {
    handleToggleCompleted,
  };
}
