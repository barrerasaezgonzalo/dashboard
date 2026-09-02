import { FilesItemProps } from "@/app/types";
import { X } from "lucide-react";
import Link from "next/link";

export function FilesItem({ file, setFileToDelete }: FilesItemProps) {
  return (
    <div
      key={file.id}
      className="relative flex h-32 w-32 shrink-0 flex-col justify-end overflow-hidden rounded-lg border border-neutral-700/60 bg-neutral-900/40 p-3 transition hover:border-neutral-600"
      style={
        file.type?.startsWith("image/")
          ? {
              backgroundImage: `url(${file.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              background: "linear-gradient(135deg, #cfcfcf, #8f8f8f)",
            }
      }
    >
      <button
        type="button"
        onClick={() => setFileToDelete(file.name)}
        className="absolute right-2 top-2 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-orange-700/80 text-neutral-300 transition hover:bg-orange-700/50 hover:text-orange-400"
        title="Eliminar archivo"
      >
        <X size={16} />
      </button>

      <Link href={file.url} target="_blank">
        <div className="relative z-10 -m-3 mt-auto bg-neutral-800/60 p-3 backdrop-blur-sm">
          <p
            title={file.name}
            className="line-clamp-2 break-words text-base font-medium leading-4 text-neutral-200"
          >
            {file.name}
          </p>
        </div>
      </Link>
    </div>
  );
}
