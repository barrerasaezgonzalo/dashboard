"use client";

import { SquarePlus, SquareText } from "lucide-react";

import { ConfirmModal } from "@/app/components/Ui/ConfirmModal";
import { useNote } from "@/app/hooks/useNote";

import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";
import { SectionHeader } from "../Ui/SectionHeader";
import { DashboardSection } from "../Ui/DashboardSection";
import { Toast } from "../Ui/Toast";

export function Notes() {
  const {
    notes,
    currentNote,
    title,
    content,
    important,
    isNewNote,
    isDeleteOpen,
    invalidTitle,
    disabledSave,
    scrollContainerRef,
    setTitle,
    setContent,
    scroll,
    handleSave,
    handleNewNote,
    handleSelectNote,
    handleDelete,
    handleImportant,
    handleOpenDelete,
    handleCloseDelete,
    responseOperationMessage,
  } = useNote();

  return (
    <>
      <DashboardSection
        id="notes"
        button={
          <button
            type="button"
            onClick={handleNewNote}
            title="Nueva nota"
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-notes/50 transition hover:border-notes/80 hover:text-notes/80"
          >
            <SquarePlus size={25} />
          </button>
        }
        header={
          <SectionHeader
            title="Notas"
            description="Escribe ideas rápidas!"
            icon={SquareText}
            color="notes"
          />
        }
      >
        <NoteForm
          currentNote={currentNote}
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
          currentNote={currentNote}
          isNewNote={isNewNote}
          scrollContainerRef={scrollContainerRef}
          scroll={scroll}
          handleSelectNote={handleSelectNote}
        />
      </DashboardSection>

      <ConfirmModal
        isOpen={isDeleteOpen}
        variant="warning"
        title="Eliminar nota"
        description="¿Estás seguro de que deseas eliminar esta nota? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
      />
      <Toast message={responseOperationMessage} />
    </>
  );
}
