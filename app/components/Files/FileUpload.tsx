import { FileUploadProps } from "@/app/types";
import { UploadCloud } from "lucide-react";

export function FileUpload({
  selectedFile,
  isUploading,
  setSelectedFile,
  uploadFile,
  handleFileChange,
}: FileUploadProps) {
  return (
    <div className="m-4 rounded-lg border border-dashed border-files/50 bg-neutral-900/40 p-4">
      {!selectedFile ? (
        <label
          htmlFor="file-upload"
          className={`flex cursor-pointer items-center justify-center gap-2 text-sm text-neutral-400 transition hover:text-files
              ${
                isUploading ? "pointer-events-none opacity-50" : ""
              }                
              `}
        >
          <UploadCloud size={20} />
          Haz clic para seleccionar un archivo
        </label>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-sm text-neutral-300">
            {selectedFile.name}
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="rounded-lg px-3 py-2 text-xs text-neutral-500 transition hover:text-white"
            >
              Quitar
            </button>

            <button
              type="button"
              onClick={uploadFile}
              disabled={isUploading}
              className="rounded-lg border border-files/50 px-3 py-2 text-xs font-medium text-files transition hover:border-files"
            >
              {isUploading ? "Subiendo..." : "Subir"}
            </button>
          </div>
        </div>
      )}

      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
