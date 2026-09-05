"use client";

import type { CalendarModalProps } from "@/app/types/calendar";
import { X } from "lucide-react";

export function CalendarModal({
  isOpen,
  selectedEvent,
  title,
  date,
  time,
  summary,
  setTitle,
  setDate,
  setTime,
  setSummary,
  onClose,
  onSubmit,
}: CalendarModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-neutral-700 bg-neutral-800"
      >
        <header className="flex items-center justify-between border-b border-neutral-700 px-5 py-4">
          <h3
            id="calendar-modal-title"
            className="text-xl font-semibold text-neutral-200"
          >
            {selectedEvent ? "Editar evento" : "Agregar evento"}
          </h3>

          <button
            type="button"
            onClick={onClose}
            title="Cerrar"
            aria-label="Cerrar modal"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-600 text-neutral-300 transition hover:bg-neutral-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </header>

        <form onSubmit={onSubmit}>
          <div className="space-y-4 p-5">
            <div>
              <label
                htmlFor="calendar-title"
                className="mb-2 block text-lg text-neutral-400"
              >
                Título
              </label>

              <input
                id="calendar-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ej: Reunión"
                className="h-11 w-full rounded-lg border border-neutral-600 bg-transparent px-3 text-base text-white outline-none transition placeholder:text-neutral-500"
              />
            </div>

            <div>
              <label
                htmlFor="calendar-date"
                className="mb-2 block text-lg text-neutral-400"
              >
                Fecha
              </label>

              <input
                id="calendar-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="h-11 w-full rounded-lg border border-neutral-600 bg-transparent px-3 text-base text-white outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="calendar-time"
                className="mb-2 block text-lg text-neutral-400"
              >
                Hora
              </label>

              <input
                id="calendar-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="h-11 w-full rounded-lg border border-neutral-600 bg-transparent px-3 text-base text-white outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="calendar-summary"
                className="mb-2 block text-lg text-neutral-400"
              >
                Descripción
              </label>

              <textarea
                id="calendar-summary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                placeholder="Descripción opcional"
                className="custom-scroll min-h-28 w-full resize-none rounded-lg border border-neutral-600 bg-transparent p-3 text-base text-white outline-none transition placeholder:text-neutral-500"
              />
            </div>
          </div>

          <footer className="flex justify-end gap-2 border-t border-neutral-700 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-neutral-700 px-4 py-2 text-base font-medium text-neutral-400 transition hover:bg-neutral-700"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!title.trim() || !date}
              className="cursor-pointer rounded-lg bg-orange-500 px-4 py-2 text-base font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {selectedEvent ? "Guardar" : "Crear"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
