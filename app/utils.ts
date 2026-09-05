import { Dispatch, SetStateAction } from "react";
import { CalendarEvent } from "./types";

type DateFormat = "DMY" | "YMD";

function parseDateByFormat(value: string, format: DateFormat): Date | null {
  const parts = value.split("-").map(Number);

  if (parts.length !== 3 || parts.some((part) => !part)) {
    return null;
  }

  const [first, month, last] = parts;

  const year = format === "YMD" ? first : last;
  const day = format === "YMD" ? last : first;

  return new Date(year, month - 1, day);
}

export function isDateOverdue(date: string) {
  const taskDate = parseDateYMD(date);

  if (!taskDate) return false;

  const today = new Date();

  taskDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return taskDate < today;
}

export function parseDateYMD(value: string): Date | null {
  return parseDateByFormat(value, "YMD");
}

export function handleScrollTo(id: string) {
  const element = document.getElementById(id);

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  window.history.replaceState(null, "", `#${id}`);
}

export function isInvalidTitle(title: string, minLength = 5) {
  return title.trim().length < minLength;
}

export function getWeekKey(date = new Date()): string {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  const day = utcDate.getUTCDay() || 7;

  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day);

  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));

  const week = Math.ceil(
    ((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return `${utcDate.getUTCFullYear()}-${week}`;
}

export function isToday(date: Date) {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function showResponseMessage(
  setMessage: Dispatch<SetStateAction<string>>,
  message: string,
  duration = 4000,
) {
  setMessage(message);

  setTimeout(() => {
    setMessage("");
  }, duration);
}

export function getVisibleCalendarEvents(
  events: CalendarEvent[],
  currentDate: Date,
) {
  return events
    .filter((event) => {
      const eventDate = parseDateYMD(event.date);

      if (!eventDate) return false;

      return (
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    })
    .sort((a, b) => {
      const dateA = parseDateYMD(a.date)?.getTime() ?? 0;
      const dateB = parseDateYMD(b.date)?.getTime() ?? 0;

      return dateA - dateB;
    });
}

export function getCalendarMonthLabel(
  currentDate: Date,
  formatter: Intl.DateTimeFormat,
) {
  return formatter.format(currentDate).replace(" de ", " ");
}

export const calendarMonthFormatter = new Intl.DateTimeFormat("es-CL", {
  month: "long",
  year: "numeric",
});

export const calendarDateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "2-digit",
  month: "short",
});

export const calendarDayFormatter = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
});

export function parseExpenseAmount(value: string) {
  return value.replace(/\D/g, "").slice(0, 9);
}

export function formatExpenseAmount(amount: number) {
  return new Intl.NumberFormat("es-CL").format(amount);
}

export function formatExpenseCurrency(amount: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getExpenseTrend(
  currentAmount: number,
  lastMonthAmount: number,
) {
  const hasLastMonth = lastMonthAmount > 0;

  return {
    spentLess:
      hasLastMonth && currentAmount > 0 && currentAmount < lastMonthAmount,

    spentMore: hasLastMonth && currentAmount > lastMonthAmount,

    spentSame:
      hasLastMonth && currentAmount > 0 && currentAmount === lastMonthAmount,
  };
}
