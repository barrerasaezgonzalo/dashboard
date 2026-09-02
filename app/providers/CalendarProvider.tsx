"use client";

import {
  createContext,
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "@/app/lib/supabase";
import { errorLogger } from "@/app/lib/errorLogger";
import { parseDateYMD, showResponseMessage } from "@/app/utils";
import type { CalendarEvent } from "@/app/types";

type CalendarContextType = {
  events: CalendarEvent[];
  visibleEvents: CalendarEvent[];
  currentDate: Date;
  isModalOpen: boolean;
  selectedEvent: CalendarEvent | null;
  title: string;
  date: string;
  time: string;
  summary: string;
  responseOperationMessage: string;
  dateFormatter: Intl.DateTimeFormat;
  dayFormatter: Intl.DateTimeFormat;
  monthFormatter: Intl.DateTimeFormat;
  setSummary: (value: string) => void;
  setTitle: (value: string) => void;
  setDate: (value: string) => void;
  setTime: (value: string) => void;
  setIsModalOpen: (value: boolean) => void;
  handleCurrentMonth: () => void;
  handleNextMonth: () => void;
  handlePreviousMonth: () => void;
  handleNewEvent: () => void;
  handleEditEvent: (event: CalendarEvent) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);

type CalendarProviderProps = {
  children: ReactNode;
};

export function CalendarProvider({ children }: CalendarProviderProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [responseOperationMessage, setResponseOperationMessage] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [summary, setSummary] = useState("");

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("date");

    if (error) {
      errorLogger.logError("Error al cargar los eventos", error, {
        context: "CalendarProvider",
        userMessage:
          "No se pudieron cargar los eventos. Por favor, recarga la página.",
      });
      return;
    }

    setEvents(data ?? []);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const visibleEvents = useMemo(() => {
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
  }, [events, currentDate]);

  const createEvent = async ({
    title,
    date,
    time,
    summary,
  }: {
    title: string;
    date: string;
    time: string;
    summary: string;
  }) => {
    const { data, error } = await supabase
      .from("calendar_events")
      .insert({
        title,
        date,
        time: time || null,
        summary: summary || "",
      })
      .select()
      .single();

    if (error) {
      errorLogger.logError("Error al crear el evento", error, {
        context: "CalendarProvider",
        userMessage: "No se pudo crear el evento. Por favor, intenta de nuevo.",
      });
      return;
    }

    showResponseMessage(
      setResponseOperationMessage,
      "Evento creado correctamente.",
    );

    setEvents((currentEvents) => [...currentEvents, data]);
  };

  const updateEvent = async (
    id: number,
    values: {
      title: string;
      date: string;
      time: string;
      summary: string;
    },
  ) => {
    const { data, error } = await supabase
      .from("calendar_events")
      .update({
        title: values.title,
        date: values.date,
        time: values.time || null,
        summary: values.summary || "",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      errorLogger.logError("Error al actualizar el evento", error, {
        context: "CalendarProvider",
        userMessage:
          "No se pudo actualizar el evento. Por favor, intenta de nuevo.",
      });
      return;
    }

    showResponseMessage(
      setResponseOperationMessage,
      "Evento actualizado correctamente.",
    );

    setEvents((currentEvents) =>
      currentEvents.map((event) => (event.id === id ? data : event)),
    );
  };

  const deleteEvent = async (id: number) => {
    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", id);

    if (error) {
      errorLogger.logError("Error al eliminar el evento", error, {
        context: "CalendarProvider",
        userMessage:
          "No se pudo eliminar el evento. Por favor, intenta de nuevo.",
      });
      return;
    }

    showResponseMessage(
      setResponseOperationMessage,
      "Evento eliminado correctamente.",
    );

    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const handleNewEvent = () => {
    setSelectedEvent(null);
    setTitle("");
    setDate("");
    setTime("");
    setSummary("");
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setTime(event.time ?? "");
    setSummary(event.summary ?? "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !date) return;

    if (selectedEvent) {
      await updateEvent(selectedEvent.id, {
        title: title.trim(),
        date,
        time,
        summary,
      });
    } else {
      await createEvent({
        title: title.trim(),
        date,
        time,
        summary,
      });
    }

    setSelectedEvent(null);
    setTitle("");
    setDate("");
    setTime("");
    setSummary("");
    setIsModalOpen(false);
  };

  const monthFormatter = new Intl.DateTimeFormat("es-CL", {
    month: "long",
    year: "numeric",
  });

  const dateFormatter = new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
  });

  const dayFormatter = new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
  });

  return (
    <CalendarContext.Provider
      value={{
        events,
        visibleEvents,
        currentDate,
        isModalOpen,
        selectedEvent,
        title,
        date,
        time,
        summary,
        responseOperationMessage,
        dateFormatter,
        dayFormatter,
        monthFormatter,
        setSummary,
        setTitle,
        setDate,
        setTime,
        setIsModalOpen,
        handleCurrentMonth,
        handleNextMonth,
        handlePreviousMonth,
        handleNewEvent,
        handleEditEvent,
        handleSubmit,
        deleteEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
