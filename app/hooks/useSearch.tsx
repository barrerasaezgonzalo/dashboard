"use client";

import { useContext, useRef, useState } from "react";

import { useTask } from "./useTask";

import { NoteContext } from "@/app/providers/NoteProvider";

import type { Note, Task } from "../types";

import { handleScrollTo } from "../utils";
import { useClickOutside } from "./useClickOutside";

export function useSearch() {
  const {
    tasks,
    setSelectedTask,
    selectedTask,
    handleUpdateTask,
    isModalOpen,
    setIsModalOpen,
  } = useTask();

  const noteContext = useContext(NoteContext);

  if (!noteContext) {
    throw new Error("useSearch debe usarse dentro de NoteProvider");
  }
  const searchRef = useRef<HTMLDivElement>(null);
  const { notes, setSelectedNote } = noteContext;

  const [search, setSearch] = useState("");

  const term = search.toLowerCase().trim();

  const filteredTasks = tasks.filter((task) => {
    if (!term) {
      return false;
    }

    return (
      task.title.toLowerCase().includes(term) ||
      task.summary?.toLowerCase().includes(term)
    );
  });

  const filteredNotes = notes.filter((note) => {
    if (!term) {
      return false;
    }

    return (
      note.title.toLowerCase().includes(term) ||
      note.content?.toLowerCase().includes(term)
    );
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setSearch("");
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setSearch("");

    handleScrollTo("notes");
  };

  useClickOutside(searchRef, () => setSearch(""));

  return {
    search,
    setSearch,

    filteredTasks,
    filteredNotes,

    selectedTask,
    isModalOpen,
    setIsModalOpen,
    searchRef,
    handleUpdateTask,
    handleTaskClick,
    handleNoteClick,
  };
}
