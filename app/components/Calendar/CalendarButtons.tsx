import { CalendarButtonsProps } from "@/app/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CalendarButtons({
  onPreviousMonth,
  onCurrentMonth,
  onNextMonth,
}: CalendarButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPreviousMonth}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-500 text-neutral-300 transition hover:border-neutral-500 hover:text-white"
      >
        <ChevronLeft size={16} />
      </button>

      <button
        type="button"
        onClick={onCurrentMonth}
        className="flex h-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-500 px-3 text-xs font-medium text-neutral-300 transition hover:border-orange-500/60 hover:text-orange-500"
      >
        Hoy
      </button>

      <button
        type="button"
        onClick={onNextMonth}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-500 text-neutral-300 transition hover:border-neutral-500 hover:text-white"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
