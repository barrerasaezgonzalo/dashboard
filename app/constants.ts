import {
  CalendarDays,
  ListClock,
  ListOrdered,
  ListTodo,
  SquareText,
  Wallet,
  Sparkles,
  File,
  GraduationCap,
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
    id: "wellness",
    label: "Plan de Acción",
    icon: ListOrdered,
    textColor: "text-green-500",
  },
  {
    id: "notes",
    label: "Notas",
    icon: SquareText,
    textColor: "text-amber-500",
  },
  {
    id: "prompt",
    label: "Prompt",
    icon: Sparkles,
    textColor: "text-yellow-500",
  },
  {
    id: "expenses",
    label: "Gastos",
    icon: Wallet,
    textColor: "text-indigo-500",
  },

  {
    id: "files",
    label: "Archivos",
    icon: File,
    textColor: "text-gray-500",
  },
  {
    id: "learning",
    label: "Learning",
    icon: GraduationCap,
    textColor: "text-violet-500",
  },
];

export const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

export const MAX_ANSWER = 10;
export const MIN_ANSWER = 3;
