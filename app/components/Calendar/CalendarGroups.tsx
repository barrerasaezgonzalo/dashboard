"use client";

import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { isDateOverdue, isToday, parseDateYMD } from "@/app/utils";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { CalendarGroupProps } from "@/app/types/calendar";

export function CalendarGroup({
  events,
  currentDate,
  onPreviousMonth,
  onCurrentMonth,
  onNextMonth,
  onEdit,
  onDelete,
  dateFormatter,
  dayFormatter,
  monthFormatter,
}: CalendarGroupProps) {
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const monthLabel = monthFormatter.format(currentDate).replace(" de ", " ");

  return (
    <>
      <div className="px-5 py-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-base font-medium capitalize text-neutral-300">
            {monthLabel}
          </span>

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
        </div>

        {events.length > 0 ? (
          <div className="space-y-1">
            {events.map((event) => {
              const eventDate = parseDateYMD(event.date);

              if (!eventDate) return null;

              const today = isToday(eventDate);
              const overdue = isDateOverdue(event.date);

              return (
                <div
                  key={event.id}
                  className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-neutral-700/40"
                >
                  <div className="shrink-0 text-center">
                    <div
                      className={`text-base font-medium capitalize ${
                        today
                          ? "text-sky-400"
                          : overdue
                            ? "text-orange-600"
                            : "text-neutral-400"
                      }`}
                    >
                      {dateFormatter.format(eventDate)}
                    </div>
                  </div>

                  <div className="mt-0.5 text-sm capitalize text-neutral-400">
                    {today ? "Hoy" : dayFormatter.format(eventDate)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg text-neutral-300">
                      {event.title}
                    </p>
                  </div>

                  {event.time && (
                    <div className="flex shrink-0 items-center gap-1.5 text-xs text-neutral-500">
                      <Clock3 size={20} />
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
                      <SquarePen size={25} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEventToDelete(event.id)}
                      title="Eliminar evento"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-red-400"
                    >
                      <Trash2 size={25} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-20 items-center justify-center">
            <p className="text-base text-neutral-500">
              No hay eventos este mes.
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={eventToDelete !== null}
        title="Eliminar evento"
        description="¿Estás seguro de que deseas eliminar este evento?"
        variant="warning"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={() => setEventToDelete(null)}
        onConfirm={async () => {
          if (eventToDelete === null) return;

          await onDelete(eventToDelete);
          setEventToDelete(null);
        }}
      />
    </>
  );
}
