"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { parseDateYMD } from "@/app/utils";
import { supabase } from "@/app/lib/supabase";
import { CalendarEvent } from "../types";

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("date");

    if (error) {
      console.error(error);
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
  }: {
    title: string;
    date: string;
    time: string;
  }) => {
    const { data, error } = await supabase
      .from("calendar_events")
      .insert({
        title,
        date,
        time: time || null,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setEvents((currentEvents) => [...currentEvents, data]);
  };

  const updateEvent = async (
    id: number,
    values: {
      title: string;
      date: string;
      time: string;
    },
  ) => {
    const { data, error } = await supabase
      .from("calendar_events")
      .update({
        title: values.title,
        date: values.date,
        time: values.time || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

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
      console.error(error);
      return;
    }

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
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setTime(event.time ?? "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !date) {
      return;
    }

    if (selectedEvent) {
      await updateEvent(selectedEvent.id, {
        title: title.trim(),
        date,
        time,
      });
    } else {
      await createEvent({
        title: title.trim(),

        date,
        time,
      });
    }

    setSelectedEvent(null);
    setTitle("");
    setDate("");
    setTime("");
    setIsModalOpen(false);
  };

  return {
    events,
    visibleEvents,
    currentDate,
    isModalOpen,
    selectedEvent,
    title,
    date,
    time,

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
  };
}
