"use client";

import { useContext, useState } from "react";

import { ExpenseContext } from "@/app/providers/ExpenseProvider";

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense must be used within ExpenseProvider");
  }

  const [newTitle, setNewTitle] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;

    await context.createExpense(newTitle.trim());

    setNewTitle("");
    setIsCreateOpen(false);
  };

  const handleCloseCreate = () => {
    setNewTitle("");
    setIsCreateOpen(false);
  };

  return {
    expenses: context.expenses,
    loading: context.loading,
    newTitle,
    setNewTitle,
    isCreateOpen,
    setIsCreateOpen,
    handleCreate,
    handleCloseCreate,
  };
}
