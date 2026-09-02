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
  handleCloseModal: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  title: string;
  setTitle: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
  isEditing: boolean;
  summary: string;
  setSummary: (value: string) => void;
};

export type CalendarGroupProps = {
  events: CalendarEvent[];
  currentDate: Date;
  onPreviousMonth: () => void;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: number) => Promise<void>;
  dateFormatter: Intl.DateTimeFormat;
  dayFormatter: Intl.DateTimeFormat;
  monthFormatter: Intl.DateTimeFormat;
};
