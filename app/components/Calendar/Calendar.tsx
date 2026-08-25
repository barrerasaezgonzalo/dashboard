"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  SquarePen,
  SquarePlus,
  Trash2,
} from "lucide-react";

import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { CalendarModal } from "./CalendarModal";
import { useCalendar } from "@/app/hooks/useCalendar";
import { isDateOverdue, isToday, parseDateYMD } from "@/app/utils";
import { useState } from "react";
import { ConfirmModal } from "../Ui/ConfirmModal";

const monthFormatter = new Intl.DateTimeFormat("es-CL", {
  month: "long",
  year: "numeric",
});
const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "2-digit",
  month: "short",
});
const dayFormatter = new Intl.DateTimeFormat("es-CL", { weekday: "long" });
export function Calendar() {
  const {
    visibleEvents,
    currentDate,
    isModalOpen,
    title,
    date,
    time,
    setTitle,
    setDate,
    setTime,
    setIsModalOpen,
    handleNextMonth,
    handleSubmit,
    handlePreviousMonth,
    handleNewEvent,
    handleEditEvent,
    deleteEvent,
    handleCurrentMonth,
    selectedEvent,
  } = useCalendar();
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const monthLabel = monthFormatter.format(currentDate).replace(" de ", " ");
  return (
    <>
      <DashboardSection
        id="calendar"
        button={
          <button
            type="button"
            onClick={handleNewEvent}
            title="Nuevo Evento"
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-calendar/50 transition hover:border-calendar/80 hover:text-calendar/80"
          >
            <SquarePlus size={25} />
          </button>
        }
        header={
          <SectionHeader
            title="Calendario"
            description="Próximos eventos y recordatorios."
            icon={CalendarDays}
            color="calendar"
          />
        }
      >
        <div className="px-5 py-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium capitalize text-neutral-300">
              {monthLabel}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePreviousMonth}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 text-neutral-500 transition hover:border-neutral-500 hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={handleCurrentMonth}
                className="flex h-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 px-3 text-xs font-medium text-neutral-500 transition hover:border-calendar/60 hover:text-calendar"
              >
                Hoy
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 text-neutral-500 transition hover:border-neutral-500 hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {visibleEvents.length > 0 ? (
              visibleEvents.map((event) => {
                const eventDate = parseDateYMD(event.date);
                const overDue = isDateOverdue(event.date);
                if (!eventDate) {
                  return null;
                }
                const today = isToday(eventDate);

                return (
                  <div
                    key={event.id}
                    className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-neutral-700/40"
                  >
                    <div className="w-14 shrink-0 text-center">
                      <div
                        className={`text-xs font-medium capitalize ${
                          today
                            ? "text-sky-400"
                            : overDue
                              ? "text-orange-600"
                              : "text-neutral-400"
                        } `}
                      >
                        {dateFormatter.format(eventDate)}
                      </div>

                      <div className="mt-0.5 text-[10px] capitalize text-neutral-600">
                        {today ? "Hoy" : dayFormatter.format(eventDate)}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-neutral-300">
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
                        onClick={() => handleEditEvent(event)}
                        title="Editar evento"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-600 transition hover:bg-neutral-700 hover:text-white"
                      >
                        <SquarePen size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setEventToDelete(event.id)}
                        title="Eliminar evento"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-600 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-6 text-center text-base text-neutral-500">
                No hay eventos este mes.
              </div>
            )}
          </div>
        </div>

        <ConfirmModal
          isOpen={eventToDelete !== null}
          title="Eliminar evento"
          description="¿Estás seguro de que deseas eliminar este evento?"
          variant="warning"
          confirmText="Eliminar"
          cancelText="Cancelar"
          onClose={() => setEventToDelete(null)}
          onConfirm={() => {
            if (eventToDelete === null) return;

            deleteEvent(eventToDelete);
            setEventToDelete(null);
          }}
        />
      </DashboardSection>

      {isModalOpen && (
        <CalendarModal
          handleCloseModal={() => setIsModalOpen(false)}
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          isEditing={Boolean(selectedEvent)}
        />
      )}
    </>
  );
}
