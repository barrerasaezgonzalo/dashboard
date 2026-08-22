"use client";

import { useContext, useState } from "react";
import { Task, TaskFormData, TaskStatus } from "../types";
import { TaskContext } from "../providers/TaskProvider";

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask debe usarse dentro de TaskProvider");
  }

  const { tasks, changeTaskStatus, createTask, updateTask, deleteTask } =
    context;

  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in_progress");
  const doneTasks = tasks.filter((task) => task.status === "done");
  const totalTasks = tasks.length;
  const completedTasks = doneTasks.length;
  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleNextStatus = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      return;
    }
    const nextStatus = getNextStatus(task.status);
    changeTaskStatus(taskId, nextStatus);
  };

  const handleToggleSummary = (taskId: number) => {
    setExpandedTasks((current) =>
      current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId],
    );
  };

  const handleCreateTask = async (data: TaskFormData) => {
    await createTask({
      title: data.title,
      summary: data.summary || undefined,
      date: data.date || undefined,
      important: data.important,
      status: "todo",
    });
    setSuccessMessage("Tarea creada correctamente.");
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!selectedTask) return;

    await updateTask(selectedTask.id, {
      title: data.title,
      summary: data.summary || undefined,
      date: data.date || undefined,
      important: data.important,
    });

    setSuccessMessage("Tarea actualizada correctamente.");
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    await deleteTask(selectedTask.id);
    setSuccessMessage("Tarea eliminada correctamente.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
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

  const taskGroups = [
    {
      title: "Pendientes",
      tasks: todoTasks,
      emptyMessage: "No tienes tareas pendientes.",
    },
    {
      title: "En progreso",
      tasks: inProgressTasks,
      emptyMessage: "No tienes tareas en progreso.",
    },
    {
      title: "Finalizadas",
      tasks: doneTasks,
      emptyMessage: "No tienes tareas finalizadas.",
    },
  ];

  return {
    tasks,
    overallProgress,
    completedTasks,
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    expandedTasks,
    handleNextStatus,
    handleToggleSummary,
    taskGroups,
    createTask,
    updateTask,
    deleteTask,
    handleOpenCreate,
    successMessage,
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
  };
}
