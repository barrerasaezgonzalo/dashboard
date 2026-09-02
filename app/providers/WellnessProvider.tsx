"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase";
import { errorLogger } from "@/app/lib/errorLogger";
import { useAuth } from "@/app/hooks/useAuth";

import {
  CheckIn,
  CheckInAnswer,
  Plan,
  PlanStatus,
  PlanTaskStatus,
} from "../types";
import { showResponseMessage } from "../utils";

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
  selectedPlan: Plan | null;
  planHistory: Plan[];
  loading: boolean;

  selectPlan: (plan: Plan) => void;
  clearSelectedPlan: () => void;

  createCheckIn: (data: CreateCheckInProps) => Promise<CheckIn | null>;

  createPlan: (data: CreatePlanProps) => Promise<void>;

  updatePlanTaskStatus: (
    taskId: number,
    status: PlanTaskStatus,
  ) => Promise<void>;

  updatePlanStatus: (planId: number, status: PlanStatus) => Promise<void>;

  loadPlanHistory: () => Promise<void>;

  deletePlan: (id: number) => Promise<void>;

  responseOperationMessage: string;
};

export const WellnessContext = createContext<WellnessContextType | null>(null);

export function WellnessProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [responseOperationMessage, setResponseOperationMessage] = useState("");

  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [planHistory, setPlanHistory] = useState<Plan[]>([]);

  const [loading, setLoading] = useState(true);

  const selectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const clearSelectedPlan = () => {
    setSelectedPlan(null);
  };

  const loadActivePlan = useCallback(async () => {
    if (!user) {
      setActivePlan(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("wellness_plans")
      .select(
        `
        *,
        tasks:wellness_plan_tasks(*)
      `,
      )
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      errorLogger.logError(
        "Error al cargar el plan activo de bienestar",
        error,
        {
          context: "WellnessProvider",
          userMessage:
            "No se pudo cargar el plan de bienestar. Por favor, recarga la página.",
        },
      );
      setLoading(false);
      return;
    }

    setActivePlan(data ?? null);
    setLoading(false);
  }, [user]);

  const loadPlanHistory = useCallback(async () => {
    if (!user) {
      setPlanHistory([]);
      return;
    }

    const { data, error } = await supabase
      .from("wellness_plans")
      .select(
        `
        *,
        tasks:wellness_plan_tasks(*)
      `,
      )
      .neq("status", "active")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      errorLogger.logError(
        "Error al cargar el historial de planes de bienestar",
        error,
        {
          context: "WellnessProvider",
          userMessage:
            "No se pudo cargar el historial de planes. Por favor, intenta de nuevo.",
        },
      );
      return;
    }

    setPlanHistory(data ?? []);
  }, [user]);

  const createCheckIn = async ({ answers }: CreateCheckInProps) => {
    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("wellness_checkins")
      .insert({
        answers,
      })
      .select()
      .single();

    if (error) {
      errorLogger.logError("Error al crear el check-in de bienestar", error, {
        context: "WellnessProvider",
        userMessage:
          "No se pudo crear el check-in. Por favor, intenta de nuevo.",
      });
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
    if (!user || activePlan) {
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
      errorLogger.logError("Error al crear el plan de bienestar", error, {
        context: "WellnessProvider",
        userMessage: "No se pudo crear el plan. Por favor, intenta de nuevo.",
      });
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
      errorLogger.logError(
        "Error al crear las tareas del plan de bienestar",
        tasksError,
        {
          context: "WellnessProvider",
          userMessage:
            "Error al crear las tareas del plan. Por favor, intenta de nuevo.",
        },
      );
      return;
    }

    setSelectedPlan(null);

    setActivePlan({
      ...plan,
      tasks: createdTasks ?? [],
    });
  };

  const updatePlanTaskStatus = async (
    taskId: number,
    status: PlanTaskStatus,
  ) => {
    const { error } = await supabase
      .from("wellness_plan_tasks")
      .update({
        status,
      })
      .eq("id", taskId);

    if (error) {
      errorLogger.logError(
        "Error al actualizar el estado de la tarea del plan",
        error,
        {
          context: "WellnessProvider",
          userMessage:
            "No se pudo actualizar la tarea. Por favor, intenta de nuevo.",
        },
      );
      return;
    }

    setActivePlan((current) => {
      if (!current) {
        return null;
      }

      return {
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status,
              }
            : task,
        ),
      };
    });
  };

  const deletePlan = async (planId: number) => {
    const { error } = await supabase
      .from("wellness_plans")
      .delete()
      .eq("id", planId);

    if (error) {
      errorLogger.logError("Error al eliminar el plan de bienestar", error, {
        context: "WellnessProvider",
        userMessage:
          "No se pudo eliminar el plan. Por favor, intenta de nuevo.",
      });
      return;
    }
    showResponseMessage(
      setResponseOperationMessage,
      "Plan eliminado correctamente.",
    );
    setSelectedPlan(null);

    await loadPlanHistory();
  };

  const updatePlanStatus = async (planId: number, status: PlanStatus) => {
    const { error } = await supabase
      .from("wellness_plans")
      .update({
        status,
      })
      .eq("id", planId);

    if (error) {
      errorLogger.logError(
        "Error al actualizar el estado del plan de bienestar",
        error,
        {
          context: "WellnessProvider",
          userMessage:
            "No se pudo actualizar el estado del plan. Por favor, intenta de nuevo.",
        },
      );
      return;
    }

    setActivePlan(null);
    setSelectedPlan(null);

    await loadPlanHistory();
  };

  useEffect(() => {
    loadActivePlan();
    loadPlanHistory();
  }, [loadActivePlan, loadPlanHistory]);

  return (
    <WellnessContext.Provider
      value={{
        activePlan,
        selectedPlan,
        planHistory,
        loading,

        selectPlan,
        clearSelectedPlan,

        createCheckIn,
        createPlan,

        updatePlanTaskStatus,
        updatePlanStatus,

        loadPlanHistory,
        deletePlan,

        responseOperationMessage,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
}
