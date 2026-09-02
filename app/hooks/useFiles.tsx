"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { errorLogger } from "../lib/errorLogger";
import { useAuth } from "./useAuth";
import { FileItem } from "../types";

export function useFiles() {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseOperationMessage, setResponseOperationMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [fileId, setFileId] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setFileId(crypto.randomUUID());
  };

  async function uploadFile() {
    if (!selectedFile || !user || isUploading) return;
    setIsUploading(true);

    try {
      const path = `${user.id}/${fileId}-${selectedFile.name}`;
      const { error } = await supabase.storage
        .from("barrerasaez")
        .upload(path, selectedFile);
      if (error) {
        throw error;
      }
      setSelectedFile(null);
      setFileId("");
      setResponseOperationMessage("Archivo subido correctamente");
      setTimeout(() => {
        setResponseOperationMessage("");
      }, 4000);
      await loadFiles();
    } catch (error) {
      errorLogger.logError("Error al subir el archivo", error, {
        context: "useFiles",
        userMessage:
          "No se pudo subir el archivo. Por favor, intenta de nuevo.",
      });
      setResponseOperationMessage("No se pudo subir el archivo");
      setTimeout(() => {
        setResponseOperationMessage("");
      }, 4000);
    } finally {
      setIsUploading(false);
    }
  }

  const loadFiles = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase.storage
      .from("barrerasaez")
      .list(user.id);

    if (error) {
      errorLogger.logError("Error al cargar los archivos", error, {
        context: "useFiles",
        userMessage:
          "No se pudieron cargar los archivos. Por favor, recarga la página.",
      });
      return;
    }

    const filesWithUrl = data.map((file) => {
      const { data: urlData } = supabase.storage
        .from("barrerasaez")
        .getPublicUrl(`${user.id}/${file.name}`);

      return {
        id: file.id,
        name: file.name,
        url: urlData.publicUrl,
        type: file.metadata?.mimetype,
      };
    });

    setFiles(filesWithUrl);
  }, [user]);

  const deleteFile = async () => {
    if (!user || !fileToDelete) return;
    const path = `${user.id}/${fileToDelete}`;
    const { error } = await supabase.storage.from("barrerasaez").remove([path]);
    if (error) {
      errorLogger.logError("Error al eliminar el archivo", error, {
        context: "useFiles",
        userMessage:
          "No se pudo eliminar el archivo. Por favor, intenta de nuevo.",
      });
      return;
    }
    setResponseOperationMessage("Archivo eliminado correctamente");
    setTimeout(() => {
      setResponseOperationMessage("");
    }, 4000);
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file.name !== fileToDelete),
    );
    setFileToDelete(null);
  };

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  return {
    files,
    handleFileChange,
    uploadFile,
    selectedFile,
    setSelectedFile,
    responseOperationMessage,
    isUploading,
    setFileToDelete,
    fileToDelete,
    deleteFile,
  };
}
