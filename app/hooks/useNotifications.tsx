"use client";

import { ListTodo, Wallet } from "lucide-react";
import { useTask } from "./useTask";
import { useExpense } from "./useExpense";

export function useNotifications() {
  const { overdueTasks } = useTask();
  const { allExpenses } = useExpense();

  const pendingExpenses = allExpenses.filter(
    (expense) => expense.status === "pending",
  );
  const expenseNotifications =
    pendingExpenses.length > 0
      ? [
          {
            id: "overdue-expenses",
            icon: Wallet,
            title: "Tienes pagos pendientes",
          },
        ]
      : [];

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

  const notifications = [...taskNotifications, ...expenseNotifications];

  return {
    notifications,
    count: notifications.length,
  };
}
