import { LayoutDashboard, ListTodo } from "lucide-react";
import { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Resumen de tus actividades",
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: ListTodo,
    description: "Gestiona el estado de tus tareas",
  },
];
