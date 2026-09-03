"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/hooks/useAuth";
import { errorLogger } from "@/app/lib/errorLogger";
import { getWeekKey } from "../utils";
import { CreateHabit, Habit, HabitDayStatus } from "../types";

type UpdateHabitProps = {
  name: string;
  days: boolean[];
};

type HabitContextType = {
  habits: Habit[];
  loading: boolean;
  createHabit: (habit: CreateHabit) => Promise<void>;
  updateHabitCompleted: (
    id: number,
    completed: HabitDayStatus[],
  ) => Promise<void>;
  updateHabit: (id: number, habit: UpdateHabitProps) => Promise<void>;
  deleteHabit: (id: number) => Promise<void>;
};

export const HabitContext = createContext<HabitContextType | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const resetHabitWeek = async (habit: Habit) => {
    const currentWeek = getWeekKey();

    if (habit.last_reset_week === currentWeek) {
      return habit;
    }

    const lastCompleted = habit.completed.filter(
      (status) => status === "completed",
    ).length;

    const completed: HabitDayStatus[] = Array(7).fill("pending");

    const { error } = await supabase
      .from("habits")
      .update({
        completed,
        last_completed: lastCompleted,
        last_reset_week: currentWeek,
      })
      .eq("id", habit.id);

    if (error) {
      errorLogger.logError("Error al resetear la semana del hábito", error, {
        context: "HabitProvider",
        userMessage:
          "No se pudo resetear el hábito. Por favor, intenta de nuevo.",
      });

      return habit;
    }

    return {
      ...habit,
      completed,
      last_completed: lastCompleted,
      last_reset_week: currentWeek,
    };
  };

  const loadHabits = useCallback(async () => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", user.id)
      .order("id");

    if (error) {
      errorLogger.logError("Error al cargar los hábitos", error, {
        context: "HabitProvider",
        userMessage:
          "No se pudieron cargar los hábitos. Por favor, recarga la página.",
      });

      setLoading(false);
      return;
    }

    const loadedHabits = (data ?? []) as Habit[];

    const updatedHabits = await Promise.all(loadedHabits.map(resetHabitWeek));

    setHabits(updatedHabits);
    setLoading(false);
  }, [user]);

  const createHabit = async (habit: CreateHabit) => {
  if (!user) {
    return;
  }

  const completed: HabitDayStatus[] = Array(7).fill("pending");

  const { error } = await supabase.from("habits").insert({
    user_id: user.id,
    name: habit.name,
    days: habit.days,
    completed,
    last_reset_week: getWeekKey(),
  });

  if (error) {
    errorLogger.logError("Error al crear el hábito", error, {
      context: "HabitProvider",
      userMessage: "No se pudo crear el hábito. Por favor, intenta de nuevo.",
    });

    return;
  }

  await loadHabits();
};

  const updateHabitCompleted = async (
    id: number,
    completed: HabitDayStatus[],
  ) => {
    const { error } = await supabase
      .from("habits")
      .update({
        completed,
      })
      .eq("id", id);

    if (error) {
      errorLogger.logError("Error al actualizar el hábito completado", error, {
        context: "HabitProvider",
        userMessage:
          "No se pudo actualizar el hábito. Por favor, intenta de nuevo.",
      });

      return;
    }

    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed,
            }
          : habit,
      ),
    );
  };

  const updateHabit = async (id: number, { name, days }: UpdateHabitProps) => {
    const { error } = await supabase
      .from("habits")
      .update({
        name,
        days,
      })
      .eq("id", id);

    if (error) {
      errorLogger.logError("Error al actualizar el hábito", error, {
        context: "HabitProvider",
        userMessage:
          "No se pudo actualizar el hábito. Por favor, intenta de nuevo.",
      });

      return;
    }

    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              name,
              days,
            }
          : habit,
      ),
    );
  };

  const deleteHabit = async (id: number) => {
    const { error } = await supabase.from("habits").delete().eq("id", id);

    if (error) {
      errorLogger.logError("Error al eliminar el hábito", error, {
        context: "HabitProvider",
        userMessage:
          "No se pudo eliminar el hábito. Por favor, intenta de nuevo.",
      });

      return;
    }

    setHabits((current) => current.filter((habit) => habit.id !== id));
  };

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        loading,
        createHabit,
        updateHabit,
        updateHabitCompleted,
        deleteHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}
