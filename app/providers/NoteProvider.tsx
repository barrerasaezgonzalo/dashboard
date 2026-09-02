"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import type { MapNoteProps, Note } from "@/app/types";
import { supabase } from "@/app/lib/supabase";
import { errorLogger } from "@/app/lib/errorLogger";

type NoteContextType = {
  notes: Note[];
  loading: boolean;
  createNote: (note: Omit<Note, "id" | "user_id">) => Promise<void>;
  updateNote: (
    id: number,
    updates: Partial<Omit<Note, "id" | "user_id">>,
  ) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  loadNotes: () => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
};

export const NoteContext = createContext<NoteContextType | null>(null);

type NoteProviderProps = {
  children: ReactNode;
};

export function NoteProvider({ children }: NoteProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const mapNote = (note: MapNoteProps): Note => ({
    id: note.id,
    user_id: note.user_id,
    title: note.title,
    content: note.content ?? "",
    important: note.important,
  });

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("important", { ascending: false })
        .order("updated_at", { ascending: false });

      if (error) {
        errorLogger.logError("Error al cargar las notas", error, {
          context: "NoteProvider",
          userMessage:
            "No se pudieron cargar las notas. Por favor, recarga la página.",
        });
        return;
      }

      setNotes((data ?? []).map(mapNote));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const createNote = async (note: Omit<Note, "id" | "user_id">) => {
    const { data, error } = await supabase
      .from("notes")
      .insert({
        title: note.title,
        content: note.content || null,
        important: note.important,
      })
      .select()
      .single();

    if (error) {
      errorLogger.logError("Error al crear la nota", error, {
        context: "NoteProvider",
        userMessage: "No se pudo crear la nota. Por favor, intenta de nuevo.",
      });
      throw error;
    }

    setNotes((current) => [mapNote(data), ...current]);
  };

  const updateNote = async (
    id: number,
    updates: Partial<Omit<Note, "id" | "user_id">>,
  ) => {
    const payload = {
      ...(updates.title !== undefined && {
        title: updates.title,
      }),

      ...(updates.content !== undefined && {
        content: updates.content || null,
      }),

      ...(updates.important !== undefined && {
        important: updates.important,
      }),

      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("notes")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      errorLogger.logError("Error al actualizar la nota", error, {
        context: "NoteProvider",
        userMessage:
          "No se pudo actualizar la nota. Por favor, intenta de nuevo.",
      });
      throw error;
    }

    const updatedNote = mapNote(data);

    setNotes((current) =>
      current.map((note) => (note.id === id ? updatedNote : note)),
    );
  };

  const deleteNote = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      errorLogger.logError("Error al eliminar la nota", error, {
        context: "NoteProvider",
        userMessage:
          "No se pudo eliminar la nota. Por favor, intenta de nuevo.",
      });
      throw error;
    }

    setNotes((current) => current.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        createNote,
        updateNote,
        deleteNote,
        loadNotes,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
