"use client";

import { SquarePlus, SquareText } from "lucide-react";
import { ConfirmModal } from "@/app/components/Ui/ConfirmModal";
import { useNote } from "@/app/hooks/useNote";
import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";
import { SectionHeader } from "../Ui/SectionHeader";
import { DashboardSection } from "../Ui/DashboardSection";
import { Toast } from "../Ui/Toast";
import { SectionActionButton } from "../Ui/SectionActionButton";

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
    setTitle,
    setContent,
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
          <SectionActionButton
            onClick={handleNewNote}
            icon={SquarePlus}
            color="amber"
          />
        }
        header={
          <SectionHeader
            title="Notas"
            description="Escribe ideas rápidas!"
            icon={SquareText}
            color="amber"
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
