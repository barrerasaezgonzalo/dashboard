"use client";

import { CalendarDays, X } from "lucide-react";
import type { TaskModalProps } from "@/app/types";
import { useTaskModal } from "@/app/hooks/useTaskModal";

export function TaskModal(props: TaskModalProps) {
  const {
    title,
    summary,
    date,
    important,
    errors,
    formError,
    saving,
    isEditing,
    setSummary,
    setDate,
    setImportant,
    handleTitleChange,
    handleSubmit,
    handleClose,
  } = useTaskModal(props);

  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-neutral-700 bg-[#292929] shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-700 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">
            {isEditing ? "Editar tarea" : "Agregar tarea"}
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-600 text-neutral-300 transition hover:bg-neutral-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-5">
          {formError && (
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-700">
              {formError}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-200">
              Título
              <span className="ml-1 text-orange-400">*</span>
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="Ingrese un título"
              className={[
                "h-11 w-full rounded-lg border bg-transparent px-3 text-sm text-white outline-none transition placeholder:text-neutral-500",
                errors.title
                  ? "border-orange-700 focus:border-orange-700"
                  : "border-neutral-600 focus:border-blue-500",
              ].join(" ")}
            />

            {errors.title && (
              <p className="mt-1.5 text-xs text-orange-700">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-200">
              Resumen
            </label>

            <textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Escribe un breve resumen"
              rows={4}
              className="w-full resize-none rounded-lg border border-neutral-600 bg-transparent px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-blue-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-200">
                Fecha
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="h-11 w-full rounded-lg border border-neutral-600 bg-transparent pl-10 pr-3 text-sm text-neutral-200 outline-none transition focus:border-blue-500 [color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-200">
                Importante
              </label>

              <button
                type="button"
                onClick={() => setImportant((current) => !current)}
                className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-600 px-3 transition hover:border-neutral-500"
              >
                <span className="text-sm text-neutral-300">
                  {important ? "Marcado como importante" : "No importante"}
                </span>

                <span
                  className={[
                    "relative h-6 w-11 rounded-full transition",
                    important ? "bg-blue-500" : "bg-neutral-600",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute top-1 h-4 w-4 rounded-full bg-white transition-all",
                      important ? "left-6" : "left-1",
                    ].join(" ")}
                  />
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-neutral-700 pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="cursor-pointer rounded-lg border border-neutral-600 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
