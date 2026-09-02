"use client";

import { NoteFormProps } from "@/app/types/notes";
import { Star, Save, Trash2 } from "lucide-react";
export function NoteForm({
  title,
  content,
  setTitle,
  setContent,
  handleImportant,
  currentNote,
  isNewNote,
  important,
  handleSave,
  disabledSave,
  handleOpenDelete,
}: NoteFormProps) {
  return (
    <>
      <div className="mx-4 mt-4 flex flex-col gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título de la nota"
          className={`w-full rounded-lg border bg-neutral-900/60 p-3 text-lg leading-6 text-neutral-400 outline-none transition placeholder:text-neutral-600 border-neutral-700`}
        />
      </div>

      <div className="h-60 p-4">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Escribe una idea..."
          className="custom-scroll h-full w-full resize-none rounded-lg border border-neutral-700 bg-neutral-900/60 p-3 text-base leading-6 text-neutral-400 outline-none transition placeholder:text-neutral-600  placeholder:text-base"
        />
      </div>

      <div className="flex items-center gap-4 mx-4 mb-4">
        <button
          type="button"
          onClick={handleImportant}
          disabled={isNewNote || !currentNote}
          title="Marcar como importante"
          aria-label="Marcar como importante"
          className={`flex h-8 w-8 shrink-0 items-center justify-center transition disabled:cursor-not-allowed disabled:border-neutral-700 disabled:text-neutral-500 disabled:opacity-50 ${
            important
              ? "cursor-pointer text-amber-400"
              : "cursor-pointer text-neutral-400 hover:text-amber-400"
          }`}
        >
          <Star
            size={25}
            className={important ? "fill-amber-400 text-amber-400" : ""}
          />
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={disabledSave}
          title="Guardar nota"
          aria-label="Guardar nota"
          className="flex pl-0.5 h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-neutral-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Save size={25} />
        </button>

        <button
          type="button"
          onClick={handleOpenDelete}
          disabled={!currentNote || isNewNote}
          title="Eliminar nota"
          aria-label="Eliminar nota"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-neutral-400 transition disabled:cursor-not-allowed disabled:opacity-30 hover:text-red-400"
        >
          <Trash2 size={25} />
        </button>
      </div>
    </>
  );
}
