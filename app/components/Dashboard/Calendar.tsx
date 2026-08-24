"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Plus,
} from "lucide-react";

const events = [
  {
    id: 1,
    day: "Hoy",
    date: "22 Ago",
    title: "Revisar tareas pendientes",
    time: "18:00",
  },
  {
    id: 2,
    day: "Domingo",
    date: "23 Ago",
    title: "Planificar la próxima semana",
    time: "10:30",
  },
  {
    id: 3,
    day: "Lunes",
    date: "24 Ago",
    title: "Reunión proyecto Dashboard",
    time: "09:00",
  },
  {
    id: 4,
    day: "Martes",
    date: "25 Ago",
    title: "Pago servicio internet",
    time: "12:00",
  },
];

export function Calendar() {
  return (
    <section
      className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800"
      id="calendar"
    >
      <div className="flex items-start justify-between gap-3 border-b border-neutral-700 px-5 py-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <CalendarDays size={20} className="text-sky-400" />
            Calendario
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Próximos eventos y recordatorios
          </p>
        </div>

        <button
          onClick={() => {}}
          type="button"
          className="flex ml-auto mr-4 mb-4 py-2 cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-3 text-xs font-medium text-white transition hover:bg-blue-600"
        >
          <Plus size={16} />
          Crear Tarea
        </button>
      </div>

      <div className="px-5 py-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-300">
            Agosto 2026
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 text-neutral-500 transition hover:border-neutral-500 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 text-neutral-500 transition hover:border-neutral-500 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-neutral-700/40"
            >
              <div className="w-12 shrink-0 text-center">
                <div
                  className={[
                    "text-xs font-medium",
                    event.day === "Hoy" ? "text-sky-400" : "text-neutral-400",
                  ].join(" ")}
                >
                  {event.date}
                </div>

                <div className="mt-0.5 text-[10px] text-neutral-600">
                  {event.day}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-neutral-300">
                  {event.title}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 text-xs text-neutral-500">
                <Clock3 size={13} />
                {event.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
