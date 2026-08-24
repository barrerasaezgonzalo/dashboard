"use client";

import { ListClock, ListTodo, Wallet } from "lucide-react";
import { useTask } from "./useTask";
import { useExpense } from "./useExpense";
import { useHabit } from "./useHabit";

export function useNotifications() {
  const { overdueTasks } = useTask();
  const { allExpenses } = useExpense();
  const { habits } = useHabit();
  const today = new Date();
  const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;
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

  const overdueHabits = habits.filter((habit) =>
    habit.days.some((enabled, index) => {
      const isPreviousDay = index < currentDay;
      const completed = habit.completed[index];
      return enabled && isPreviousDay && !completed;
    }),
  );

  const habitNotifications =
    overdueHabits.length > 0
      ? [
          {
            id: "overdue-habits",
            icon: ListClock,
            title:
              overdueHabits.length === 1
                ? "1 hábito pendiente esta semana"
                : `${overdueHabits.length} hábitos pendientes esta semana`,
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

  const notifications = [
    ...taskNotifications,
    ...expenseNotifications,
    ...habitNotifications,
  ];

  return {
    notifications,
    count: notifications.length,
  };
}
