"use client";

import {
  ChevronLeft,
  ChevronRight,
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
  Plus,
} from "lucide-react";
import { useState } from "react";

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
    <section
      className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800"
      id="files"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-700 px-5 py-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <File size={20} className="text-sky-400" />
            Archivos
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Ten a mano lo que necesitas.
          </p>
        </div>

        <div className="flex items-center gap-1">
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

      <div className="grid grid-cols-2 gap-2 p-4">
        {visibleFiles.map((file) => (
          <button
            key={file.id}
            type="button"
            className="flex min-w-0 cursor-pointer items-start gap-3 rounded-lg border border-neutral-700/60 bg-neutral-900/20 p-3 text-left transition hover:border-neutral-600 hover:bg-neutral-700/40"
          >
            <FileIcon type={file.type} />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-200">
                {file.name}
              </p>

              <p className="mt-1 line-clamp-2 text-xs leading-4 text-neutral-500">
                {file.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 pb-4">
        <button
          type="button"
          onClick={() => {}}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-sky-500/10 px-2 py-3 text-xs font-medium text-sky-400 transition hover:bg-sky-500/20"
        >
          <Plus size={14} />
          Agregar archivo
        </button>
      </div>
    </section>
  );
}

function FileIcon({ type }: { type: FileItem["type"] }) {
  if (type === "pdf") {
    return <FileText size={18} className="mt-0.5 shrink-0 text-red-400" />;
  }

  if (type === "image") {
    return <FileImage size={18} className="mt-0.5 shrink-0 text-violet-400" />;
  }

  if (type === "sheet") {
    return (
      <FileSpreadsheet size={18} className="mt-0.5 shrink-0 text-green-400" />
    );
  }

  return <File size={18} className="mt-0.5 shrink-0 text-neutral-400" />;
}
