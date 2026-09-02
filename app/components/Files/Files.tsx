"use client";

import { File } from "lucide-react";

import { SectionHeader } from "../Ui/SectionHeader";
import { DashboardSection } from "../Ui/DashboardSection";
import { useFiles } from "@/app/hooks/useFiles";
import { Toast } from "../Ui/Toast";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { FileUpload } from "./FileUpload";
import { FilesList } from "./FilesList";

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

  return (
    <DashboardSection
      id="files"
      header={
        <SectionHeader
          title="Archivos"
          description="Ten a mano lo que necesitas."
          icon={File}
          color="gray"
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

      <FilesList files={files} setFileToDelete={setFileToDelete} />

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
