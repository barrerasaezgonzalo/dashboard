"use client";

import { ChevronDown, Search, Star } from "lucide-react";
import { useState } from "react";
import { NoteListProps } from "@/app/types/notes";

export function NoteList({
  notes,
  selectedNote,
  isNewNote,
  handleSelectNote,
}: NoteListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (note: (typeof notes)[number]) => {
    handleSelectNote(note);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="relative border-t border-neutral-700 p-4">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900 px-3 text-left text-sm text-neutral-300 transition hover:border-neutral-600"
      >
        <div className="flex min-w-0 items-center gap-2">
          {selectedNote?.important && !isNewNote && (
            <Star
              size={14}
              className="shrink-0 fill-amber-400 text-amber-400"
            />
          )}

          <span className="truncate">
            {selectedNote && !isNewNote
              ? selectedNote.title
              : "Seleccionar nota"}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`shrink-0 text-neutral-500 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-4 right-4 z-50 mb-2 rounded-lg border border-neutral-700 bg-neutral-900 p-2 shadow-xl">
          <div className="relative mb-2">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar nota..."
              className="h-10 w-full rounded-md border border-neutral-700 bg-neutral-950 pl-9 pr-3 text-sm text-neutral-200 outline-none placeholder:text-neutral-600 focus:border-amber-500/50"
            />
          </div>

          <div className="custom-scroll max-h-64 overflow-y-auto">
            <div className="flex flex-col gap-1">
              {filteredNotes.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => handleSelect(note)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                    selectedNote?.id === note.id && !isNewNote
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                  }`}
                >
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                    {note.important && (
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                    )}
                  </div>

                  <span className="truncate">{note.title}</span>
                </button>
              ))}

              {filteredNotes.length === 0 && (
                <p className="py-5 text-center text-sm text-neutral-600">
                  No se encontraron notas
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}     