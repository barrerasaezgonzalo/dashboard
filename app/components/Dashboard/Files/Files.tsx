"use client";

import {
  ChevronLeft,
  ChevronRight,
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../../Ui/SectionHeader";
import { DashboardSection } from "../../Ui/DashboardSection";

type FileItem = {
  id: number;
  name: string;
  description: string;
  type: "pdf" | "image" | "sheet" | "other";
};

const files: FileItem[] = [
  {
    id: 1,
    name: "Plan semanal",
    description: "Plan de actividades de la semana.",
    type: "pdf",
  },
  {
    id: 2,
    name: "Ideas proyecto",
    description: "Referencias e ideas visuales.",
    type: "image",
  },
  {
    id: 3,
    name: "Gastos agosto",
    description: "Control de gastos del mes.",
    type: "sheet",
  },
  {
    id: 4,
    name: "Notas reunión",
    description: "Resumen de la última reunión.",
    type: "other",
  },
  {
    id: 5,
    name: "Documentación",
    description: "Información importante del proyecto.",
    type: "pdf",
  },
  {
    id: 6,
    name: "Diseño dashboard",
    description: "Capturas y referencias de interfaz.",
    type: "image",
  },
];

const ITEMS_PER_PAGE = 4;

export function Files() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);

  const start = page * ITEMS_PER_PAGE;

  const visibleFiles = files.slice(start, start + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setPage((current) => Math.max(current - 1, 0));
  };

  const handleNext = () => {
    setPage((current) => Math.min(current + 1, totalPages - 1));
  };

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
      <div className="mx-4 mt-4 flex items-center gap-2">
        <input
          type="file"
          className="border border-files rounded-lg w-full bg-neutral-900/60 p-3 text-sm leading-6 text-neutral-400 outline-none transition"
        />
        <button
          type="button"
          onClick={() => {}}
          title="Subir"
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg border bg-neutral-900/60 text-files/80 transition border-neutral-700 hover:border-files hover:text-files/80"
        >
          <Upload size={25} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 p-4">
        {visibleFiles.map((file) => (
          <div
            key={file.id}
            className="relative flex min-w-0 cursor-pointer items-start gap-3 rounded-lg border border-neutral-700/60 bg-neutral-900/20 p-3 pr-10 text-left transition hover:border-neutral-600 hover:bg-neutral-700/40"
          >
            <button
              type="button"
              onClick={() => {
                // eliminar archivo
              }}
              className="absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-neutral-500 transition hover:bg-red-500/10 hover:text-red-400"
              title="Eliminar archivo"
            >
              <X size={16} />
            </button>

            <FileIcon type={file.type} />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-200">
                {file.name}
              </p>

              <p className="mt-1 line-clamp-2 text-xs leading-4 text-neutral-500">
                {file.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex ml-auto items-center gap-1">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={page === 0}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-neutral-400 transition hover:border-sky-500/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-neutral-400 transition hover:border-sky-500/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </DashboardSection>
  );
}

function FileIcon({ type }: { type: FileItem["type"] }) {
  if (type === "pdf") {
    return <FileText size={25} className="mt-0.5 shrink-0 text-red-400" />;
  }
  if (type === "image") {
    return <FileImage size={25} className="mt-0.5 shrink-0 text-violet-400" />;
  }
  if (type === "sheet") {
    return (
      <FileSpreadsheet size={25} className="mt-0.5 shrink-0 text-green-400" />
    );
  }
  return <File size={25} className="mt-0.5 shrink-0 text-neutral-400" />;
}
