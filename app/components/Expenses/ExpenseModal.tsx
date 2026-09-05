"use client";

import { ExpenseModalProps } from "@/app/types";
import { X } from "lucide-react";

export function ExpenseModal({
  isOpen,
  title,
  setTitle,
  onClose,
  onSubmit,
}: ExpenseModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="expense-modal-title"
    >
      <div className="w-full max-w-md rounded-xl border border-neutral-700 bg-neutral-900 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="expense-modal-title"
            className="text-xl font-semibold text-neutral-200"
          >
            Nuevo gasto
          </h2>

          <button
            type="button"
            onClick={onClose}
            title="Cerrar"
            aria-label="Cerrar"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5">
          <label htmlFor="expense-title" className="sr-only">
            Nombre del gasto
          </label>

          <input
            id="expense-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ej: Internet"
            className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 text-base text-neutral-300 outline-none placeholder:text-neutral-600 focus:border-indigo-500/60"
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 cursor-pointer rounded-lg px-4 text-base text-neutral-400 transition hover:text-white"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={!title.trim()}
            onClick={onSubmit}
            className="h-10 cursor-pointer rounded-lg border border-indigo-500/50 bg-indigo-500/10 px-4 text-base font-medium text-indigo-400 transition hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-transparent disabled:text-neutral-700"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
