"use client";

import { useMemo } from "react";
import { CalendarDays, ListClock, ListTodo, Wallet } from "lucide-react";

import { useTask } from "./useTask";
import { useExpense } from "./useExpense";
import { useHabit } from "./useHabit";
import { useCalendar } from "./useCalendar";
import { parseDateYMD } from "../utils";

export function useNotifications() {
  const { overdueTasks } = useTask();
  const { expenses } = useExpense();
  const { habits } = useHabit();
  const { events } = useCalendar();

  const notifications = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;

    const todayEvents = events.filter((event) => {
      const eventDate = parseDateYMD(event.date);

      if (!eventDate) return false;

      return (
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() === today.getDate()
      );
    });

    const pendingExpenses = expenses.filter(
      (expense) => expense.status === "pending",
    );

    const overdueHabits = habits.filter((habit) =>
      habit.days.some((enabled, index) => {
        const isPreviousDay = index < currentDay;
        const status = habit.completed[index];

        return enabled && isPreviousDay && status === "pending";
      }),
    );

    const calendarNotifications =
      todayEvents.length > 0
        ? [
            {
              id: "today-events",
              icon: CalendarDays,
              title:
                todayEvents.length === 1
                  ? "Tienes 1 evento para hoy"
                  : `Tienes ${todayEvents.length} eventos para hoy`,
            },
          ]
        : [];

    const expenseNotifications =
      pendingExpenses.length > 0
        ? [
            {
              id: "pending-expenses",
              icon: Wallet,
              title:
                pendingExpenses.length === 1
                  ? "Tienes 1 pago pendiente"
                  : `Tienes ${pendingExpenses.length} pagos pendientes`,
            },
          ]
        : [];

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
              title:
                overdueTasks.length === 1
                  ? "1 tarea atrasada"
                  : `${overdueTasks.length} tareas atrasadas`,
            },
          ]
        : [];

    return [
      ...taskNotifications,
      ...expenseNotifications,
      ...habitNotifications,
      ...calendarNotifications,
    ];
  }, [events, expenses, habits, overdueTasks]);

  return {
    notifications,
    count: notifications.length,
  };
}
