import {
  CalendarDays,
  ListClock,
  ListTodo,
  SquareText,
  Wallet,
} from "lucide-react";

export const dashboardLinks = [
  {
    id: "tasks",
    label: "Tareas",
    icon: ListTodo,
    textColor: "text-blue-500",
  },
  {
    id: "habits",
    label: "Hábitos",
    icon: ListClock,
    textColor: "text-cyan-500",
  },
  {
    id: "calendar",
    label: "Calendario",
    icon: CalendarDays,
    textColor: "text-orange-500",
  },
  {
    id: "notes",
    label: "Notas",
    icon: SquareText,
    textColor: "text-amber-500",
  },
  {
    id: "expenses",
    label: "Gastos",
    icon: Wallet,
    textColor: "text-indigo-500",
  },
];

export const weekDays = ["L", "M", "X", "J", "V", "S", "D"];
