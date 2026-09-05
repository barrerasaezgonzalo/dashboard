"use client";

import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";
import type { NoteFormProps, NoteListProps } from "@/app/types/notes";

type NoteGroupProps = NoteFormProps & NoteListProps;

export function NoteGroup({
  notes,
  selectedNote,
  title,
  content,
  important,
  isNewNote,
  invalidTitle,
  disabledSave,
  setTitle,
  setContent,
  handleSave,
  handleSelectNote,
  handleImportant,
  handleOpenDelete,
}: NoteGroupProps) {
  return (
    <>
      <NoteForm
        selectedNote={selectedNote}
        title={title}
        content={content}
        important={important}
        isNewNote={isNewNote}
        invalidTitle={invalidTitle}
        disabledSave={disabledSave}
        setTitle={setTitle}
        setContent={setContent}
        handleSave={handleSave}
        handleImportant={handleImportant}
        handleOpenDelete={handleOpenDelete}
      />

      <NoteList
        notes={notes}
        selectedNote={selectedNote}
        isNewNote={isNewNote}
        handleSelectNote={handleSelectNote}
      />
    </>
  );
}
