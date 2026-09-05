import type { FormEvent } from "react";

export type CalendarEvent = {
  id: number;
  user_id: string;
  title: string;
  date: string;
  time: string | null;
  summary: string | null;
};

export type CalendarModalProps = {
  isOpen: boolean;
  selectedEvent: CalendarEvent | null;
  title: string;
  date: string;
  time: string;
  summary: string;
  setTitle: (value: string) => void;
  setDate: (value: string) => void;
  setTime: (value: string) => void;
  setSummary: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export type CalendarGroupProps = {
  events: CalendarEvent[];
  onPreviousMonth: () => void;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: number) => Promise<void>;
  dateFormatter: Intl.DateTimeFormat;
  dayFormatter: Intl.DateTimeFormat;
  eventToDelete: number | null;
  setEventToDelete: (value: number | null) => void;
  monthLabel: string;
};

export type CalendarItemProps = {
  event: CalendarEvent;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: number) => void;
  dateFormatter: Intl.DateTimeFormat;
  dayFormatter: Intl.DateTimeFormat;
};

export type CalendarButtonsProps = {
  onPreviousMonth: () => void;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
};
