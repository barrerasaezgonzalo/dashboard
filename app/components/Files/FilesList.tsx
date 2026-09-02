"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useHorizontalScroll } from "@/app/hooks/useHorizontalScroll";
import { FilesListProps } from "@/app/types/files";
import { FilesItem } from "./FilesItem";

export function FilesList({ files, setFileToDelete }: FilesListProps) {
  const { scrollContainerRef, scroll } = useHorizontalScroll();

  return (
    <>
      <div className="m-4 flex items-center justify-end gap-1">
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
        className="custom-scroll mx-4 grid grid-flow-col grid-rows-2 gap-3 overflow-x-auto scroll-smooth pb-2"
      >
        {files.map((file) => (
          <FilesItem
            key={file.id}
            file={file}
            setFileToDelete={setFileToDelete}
          />
        ))}
      </div>
    </>
  );
}
