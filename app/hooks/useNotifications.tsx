"use client";

import { CalendarDays, ListClock, ListTodo, Wallet } from "lucide-react";
import { useTask } from "./useTask";
import { useExpense } from "./useExpense";
import { useHabit } from "./useHabit";
import { useCalendar } from "./useCalendar";
import { parseDateYMD } from "../utils";

export function useNotifications() {
  const { overdueTasks } = useTask();
  const { allExpenses } = useExpense();
  const { habits } = useHabit();
  const today = new Date();
  const { events } = useCalendar();
  const overdueEvents = events.filter((event) => {
    const eventDate = parseDateYMD(event.date);
    if (!eventDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  });
  const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const pendingExpenses = allExpenses.filter(
    (expense) => expense.status === "pending",
  );

  const calendarNotifications =
    overdueEvents.length > 0
      ? [
          {
            id: "overdue-events",
            icon: CalendarDays,
            title:
              overdueEvents.length === 1
                ? "Tienes 1 evento retrasado"
                : `Tienes ${overdueEvents.length} eventos retrasados`,
          },
        ]
      : [];

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
    ...calendarNotifications,
  ];

  return {
    notifications,
    count: notifications.length,
  };
}
