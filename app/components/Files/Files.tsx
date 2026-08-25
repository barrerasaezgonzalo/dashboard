"use client";

import { ChevronLeft, ChevronRight, File } from "lucide-react";
import { SectionHeader } from "../Ui/SectionHeader";
import { DashboardSection } from "../Ui/DashboardSection";
import { useHorizontalScroll } from "@/app/hooks/useHorizontalScroll";
import { useFiles } from "@/app/hooks/useFiles";
import { Toast } from "../Ui/Toast";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { FilesItem } from "./FilesItem";
import { FileUpload } from "./FileUpload";

export function Files() {
  const {
    handleFileChange,
    uploadFile,
    files,
    selectedFile,
    setSelectedFile,
    responseOperationMessage,
    isUploading,
    setFileToDelete,
    fileToDelete,
    deleteFile,
  } = useFiles();

  const { scrollContainerRef, scroll } = useHorizontalScroll();

  return (
    <DashboardSection
      id="files"
      header={
        <SectionHeader
          title="Archivos"
          description="Ten a mano lo que necesitas."
          icon={File}
          color="files"
        />
      }
    >
      <FileUpload
        selectedFile={selectedFile}
        isUploading={isUploading}
        setSelectedFile={setSelectedFile}
        uploadFile={uploadFile}
        handleFileChange={handleFileChange}
      />

      <div className="flex justify-end m-4 items-center gap-1">
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

      <div
        ref={scrollContainerRef}
        className="mx-4 grid grid-flow-col grid-rows-2 custom-scroll gap-3 overflow-x-auto scroll-smooth pb-2"
      >
        {files.map((file) => (
          <FilesItem
            key={file.id}
            file={file}
            setFileToDelete={setFileToDelete}
          />
        ))}
      </div>

      <Toast message={responseOperationMessage} />
      <ConfirmModal
        isOpen={fileToDelete !== null}
        title="Eliminar archivo"
        description="¿Estás seguro de que deseas eliminar este archivo?"
        variant="warning"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={() => setFileToDelete(null)}
        onConfirm={deleteFile}
      />
    </DashboardSection>
  );
}
