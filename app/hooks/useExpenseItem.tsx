"use client";

import { useContext, useEffect, useState } from "react";

import { ExpenseContext } from "@/app/providers/ExpenseProvider";
import type { Expense } from "@/app/types/expenses";
import {
  formatExpenseAmount,
  formatExpenseCurrency,
  getExpenseTrend,
  parseExpenseAmount,
} from "@/app/utils";

export function useExpenseItem(expense: Expense) {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpenseItem must be used within ExpenseProvider");
  }

  const [amount, setAmount] = useState(
    expense.amount > 0 ? String(expense.amount) : "",
  );

  const [title, setTitle] = useState(expense.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const numericAmount = Number(amount) || 0;
  const currentAmount = Number(expense.amount) || 0;
  const lastMonthAmount = Number(expense.last_month_amount) || 0;

  const hasChanges = numericAmount !== currentAmount;
  const titleHasChanges = title.trim() !== expense.title.trim();
  const isPaid = expense.status === "paid";

  const { spentLess, spentMore, spentSame } = getExpenseTrend(
    currentAmount,
    lastMonthAmount,
  );

  const formattedAmount = amount ? formatExpenseAmount(numericAmount) : "";

  const formattedLastMonth = formatExpenseCurrency(lastMonthAmount);

  useEffect(() => {
    setAmount(expense.amount > 0 ? String(expense.amount) : "");

    setTitle(expense.title);
  }, [expense]);

  const handleAmountChange = (value: string) => {
    setAmount(parseExpenseAmount(value));
  };

  const handleSaveAmount = async () => {
    await context.updateAmount(expense.id, numericAmount);
  };

  const handleOpenEdit = () => {
    setTitle(expense.title);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setTitle(expense.title);
    setIsEditing(false);
  };

  const handleSaveTitle = async () => {
    if (!title.trim() || !titleHasChanges) return;

    await context.updateTitle(expense.id, title.trim());

    setIsEditing(false);
  };

  const handleDelete = async () => {
    await context.deleteExpense(expense.id);
    setIsDeleteOpen(false);
  };

  return {
    title,
    setTitle,
    isEditing,
    isDeleteOpen,
    setIsDeleteOpen,
    formattedAmount,
    formattedLastMonth,
    hasChanges,
    titleHasChanges,
    isPaid,
    spentLess,
    spentMore,
    spentSame,
    handleAmountChange,
    handleSaveAmount,
    handleOpenEdit,
    handleCancelEdit,
    handleSaveTitle,
    handleDelete,
  };
}
