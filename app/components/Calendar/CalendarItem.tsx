"use client";

import { SquarePen, Trash2 } from "lucide-react";
import { isDateOverdue, isToday, parseDateYMD } from "@/app/utils";
import type { CalendarItemProps } from "@/app/types";

export function CalendarItem({
  event,
  onEdit,
  onDelete,
  dateFormatter,
  dayFormatter,
}: CalendarItemProps) {
  const eventDate = parseDateYMD(event.date);
  if (!eventDate) {
    return null;
  }
  const today = isToday(eventDate);
  const overdue = isDateOverdue(event.date);

  return (
    <div className="mb-1 flex min-w-0 items-center gap-2 rounded-lg border border-white/20 px-3 py-1 transition hover:bg-neutral-700/40">
      <div className="shrink-0 text-center">
        <div
          className={`text-sm capitalize ${
            today
              ? "text-sky-400"
              : overdue
                ? "text-red-400"
                : "text-neutral-400"
          }`}
        >
          {dateFormatter.format(eventDate)}
        </div>
      </div>

      <div className="text-sm capitalize text-neutral-400">
        {today ? "Hoy" : dayFormatter.format(eventDate)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-neutral-300">{event.title}</p>
      </div>

      {event.time && (
        <div className="flex shrink-0 items-center gap-1.5 text-xs text-neutral-500">
          {event.time}
        </div>
      )}
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit(event)}
          title="Editar evento"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-white"
        >
          <SquarePen size={18} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(event.id)}
          title="Eliminar evento"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-red-400"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
