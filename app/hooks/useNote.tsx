"use client";

import { useContext, useEffect, useRef, useState } from "react";

import { NoteContext } from "@/app/providers/NoteProvider";
import type { Note } from "@/app/types";
import { isInvalidTitle } from "../utils";

export function useNote() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNote debe usarse dentro de NoteProvider");
  }

  const {
    updateNote,
    notes,
    createNote,
    deleteNote,
    selectedNote,
    setSelectedNote,
  } = context;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentNote = selectedNote;
  const invalidTitle = isInvalidTitle(title);
  const disabledSave = invalidTitle;
  const [responseOperationMessage, setSuccessMessage] = useState("");

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

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) {
      return;
    }

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const handleSave = async () => {
    if (invalidTitle) {
      return;
    }

    if (isNewNote || !currentNote) {
      await createNote({
        title: title.trim(),
        content,
        important,
      });
      setSuccessMessage("Nota creada correctamente.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
      setIsNewNote(false);
      return;
    }

    await updateNote(currentNote.id, {
      title: title.trim(),
      content,
      important,
    });

    setSelectedNote({
      ...currentNote,
      title: title.trim(),
      content,
      important,
    });
    setSuccessMessage("Nota actualizada correctamente.");
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
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
    if (!currentNote) {
      return;
    }

    await deleteNote(currentNote.id);

    setSuccessMessage("Nota eliminada correctamente.");
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);

    setIsDeleteOpen(false);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setImportant(false);
  };

  const handleImportant = () => {
    if (!currentNote) {
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
    currentNote,
    title,
    content,
    important,
    setTitle,
    setContent,
    selectedNote,
    isNewNote,
    isDeleteOpen,
    invalidTitle,
    disabledSave,
    scrollContainerRef,
    scroll,
    handleSave,
    handleNewNote,
    handleSelectNote,
    handleDelete,
    handleImportant,
    handleOpenDelete,
    handleCloseDelete,
    responseOperationMessage,
  };
}
