"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

import type { Task, TaskStatus } from "@/app/types";
import { supabase } from "../lib/supabase";
import { errorLogger } from "../lib/errorLogger";

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
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("important", { ascending: false })
        .order("updated_at", { ascending: false });

      if (error) {
        errorLogger.logError("Error al cargar las tareas", error, {
          context: "TaskProvider",
          userMessage:
            "No se pudieron cargar las tareas. Por favor, recarga la página.",
        });
        return;
      }

      setTasks(data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (task: Omit<Task, "id" | "user_id">) => {
    const { error } = await supabase.from("tasks").insert({
      title: task.title,
      summary: task.summary || null,
      date: task.date || null,
      important: task.important,
      status: task.status,
    });

    if (error) {
      errorLogger.logError("Error al crear la tarea", error, {
        context: "TaskProvider",
        userMessage: "No se pudo crear la tarea. Por favor, intenta de nuevo.",
      });
      throw error;
    }

    await loadTasks();
  };

  const updateTask = async (
    id: number,
    updates: Partial<Omit<Task, "id" | "user_id">>,
  ) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        ...updates,
        summary: updates.summary || null,
        date: updates.date || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      errorLogger.logError("Error al actualizar la tarea", error, {
        context: "TaskProvider",
        userMessage:
          "No se pudo actualizar la tarea. Por favor, intenta de nuevo.",
      });
      throw error;
    }

    await loadTasks();

    setSelectedTask((current) => (current?.id === id ? data : current));
  };

  const changeTaskStatus = async (id: number, status: TaskStatus) => {
    const { error } = await supabase
      .from("tasks")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      errorLogger.logError("Error al actualizar el estado de la tarea", error, {
        context: "TaskProvider",
        userMessage:
          "No se pudo actualizar el estado de la tarea. Por favor, intenta de nuevo.",
      });
      return;
    }

    await loadTasks();
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      errorLogger.logError("Error al eliminar la tarea", error, {
        context: "TaskProvider",
        userMessage:
          "No se pudo eliminar la tarea. Por favor, intenta de nuevo.",
      });
      throw error;
    }

    setTasks((current) => current.filter((task) => task.id !== id));

    setSelectedTask((current) => (current?.id === id ? null : current));
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
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
