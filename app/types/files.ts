import type { ChangeEvent } from "react";

export type FileItem = {
  id: string | null;
  name: string;
  url: string;
  type?: string;
};

export type FilesItemProps = {
  file: FileItem;
  setFileToDelete: (file: string) => void;
};

export type FilesListProps = {
  files: FileItem[];
  setFileToDelete: (file: string) => void;
};

export type FileUploadProps = {
  selectedFile: File | null;
  isUploading: boolean;
  setSelectedFile: (file: File | null) => void;
  uploadFile: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
