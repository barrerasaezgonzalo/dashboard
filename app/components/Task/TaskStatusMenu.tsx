import { X } from "lucide-react";
import type { TaskStatusMenuProps } from "../../types";

export function TaskStatusMenu({
  taskId,
  options,
  onChangeStatus,
  onClose,
}: TaskStatusMenuProps) {
  return (
    <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-3">
      {options.map((option) => (
        <button
          key={option.status}
          type="button"
          onClick={() => {
            onChangeStatus(taskId, option.status);

            onClose();
          }}
          className={[
            "cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition hover:opacity-80",
            option.className,
          ].join(" ")}
        >
          {option.title}
        </button>
      ))}

      <button
        type="button"
        onClick={onClose}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-700 hover:text-white"
        title="Cancelar"
        aria-label="Cancelar"
      >
        <X size={13} />
      </button>
    </div>
  );
}
