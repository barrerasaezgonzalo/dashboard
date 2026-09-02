"use client";

import { useContext, useState } from "react";
import { Task, TaskFormData, TaskGroupConfig, TaskStatus } from "../types";
import { TaskContext } from "../providers/TaskProvider";
import { isDateOverdue, showResponseMessage } from "../utils";
import { Circle, CircleGauge, Check } from "lucide-react";

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask debe usarse dentro de TaskProvider");
  }
  const {
    tasks,
    changeTaskStatus,
    createTask,
    updateTask,
    deleteTask,
    selectedTask,
    setSelectedTask,
  } = context;
  const [responseOperationMessage, setResponseOperationMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in_progress");
  const doneTasks = tasks.filter((task) => task.status === "done");
  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter((task) => {
    return task.status !== "done" && !!task.date && isDateOverdue(task.date);
  });

  const handleNextStatus = (taskId: number, status?: TaskStatus) => {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    const nextStatus = status ?? getNextStatus(task.status);

    changeTaskStatus(taskId, nextStatus);
  };

  const handleCreateTask = async (data: TaskFormData) => {
    await createTask({
      title: data.title,
      summary: data.summary || undefined,
      date: data.date || undefined,
      important: data.important,
      status: "todo",
    });
    showResponseMessage(
      setResponseOperationMessage,
      "Tarea creada correctamente.",
    );
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!selectedTask) return;

    await updateTask(selectedTask.id, {
      title: data.title,
      summary: data.summary || undefined,
      date: data.date || undefined,
      important: data.important,
    });

    showResponseMessage(
      setResponseOperationMessage,
      "Tarea actualizada correctamente.",
    );
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    await deleteTask(selectedTask.id);
    showResponseMessage(
      setResponseOperationMessage,
      "Tarea eliminada correctamente.",
    );
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleOpenEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  function getNextStatus(status: TaskStatus): TaskStatus {
    if (status === "todo") {
      return "in_progress";
    }
    if (status === "in_progress") {
      return "done";
    }
    return "todo";
  }

  const taskGroupConfig: TaskGroupConfig[] = [
    {
      status: "todo",
      title: "Pendientes",
      tasks: todoTasks,
      emptyMessage: "No tienes tareas pendientes.",
      icon: Circle,
      bg: "bg-neutral-500",
      border: "border-neutral-500",
      className: "bg-neutral-400 text-neutral-900",
    },
    {
      status: "in_progress",
      title: "En progreso",
      tasks: inProgressTasks,
      emptyMessage: "No tienes tareas en progreso.",
      icon: CircleGauge,
      bg: "bg-cyan-400",
      border: "border-cyan-400",
      className: "bg-cyan-400 text-neutral-900",
    },
    {
      status: "done",
      title: "Finalizadas",
      tasks: doneTasks,
      emptyMessage: "No tienes tareas finalizadas.",
      icon: Check,
      bg: "bg-green-700",
      border: "border-green-700",
      className: "bg-green-700 text-neutral-200",
    },
  ];

  return {
    tasks,
    totalTasks,
    todoTasks,
    overdueTasks,
    handleNextStatus,
    taskGroupConfig,
    createTask,
    updateTask,
    deleteTask,
    handleOpenCreate,
    responseOperationMessage,
    handleOpenEdit,
    handleOpenDelete,
    isModalOpen,
    setIsModalOpen,
    selectedTask,
    handleUpdateTask,
    handleCreateTask,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteTask,
    setSelectedTask,
    getNextStatus,
  };
}
