"use client";

import { useContext, useEffect, useState } from "react";

import { NoteContext } from "@/app/providers/NoteProvider";
import type { Note } from "@/app/types";
import { isInvalidTitle, showResponseMessage } from "../utils";

export function useNote() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNote debe usarse dentro de NoteProvider");
  }

  const { updateNote, notes, createNote, deleteNote } = context;

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [responseOperationMessage, setResponseOperationMessage] = useState("");

  const invalidTitle = isInvalidTitle(title);
  const disabledSave = invalidTitle;

  useEffect(() => {
    if (isNewNote) {
      setTitle("");
      setContent("");
      setImportant(false);
      return;
    }

    if (!selectedNote) {
      setTitle("");
      setContent("");
      setImportant(false);
      return;
    }

    setTitle(selectedNote.title ?? "");
    setContent(selectedNote.content ?? "");
    setImportant(selectedNote.important ?? false);
  }, [selectedNote, isNewNote]);

  const handleSave = async () => {
    if (invalidTitle) {
      return;
    }

    if (isNewNote || !selectedNote) {
      await createNote({
        title: title.trim(),
        content,
        important,
      });

      showResponseMessage(
        setResponseOperationMessage,
        "Nota creada correctamente.",
      );

      setIsNewNote(false);
      return;
    }

    await updateNote(selectedNote.id, {
      title: title.trim(),
      content,
      important,
    });

    setSelectedNote({
      ...selectedNote,
      title: title.trim(),
      content,
      important,
    });

    showResponseMessage(
      setResponseOperationMessage,
      "Nota actualizada correctamente.",
    );
  };

  const handleNewNote = () => {
    setIsNewNote(true);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setImportant(false);
  };

  const handleSelectNote = (note: Note) => {
    setIsNewNote(false);
    setSelectedNote(note);
  };

  const handleDelete = async () => {
    if (!selectedNote) {
      return;
    }

    await deleteNote(selectedNote.id);

    showResponseMessage(
      setResponseOperationMessage,
      "Nota eliminada correctamente.",
    );

    setIsDeleteOpen(false);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setImportant(false);
  };

  const handleImportant = () => {
    if (!selectedNote) {
      return;
    }

    setImportant((current) => !current);
  };

  const handleOpenDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  return {
    notes,
    selectedNote,
    title,
    content,
    important,
    isNewNote,
    isDeleteOpen,
    invalidTitle,
    disabledSave,
    responseOperationMessage,
    setTitle,
    setContent,
    handleSave,
    handleNewNote,
    handleSelectNote,
    handleDelete,
    handleImportant,
    handleOpenDelete,
    handleCloseDelete,
  };
}
