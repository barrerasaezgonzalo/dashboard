"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/hooks/useAuth";
import {
  CheckIn,
  CheckInAnswer,
  Plan,
  PlanStatus,
  PlanTaskStatus,
} from "../types";

type CreateCheckInProps = {
  answers: CheckInAnswer[];
};

type CreatePlanTaskProps = {
  title: string;
  description: string;
  day: number;
};

type CreatePlanProps = {
  checkinId: number;
  title: string;
  summary: string;
  tasks: CreatePlanTaskProps[];
};

type WellnessContextType = {
  activePlan: Plan | null;
  loading: boolean;

  createCheckIn: (data: CreateCheckInProps) => Promise<CheckIn | null>;

  createPlan: (data: CreatePlanProps) => Promise<void>;

  updatePlanTaskStatus: (
    taskId: number,
    status: PlanTaskStatus,
  ) => Promise<void>;

  updatePlanStatus: (planId: number, status: PlanStatus) => Promise<void>;
};

export const WellnessContext = createContext<WellnessContextType | null>(null);

export function WellnessProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  const loadActivePlan = useCallback(async () => {
    if (!user) {
      setActivePlan(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("wellness_plans")
      .select(` *, tasks:wellness_plan_tasks(*)`)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      console.error("Error loading active plan:", error);
      setLoading(false);
      return;
    }

    setActivePlan(data ?? null);
    setLoading(false);
  }, [user]);

  const createCheckIn = async ({ answers }: CreateCheckInProps) => {
    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("wellness_checkins")
      .insert({ answers })
      .select()
      .single();

    if (error) {
      console.error("Error creating check-in:", error);
      return null;
    }
    return data;
  };

  const createPlan = async ({
    checkinId,
    title,
    summary,
    tasks,
  }: CreatePlanProps) => {
    if (!user) {
      return;
    }

    const { data: plan, error } = await supabase
      .from("wellness_plans")
      .insert({
        checkin_id: checkinId,
        title,
        summary,
        status: "active",
      })
      .select()
      .single();

    if (error || !plan) {
      console.error("Error creating plan:", error);
      return;
    }

    const { data: createdTasks, error: tasksError } = await supabase
      .from("wellness_plan_tasks")
      .insert(
        tasks.map((task) => ({
          plan_id: plan.id,
          title: task.title,
          description: task.description,
          day: task.day,
          status: "pending",
        })),
      )
      .select();

    if (tasksError) {
      console.error("Error creating plan tasks:", tasksError);
      return;
    }

    setActivePlan({ ...plan, tasks: createdTasks ?? [] });
  };

  const updatePlanTaskStatus = async (
    taskId: number,
    status: PlanTaskStatus,
  ) => {
    const { error } = await supabase
      .from("wellness_plan_tasks")
      .update({ status })
      .eq("id", taskId);

    if (error) {
      console.error("Error updating plan task:", error);
      return;
    }

    setActivePlan((current) => {
      if (!current) {
        return null;
      }

      return {
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === taskId ? { ...task, status } : task,
        ),
      };
    });
  };

  const updatePlanStatus = async (planId: number, status: PlanStatus) => {
    const { error } = await supabase
      .from("wellness_plans")
      .update({ status })
      .eq("id", planId);

    if (error) {
      console.error("Error updating plan status:", error);
      return;
    }
    setActivePlan(null);
    setLoading(false);
  };

  useEffect(() => {
    loadActivePlan();
  }, [loadActivePlan]);

  return (
    <WellnessContext.Provider
      value={{
        activePlan,
        loading,
        createCheckIn,
        createPlan,
        updatePlanTaskStatus,
        updatePlanStatus,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
}
