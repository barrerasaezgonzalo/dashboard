import {
  CalendarDays,
  ListClock,
  ListOrdered,
  ListTodo,
  SquareText,
  Wallet,
  File,
} from "lucide-react";

export const checkInQuestions = [
  "¿Cómo te has sentido hoy?",
  "¿Qué ha ocupado más tu mente hoy?",
  "¿Cómo estuvo tu ánimo durante el día?",
  "¿Qué fue lo más difícil de hoy?",
  "¿Hubo algo que te hiciera sentir bien hoy?",
  "¿Cómo estuvo tu energía hoy?",
  "¿Qué emoción apareció con más fuerza hoy?",
  "¿Qué necesitas en este momento?",
  "¿Cómo describirías tu día en pocas palabras?",
  "¿Hay algo que te esté preocupando últimamente?",
  "¿Qué te gustaría que fuera diferente mañana?",
  "¿Qué fue lo mejor que pasó hoy?",
  "¿Sentiste que tuviste tiempo para ti hoy?",
  "¿Cómo estuvo tu nivel de estrés hoy?",
  "¿Hay algo que quieras sacar de tu cabeza?",
  "¿Qué te costó más manejar hoy?",
  "¿Cómo te trataste a ti mismo hoy?",
  "¿Hubo algún momento en que te sentiste tranquilo?",
  "¿Qué cosa pequeña podría ayudarte ahora?",
  "¿Con qué sensación estás terminando el día?",
] as const;

export const dashboardLinks = [
  {
    id: "tasks",
    label: "Tareas",
    icon: ListTodo,
    className: "text-tasks",
    classNameSoft: "text-tasks/50",
  },
  {
    id: "habits",
    label: "Hábitos",
    icon: ListClock,
    className: "text-habits",
    classNameSoft: "text-habits/50",
  },
  {
    id: "calendar",
    label: "Calendario",
    icon: CalendarDays,
    className: "text-calendar",
    classNameSoft: "text-calendar/50",
  },
  {
    id: "wellness",
    label: "Plan de Acción",
    icon: ListOrdered,
    className: "text-wellness",
    classNameSoft: "text-wellness/50",
  },
  {
    id: "notes",
    label: "Notas",
    icon: SquareText,
    className: "text-notes",
    classNameSoft: "text-notes/50",
  },
  {
    id: "expenses",
    label: "Gastos",
    icon: Wallet,
    className: "text-debts",
    classNameSoft: "text-debts/50",
  },
  {
    id: "files",
    label: "Archivos",
    icon: File,
    className: "text-files",
    classNameSoft: "text-files/50",
  },
];

export const weekDays = ["L", "M", "X", "J", "V", "S", "D"];
