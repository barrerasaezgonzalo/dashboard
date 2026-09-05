"use client";

import { useEffect, useState } from "react";
import type { TaskModalProps } from "@/app/types";

export function useTaskModal({
  isOpen,
  onClose,
  task,
  onSubmit,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [important, setImportant] = useState(false);
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(task);

  const handleReset = () => {
    setTitle("");
    setSummary("");
    setDate("");
    setImportant(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    if (task) {
      setTitle(task.title);
      setSummary(task.summary ?? "");
      setDate(task.date ?? "");
      setImportant(task.important);
    } else {
      handleReset();
    }
  }, [isOpen, task]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim().length < 5) return;

    try {
      setSaving(true);
      await onSubmit({
        title: title.trim(),
        summary: summary.trim(),
        date,
        important,
      });

      handleReset();
      onClose();
    } catch (error) {
      console.error("Error al guardar la tarea", error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return {
    title,
    summary,
    date,
    important,
    saving,
    isEditing,
    setSummary,
    setDate,
    setImportant,
    handleTitleChange,
    handleSubmit,
    handleClose,
  };
}
