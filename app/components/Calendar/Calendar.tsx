"use client";

import { CalendarDays, SquarePlus } from "lucide-react";

import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { SectionActionButton } from "../Ui/SectionActionButton";
import { Toast } from "../Ui/Toast";

import { useCalendar } from "@/app/hooks/useCalendar";
import { useCalendarActions } from "@/app/hooks/useCalendarActions";

import { CalendarModal } from "./CalendarModal";
import { CalendarGroup } from "./CalendarGroup";

export function Calendar() {
  const {
    visibleEvents,
    monthLabel,
    dateFormatter,
    dayFormatter,
    handleCurrentMonth,
    handleNextMonth,
    handlePreviousMonth,
  } = useCalendar();

  const {
    responseOperationMessage,
    isModalOpen,
    selectedEvent,
    title,
    date,
    time,
    summary,
    eventToDelete,
    setTitle,
    setDate,
    setTime,
    setSummary,
    setEventToDelete,
    handleNewEvent,
    handleEditEvent,
    handleCloseModal,
    handleSubmit,
    handleDeleteEvent,
  } = useCalendarActions();

  return (
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
        <SectionHeader title="Calendario" icon={CalendarDays} color="orange" />
      }
    >
      <CalendarGroup
        events={visibleEvents}
        monthLabel={monthLabel}
        onPreviousMonth={handlePreviousMonth}
        onCurrentMonth={handleCurrentMonth}
        onNextMonth={handleNextMonth}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        eventToDelete={eventToDelete}
        setEventToDelete={setEventToDelete}
        dateFormatter={dateFormatter}
        dayFormatter={dayFormatter}
      />

      <CalendarModal
        isOpen={isModalOpen}
        selectedEvent={selectedEvent}
        title={title}
        date={date}
        time={time}
        summary={summary}
        setTitle={setTitle}
        setDate={setDate}
        setTime={setTime}
        setSummary={setSummary}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <Toast message={responseOperationMessage} />
    </DashboardSection>
  );
}
