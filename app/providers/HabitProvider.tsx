"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useAuth } from "@/app/hooks/useAuth";
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
      console.error("Error al cargar los hábitos", error);
      setLoading(false);
      return;
    }
    const loadedHabits = (data ?? []) as Habit[];
    const currentWeek = getWeekKey();
    const habitsToReset = loadedHabits.filter(
      (habit) => habit.last_reset_week !== currentWeek,
    );
    if (habitsToReset.length > 0) {
      const updatedHabits = habitsToReset.map((habit) => {
        const lastCompleted = habit.completed.filter(
          (status) => status === "completed",
        ).length;
        const completed: HabitDayStatus[] = Array(7).fill("pending");
        return {
          ...habit,
          completed,
          last_completed: lastCompleted,
          last_reset_week: currentWeek,
        };
      });

      const { error: resetError } = await supabase
        .from("habits")
        .upsert(updatedHabits, {
          onConflict: "id",
        });
      if (resetError) {
        console.error("Error al resetear la semana de los hábitos", resetError);
        setHabits(loadedHabits);
        setLoading(false);
        return;
      }

      const resetMap = new Map(updatedHabits.map((habit) => [habit.id, habit]));
      setHabits(loadedHabits.map((habit) => resetMap.get(habit.id) ?? habit));
      setLoading(false);
      return;
    }
    setHabits(loadedHabits);
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
      console.error("Error al crear el hábito", error);
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
      console.error("Error al actualizar el hábito completado", error);
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
      console.error("Error al actualizar el hábito", error);
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
      console.error("Error al eliminar el hábito", error);
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
