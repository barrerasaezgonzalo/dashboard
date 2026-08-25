"use client";

import { Save, Star, Trash } from "lucide-react";

import type { NoteFormProps } from "@/app/types";

export function NoteForm({
  currentNote,
  title,
  content,
  important,
  isNewNote,
  invalidTitle,
  disabledSave,
  setTitle,
  setContent,
  handleSave,
  handleImportant,
  handleOpenDelete,
}: NoteFormProps) {
  return (
    <>
      <div className="mx-4 mt-4 flex items-center gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título de la nota"
          className={`w-full rounded-lg border bg-neutral-900/60 p-3 text-sm leading-6 text-neutral-400 outline-none transition placeholder:text-neutral-600 ${
            invalidTitle
              ? "border-amber-700 focus:border-amber-700"
              : "border-neutral-700 focus:border-amber-500/60"
          }`}
        />

        <button
          type="button"
          onClick={handleImportant}
          disabled={isNewNote || !currentNote}
          title={
            currentNote?.important
              ? "Quitar de importantes"
              : "Marcar como importante"
          }
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-neutral-900/60 transition ${
            isNewNote || !currentNote
              ? "cursor-not-allowed border-neutral-700 text-neutral-600 opacity-40"
              : important
                ? "cursor-pointer border-amber-500/60 text-amber-400"
                : "cursor-pointer border-neutral-700 text-neutral-500 hover:border-amber-500/60 hover:text-amber-400"
          }`}
        >
          <Star
            size={18}
            className={important ? "fill-amber-400 text-amber-400" : ""}
          />
        </button>
      </div>

      <div className="h-85 p-4">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Escribe una idea..."
          className="custom-scroll h-full w-full resize-none rounded-lg border border-neutral-700 bg-neutral-900/60 p-3 text-sm leading-6 text-neutral-400 outline-none transition placeholder:text-neutral-600 focus:border-amber-500/60"
        />
      </div>

      <div className="flex w-full items-center justify-between gap-2 px-4 pb-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={disabledSave}
          title="Guardar nota"
          aria-label="Guardar nota"
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 py-2 text-xs font-medium text-notes/50 transition hover:border-notes/80 hover:text-notes/80 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Save size={25} />
        </button>

        <button
          type="button"
          onClick={handleOpenDelete}
          disabled={!currentNote || isNewNote}
          title="Eliminar nota"
          aria-label="Eliminar nota"
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-700/80 px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Trash size={25} />
        </button>
      </div>
    </>
  );
}
