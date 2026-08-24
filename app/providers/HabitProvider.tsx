"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/hooks/useAuth";
import { getWeekKey } from "../utils";
import { Habit } from "../types";

type CreateHabitProps = {
  name: string;
  days: boolean[];
};

type UpdateHabitProps = {
  name: string;
  days: boolean[];
};

type HabitContextType = {
  habits: Habit[];
  loading: boolean;
  createHabit: (habit: CreateHabitProps) => Promise<void>;
  updateHabitCompleted: (id: number, completed: boolean[]) => Promise<void>;
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

    const lastCompleted = habit.completed.filter(Boolean).length;

    const completed = [false, false, false, false, false, false, false];

    const { error } = await supabase
      .from("habits")
      .update({
        completed,
        last_completed: lastCompleted,
        last_reset_week: currentWeek,
      })
      .eq("id", habit.id);

    if (error) {
      console.error("Error resetting habit week:", error);

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
      console.error("Error loading habits:", error);

      setLoading(false);

      return;
    }

    const loadedHabits = data ?? [];

    const updatedHabits = await Promise.all(loadedHabits.map(resetHabitWeek));

    setHabits(updatedHabits);
    setLoading(false);
  }, [user]);

  const createHabit = async ({ name, days }: CreateHabitProps) => {
    if (!user) {
      return;
    }

    const completed = [false, false, false, false, false, false, false];

    const { data, error } = await supabase
      .from("habits")
      .insert({
        user_id: user.id,
        name,
        days,
        completed,
        last_completed: 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating habit:", error);

      return;
    }

    setHabits((current) => [...current, data]);
  };

  const updateHabitCompleted = async (id: number, completed: boolean[]) => {
    const { error } = await supabase
      .from("habits")
      .update({
        completed,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating habit:", error);

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
      console.error("Error updating habit:", error);

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
      console.error("Error deleting habit:", error);

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
