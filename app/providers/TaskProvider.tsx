"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

import type { Task, TaskStatus } from "@/app/types";
import { supabase } from "../lib/supabase";

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
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading tasks:", error);
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
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title: task.title,
        summary: task.summary || null,
        date: task.date || null,
        important: task.important,
        status: task.status,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating task:", error);
      throw error;
    }

    setTasks((current) => [data, ...current]);
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
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating task:", error);
      throw error;
    }

    setTasks((current) =>
      current.map((task) => (task.id === id ? data : task)),
    );
  };

  const changeTaskStatus = async (id: number, status: TaskStatus) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating task status:", error);
      return;
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: data.status,
            }
          : task,
      ),
    );
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
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
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
