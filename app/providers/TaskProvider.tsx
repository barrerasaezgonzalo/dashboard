"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import type { Task, TaskStatus } from "@/app/types";
import { supabase } from "../lib/supabaseClient";

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  createTask: (task: Omit<Task, "id" | "user_id">) => Promise<void>;
  updateTask: (
    id: number,
    updates: Partial<Omit<Task, "id" | "user_id">>,
  ) => Promise<void>;
  changeTaskStatus: (id: number, status: TaskStatus) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  loadTasks: () => Promise<void>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setTasks([]);
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("important", { ascending: false })
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error al cargar las tareas", error);
        return;
      }

      setTasks(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (task: Omit<Task, "id" | "user_id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: user.id,
        title: task.title,
        summary: task.summary || null,
        date: task.date || null,
        important: task.important,
        status: task.status,
      })
      .select()
      .single();

    if (error) {
      console.error("Error al crear la tarea", error);
      throw error;
    }

    setTasks((current) => [data, ...current]);
  };

  const updateTask = async (
    id: number,
    updates: Partial<Omit<Task, "id" | "user_id">>,
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({
        ...updates,
        summary: updates.summary || null,
        date: updates.date || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar la tarea", error);
      throw error;
    }

    setTasks((current) =>
      current.map((task) => (task.id === id ? data : task)),
    );
  };

  const changeTaskStatus = async (id: number, status: TaskStatus) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar el estado de la tarea", error);
      throw error;
    }

    setTasks((current) =>
      current.map((task) => (task.id === id ? data : task)),
    );
  };

  const deleteTask = async (id: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error al eliminar la tarea", error);
      throw error;
    }

    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        createTask,
        updateTask,
        changeTaskStatus,
        deleteTask,
        loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
