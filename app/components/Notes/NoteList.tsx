"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import type { NoteListProps } from "@/app/types";

export function NoteList({
  notes,
  currentNote,
  isNewNote,
  scrollContainerRef,
  scroll,
  handleSelectNote,
}: NoteListProps) {
  return (
    <div className="border-t border-neutral-700 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Más notas
        </h3>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-neutral-400 transition hover:border-amber-500/60 hover:text-white"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-neutral-400 transition hover:border-amber-500/60 hover:text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="custom-scroll flex gap-3 overflow-x-auto scroll-smooth pb-2"
      >
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => handleSelectNote(note)}
            className={`relative min-w-[180px] max-w-[180px] cursor-pointer rounded-lg border bg-neutral-900/60 p-3 transition hover:border-amber-500/60 ${
              currentNote?.id === note.id && !isNewNote
                ? "border-amber-500/60"
                : "border-neutral-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <p className="min-w-0 flex-1 truncate text-xs font-medium text-white">
                {note.title}
              </p>

              {note.important && (
                <Star
                  size={12}
                  className="shrink-0 fill-amber-400 text-amber-400"
                />
              )}
            </div>

            <p className="mt-1 line-clamp-2 text-xs text-neutral-500">
              {note.content || "Sin contenido"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
