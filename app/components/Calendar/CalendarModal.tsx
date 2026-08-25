import { CalendarModalProps } from "@/app/types";
import { X } from "lucide-react";

export function CalendarModal({
  handleCloseModal,
  handleSubmit,
  title,
  setTitle,
  date,
  setDate,
  time,
  setTime,
  isEditing,
}: CalendarModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-700 bg-neutral-900 shadow-xl">
        <div className="flex items-start justify-between border-b border-neutral-800 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              {isEditing ? "Editar" : "Nuevo"} evento
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {isEditing
                ? "Edita un evento de calendario"
                : "Agrega un evento al calendario"}
              .
            </p>
          </div>

          <button
            type="button"
            onClick={handleCloseModal}
            className="cursor-pointer text-neutral-500 transition hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            <div>
              <label className="mb-1.5 block text-sm text-neutral-400">
                Título<span className="ml-1 text-orange-400">*</span>
              </label>

              <input
                type="text"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Reunión de proyecto"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-calendar/70"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-neutral-400">
                Fecha
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-calendar/70"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-neutral-400">
                Hora
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-calendar/70"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-neutral-800 px-5 py-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="cursor-pointer rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!title.trim() || !date}
              className="cursor-pointer rounded-lg bg-calendar/80 px-4 py-2 text-sm font-medium text-white transition hover:bg-calendar disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isEditing ? "Crear" : "Guardar"} evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
