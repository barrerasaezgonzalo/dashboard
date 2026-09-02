"use client";

import { useContext, useEffect, useState } from "react";
import { HabitContext } from "@/app/providers/HabitProvider";
import { Habit, HabitDayStatus } from "../types";
import { showResponseMessage } from "../utils";

export function useHabit() {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error("useHabit debe usarse dentro de HabitProvider");
  }

  const {
    habits,
    loading,
    createHabit,
    updateHabit,
    updateHabitCompleted,
    deleteHabit,
  } = context;

  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [responseOperationMessage, setResponseOperationMessage] = useState("");
  const [name, setName] = useState("");
  const [days, setDays] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [saving, setSaving] = useState(false);

  const today = new Date();
  const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;

  const invalidHabit = name.trim().length < 3 || !days.some(Boolean);

  const availableUntilToday = habits.flatMap((habit) =>
    habit.days.map((enabled, index) => ({
      enabled,
      status: habit.completed[index],
      index,
    })),
  );

  const totalAvailable = availableUntilToday.filter(
    (day) => day.enabled && day.index <= currentDay,
  ).length;

  const totalCompleted = availableUntilToday.filter(
    (day) =>
      day.enabled && day.status === "completed" && day.index <= currentDay,
  ).length;

  const progress =
    totalAvailable > 0
      ? Math.round((totalCompleted / totalAvailable) * 100)
      : 0;

  const handleToggleCompleted = async (habit: Habit, index: number) => {
    const completed: HabitDayStatus[] = habit.completed.map(
      (status, dayIndex) => {
        if (dayIndex !== index) {
          return status;
        }

        if (status === "pending") {
          return "completed";
        }

        if (status === "completed") {
          return "failed";
        }

        return "pending";
      },
    );

    await updateHabitCompleted(habit.id, completed);
  };

  const handleToggleDay = (index: number) => {
    setDays((current) =>
      current.map((day, dayIndex) => (dayIndex === index ? !day : day)),
    );
  };

  const handleOpenCreate = () => {
    setSelectedHabit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHabit(null);
  };

  const handleSaveHabit = async () => {
    if (invalidHabit || saving) {
      return;
    }

    setSaving(true);

    if (selectedHabit) {
      await updateHabit(selectedHabit.id, {
        name: name.trim(),
        days,
      });

      showResponseMessage(
        setResponseOperationMessage,
        "Hábito actualizado correctamente.",
      );
    } else {
      await createHabit({
        name: name.trim(),
        days,
      });

      showResponseMessage(
        setResponseOperationMessage,
        "Hábito creado correctamente.",
      );
    }

    setSaving(false);
    setIsModalOpen(false);
    setSelectedHabit(null);
  };

  const handleDeleteHabit = async () => {
    if (!selectedHabit) {
      return;
    }

    await deleteHabit(selectedHabit.id);

    showResponseMessage(
      setResponseOperationMessage,
      "Hábito eliminado correctamente.",
    );

    setSelectedHabit(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    if (selectedHabit) {
      setName(selectedHabit.name);
      setDays(selectedHabit.days);
      return;
    }

    setName("");
    setDays([false, false, false, false, false, false, false]);
  }, [selectedHabit, isModalOpen]);

  return {
    habits,
    loading,
    progress,
    currentDay,
    selectedHabit,
    setSelectedHabit,
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    responseOperationMessage,
    name,
    setName,
    days,
    saving,
    invalidHabit,
    handleToggleCompleted,
    handleToggleDay,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseModal,
    handleSaveHabit,
    handleDeleteHabit,
  };
}
