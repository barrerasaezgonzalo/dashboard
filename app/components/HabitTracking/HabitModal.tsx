"use client";

import { weekDays } from "@/app/constants";
import { HabitModalProps } from "@/app/types";
import { Save, X } from "lucide-react";

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
  const invalidName = name.trim().length < 3;
  const invalidDays = !days.some(Boolean);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-neutral-700 bg-neutral-800"
      >
        <header className="flex items-center justify-between border-b border-neutral-700 px-5 py-4">
          <div>
            <h3 className="font-semibold text-neutral-200">
              {habit ? "Editar hábito" : "Nuevo hábito"}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Selecciona los días que quieres realizarlo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Cerrar"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-600 text-neutral-300 transition hover:bg-neutral-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </header>

        <div className="space-y-5 p-5">
          <label className="block">
            <span className="mb-2 block text-sm text-neutral-400">
              Nombre <span className="ml-1 text-orange-400">*</span>
            </span>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej: Caminar 30 min"
              className={`h-10 w-full rounded-lg border bg-neutral-900 px-3 text-sm text-neutral-200 outline-none placeholder:text-neutral-600
                                ${
                                  invalidName
                                    ? "border-orange-700 focus:border-orange-700"
                                    : "border-neutral-700 focus:border-habits/60"
                                }`}
            />
          </label>

          <div>
            <span className="mb-2 block text-sm text-neutral-400">
              Días <span className="ml-1 text-orange-400">*</span>
            </span>

            <div
              className={`flex flex-wrap gap-2 rounded-lg border p-2 ${
                invalidDays ? "border-orange-700" : "border-transparent"
              }`}
            >
              {weekDays.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => onToggleDay(index)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition ${
                    days[index]
                      ? "border-habits bg-habits/10 text-habits"
                      : "border-neutral-700 text-neutral-500 hover:border-habits/60 hover:text-habits"
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
            className="h-9 cursor-pointer rounded-lg border border-neutral-700 px-4 text-sm text-neutral-400 transition hover:bg-neutral-700"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={invalidHabit || saving}
            onClick={onSubmit}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-habits/50 bg-habits/10 px-4 text-sm text-habits transition hover:border-habits disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-neutral-700/20 disabled:text-neutral-600"
          >
            <Save size={16} />

            {saving ? "Guardando..." : habit ? "Guardar" : "Crear"}
          </button>
        </footer>
      </section>
    </div>
  );
}
