"use client";

import { weekDays } from "@/app/constants";
import { HabitModalProps } from "@/app/types/habits";
import { X } from "lucide-react";

export function HabitModal({
  isOpen,
  habit,
  name,
  days,
  saving,
  invalidHabit,
  setName,
  onToggleDay,
  onClose,
  onSubmit,
}: HabitModalProps) {
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
        aria-labelledby="habit-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-neutral-700 bg-neutral-800"
      >
        <header className="flex items-center justify-between border-b border-neutral-700 px-5 py-4">
          <div>
            <h3
              id="habit-modal-title"
              className="text-xl font-semibold text-neutral-200"
            >
              {habit ? "Editar hábito" : "Agregar hábito"}
            </h3>
          </div>

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

        <div className="space-y-5 p-5">
          <label className="block">
            <span className="mb-2 block text-lg text-neutral-400">
              Nombre <span className="ml-1 text-orange-400">*</span>
            </span>

            <input
              autoFocus
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej: Caminar 30 min"
              className="h-11 w-full rounded-lg border border-neutral-600 bg-transparent px-3 text-base text-white outline-none transition placeholder:text-neutral-500"
            />
          </label>

          <div>
            <span className="mb-2 block text-lg text-neutral-400">
              Días <span className="ml-1 text-orange-400">*</span>
            </span>

            <div className="flex flex-wrap gap-2 rounded-lg border border-transparent p-2">
              {weekDays.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => onToggleDay(index)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-base font-medium transition ${
                    days[index]
                      ? "border-cyan-600 bg-cyan-500/15 text-cyan-500"
                      : "border-neutral-600 text-neutral-400 hover:border-cyan/60 hover:text-cyan-400"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
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
            type="button"
            disabled={invalidHabit || saving}
            onClick={onSubmit}
            className="cursor-pointer rounded-lg bg-cyan-500 px-4 py-2 text-base font-medium text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Guardando..." : habit ? "Guardar" : "Crear"}
          </button>
        </footer>
      </section>
    </div>
  );
}
