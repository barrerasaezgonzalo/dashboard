"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/app/lib/supabaseClient";
import type { CalendarEvent } from "@/app/types";

type CalendarContextType = {
  events: CalendarEvent[];
  loading: boolean;
  loadEvents: () => Promise<void>;
  createEvent: (values: {
    title: string;
    date: string;
    time: string;
    summary: string;
  }) => Promise<CalendarEvent | null>;
  updateEvent: (
    id: number,
    values: {
      title: string;
      date: string;
      time: string;
      summary: string;
    },
  ) => Promise<CalendarEvent | null>;
  deleteEvent: (id: number) => Promise<boolean>;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);

type CalendarProviderProps = {
  children: ReactNode;
};

export function CalendarProvider({ children }: CalendarProviderProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setEvents([]);
        return;
      }

      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .eq("user_id", user.id)
        .order("date");

      if (error) {
        console.error("Error al cargar los eventos", error);
        return;
      }

      setEvents(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const createEvent = async (values: {
    title: string;
    date: string;
    time: string;
    summary: string;
  }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("calendar_events")
      .insert({
        user_id: user.id,
        title: values.title,
        date: values.date,
        time: values.time || null,
        summary: values.summary || "",
      })
      .select()
      .single();

    if (error) {
      console.error("Error al crear el evento", error);
      return null;
    }

    setEvents((current) => [...current, data]);

    return data;
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("calendar_events")
      .update({
        title: values.title,
        date: values.date,
        time: values.time || null,
        summary: values.summary || "",
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar el evento", error);
      return null;
    }

    setEvents((current) =>
      current.map((event) => (event.id === id ? data : event)),
    );

    return data;
  };

  const deleteEvent = async (id: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return false;
    }

    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error al eliminar el evento", error);
      return false;
    }

    setEvents((current) => current.filter((event) => event.id !== id));

    return true;
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        loading,
        loadEvents,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
