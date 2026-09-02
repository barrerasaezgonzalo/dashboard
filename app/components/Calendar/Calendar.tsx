"use client";

import { CalendarDays, SquarePlus } from "lucide-react";
import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { CalendarModal } from "./CalendarModal";
import { useCalendar } from "@/app/hooks/useCalendar";
import { Toast } from "../Ui/Toast";
import { SectionActionButton } from "../Ui/SectionActionButton";
import { CalendarGroup } from "./CalendarGroups";

export function Calendar() {
  const {
    visibleEvents,
    currentDate,
    isModalOpen,
    title,
    date,
    time,
    setTitle,
    summary,
    setSummary,
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
    responseOperationMessage,
    dateFormatter,
    dayFormatter,
    monthFormatter,
  } = useCalendar();

  return (
    <>
      <DashboardSection
        id="calendar"
        button={
          <SectionActionButton
            onClick={handleNewEvent}
            icon={SquarePlus}
            color="orange"
          />
        }
        header={
          <SectionHeader
            title="Calendario"
            description="Próximos eventos y recordatorios."
            icon={CalendarDays}
            color="orange"
          />
        }
      >
        <CalendarGroup
          events={visibleEvents}
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onCurrentMonth={handleCurrentMonth}
          onNextMonth={handleNextMonth}
          onEdit={handleEditEvent}
          onDelete={deleteEvent}
          dateFormatter={dateFormatter}
          dayFormatter={dayFormatter}
          monthFormatter={monthFormatter}
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
          summary={summary}
          setSummary={setSummary}
        />
      )}

      <Toast message={responseOperationMessage} />
    </>
  );
}
