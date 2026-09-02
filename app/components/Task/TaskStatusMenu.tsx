import { TaskStatusMenuProps } from "@/app/types/tasks";
import { X } from "lucide-react";

export function TaskStatusMenu({
  taskId,
  options,
  onChangeStatus,
  onClose,
}: TaskStatusMenuProps) {
  return (
    <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3">
      {options.map((option) => (
        <button
          key={option.status}
          type="button"
          onClick={() => {
            onChangeStatus(taskId, option.status);
            onClose();
          }}
          className={[
            "cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition hover:opacity-80",
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
      >
        <X size={15} />
      </button>
    </div>
  );
}
