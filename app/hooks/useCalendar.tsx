"use client";

import { useContext, useMemo, useState } from "react";

import { CalendarContext } from "@/app/providers/CalendarProvider";
import {
  calendarDateFormatter,
  calendarDayFormatter,
  calendarMonthFormatter,
  getCalendarMonthLabel,
  getVisibleCalendarEvents,
} from "@/app/utils";

export function useCalendar() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendar must be used within CalendarProvider");
  }

  const { events, loading } = context;

  const [currentDate, setCurrentDate] = useState(new Date());

  const visibleEvents = useMemo(
    () => getVisibleCalendarEvents(events, currentDate),
    [events, currentDate],
  );

  const handleNextMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  };

  const handleCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const monthLabel = getCalendarMonthLabel(currentDate, calendarMonthFormatter);

  return {
    events,
    loading,
    visibleEvents,
    currentDate,
    monthLabel,
    dateFormatter: calendarDateFormatter,
    dayFormatter: calendarDayFormatter,
    monthFormatter: calendarMonthFormatter,
    handleCurrentMonth,
    handleNextMonth,
    handlePreviousMonth,
  };
}
