"use client";

import { FormEvent, useContext, useState } from "react";

import { CalendarContext } from "@/app/providers/CalendarProvider";
import type { CalendarEvent } from "@/app/types";
import { showResponseMessage } from "@/app/utils";

export function useCalendarActions() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendarActions must be used within CalendarProvider");
  }

  const { createEvent, updateEvent, deleteEvent } = context;

  const [responseOperationMessage, setResponseOperationMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [summary, setSummary] = useState("");
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  const resetForm = () => {
    setSelectedEvent(null);
    setTitle("");
    setDate("");
    setTime("");
    setSummary("");
  };

  const handleNewEvent = () => {
    resetForm();
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

  const handleCloseModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !date) {
      return;
    }

    if (selectedEvent) {
      const updatedEvent = await updateEvent(selectedEvent.id, {
        title: title.trim(),
        date,
        time,
        summary,
      });

      if (!updatedEvent) {
        return;
      }

      showResponseMessage(
        setResponseOperationMessage,
        "Evento actualizado correctamente.",
      );
    } else {
      const newEvent = await createEvent({
        title: title.trim(),
        date,
        time,
        summary,
      });

      if (!newEvent) {
        return;
      }

      showResponseMessage(
        setResponseOperationMessage,
        "Evento creado correctamente.",
      );
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteEvent = async (id: number) => {
    const deleted = await deleteEvent(id);

    if (!deleted) {
      return;
    }

    showResponseMessage(
      setResponseOperationMessage,
      "Evento eliminado correctamente.",
    );

    setEventToDelete(null);
  };

  return {
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
  };
}
