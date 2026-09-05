"use client";

import { ConfirmModal } from "../Ui/ConfirmModal";
import { CalendarGroupProps } from "@/app/types/calendar";
import { CalendarItem } from "./CalendarItem";
import { CalendarButtons } from "./CalendarButtons";

export function CalendarGroup({
  events,
  onPreviousMonth,
  onCurrentMonth,
  onNextMonth,
  onEdit,
  onDelete,
  dateFormatter,
  dayFormatter,
  eventToDelete,
  setEventToDelete,
  monthLabel,
}: CalendarGroupProps) {
  return (
    <>
      <div className="px-3 py-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium capitalize text-neutral-300">
            {monthLabel}
          </span>

          <CalendarButtons
            onPreviousMonth={onPreviousMonth}
            onCurrentMonth={onCurrentMonth}
            onNextMonth={onNextMonth}
          />
        </div>

        {events.length > 0 ? (
          <div className="mt-2">
            {events.map((event) => (
              <CalendarItem
                key={event.id}
                event={event}
                onEdit={onEdit}
                onDelete={setEventToDelete}
                dateFormatter={dateFormatter}
                dayFormatter={dayFormatter}
              />
            ))}
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
        onClose={() => setEventToDelete}
        onConfirm={async () => {
          if (eventToDelete === null) return;
          await onDelete(eventToDelete);
          setEventToDelete(null);
        }}
      />
    </>
  );
}
