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
  summary,
  setSummary,
}: CalendarModalProps) {
  return (
    <div
      onClick={handleCloseModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800 shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-neutral-700 px-5 py-4">
          <h2 className="text-xl font-semibold text-white">
            {isEditing ? "Editar Evento" : "Agregar Evento"}
          </h2>

          <button
            type="button"
            onClick={handleCloseModal}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition bg-neutral-700 hover:text-white"
          >
            <X size={18} />
          </button>
        </header>

        <div className="w-full max-w-md rounded-xl bg-neutral-800 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-lg font-medium text-neutral-200">
                  Título<span className="ml-1 text-orange-400">*</span>
                </label>

                <input
                  type="text"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Reunión de proyecto"
                  className={`w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-base text-white outline-none transition placeholder:text-neutral-600 border-neutral-600"`}
                />
              </div>

              <div>
                <label className="mb-2 block text-lg font-medium text-neutral-200">
                  Fecha <span className="ml-1 text-orange-400">*</span>
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-base text-white outline-none transition [color-scheme:dark] border-neutral-600`}
                />
              </div>

              <div>
                <label className="mb-2 block text-lg font-medium text-neutral-200">
                  Hora
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-base text-white outline-none transition focus:border-orange-500/70 [color-scheme:dark]"
                />
              </div>

              <label className="block">
                <span className="mb-2 block text-lg font-medium text-neutral-200">
                  Resumen
                </span>

                <textarea
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  placeholder="Escribe un breve resumen"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-neutral-600 bg-transparent px-3 py-3 text-base text-white outline-none transition placeholder:text-neutral-500"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 border-t border-neutral-700 mx-4 p5 py-5">
              <button
                type="button"
                onClick={handleCloseModal}
                className="cursor-pointer rounded-lg border border-neutral-700 px-4 py-2 text-base text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={!title.trim() || !date}
                className={`cursor-pointer rounded-lg px-4 py-2 text-base font-medium text-white transition bg-orange-500 hover:bg-orange-600 
                disabled:opacity-30 disabled:cursor-not-allowed
            }`}
              >
                {isEditing ? "Guardar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
