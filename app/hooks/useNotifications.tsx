"use client";

import { ListTodo } from "lucide-react";
import { useTask } from "./useTask";

export function useNotifications() {
  const { overdueTasks } = useTask();

  const taskNotifications =
    overdueTasks.length > 0
      ? [
          {
            id: "overdue-tasks",
            icon: ListTodo,
            title: `${overdueTasks.length} tareas atrasadas`,
          },
        ]
      : [];

  const notifications = [...taskNotifications];

  return {
    notifications,
    count: notifications.length,
  };
}
