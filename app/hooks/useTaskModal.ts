"use client";

import { useEffect, useState } from "react";
import type { TaskModalProps } from "@/app/types";

type FormErrors = {
  title?: string;
};

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(task);

  const handleReset = () => {
    setTitle("");
    setSummary("");
    setDate("");
    setImportant(false);
    setErrors({});
    setFormError("");
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

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!title.trim()) {
      newErrors.title = "El título es obligatorio.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setFormError("Revisa los campos obligatorios antes de guardar.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);

    if (errors.title) {
      setErrors((current) => ({
        ...current,
        title: undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

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
      console.error(error);
      setFormError("Ocurrió un error al guardar la tarea.");
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
    errors,
    formError,
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
