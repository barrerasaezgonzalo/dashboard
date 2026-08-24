"use client";

import { useContext, useEffect, useState } from "react";

import { ExpenseContext } from "@/app/providers/ExpenseProvider";

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense debe usarse dentro de ExpenseProvider");
  }

  const {
    expenses,
    updateExpenseStatus,
    updateExpensePaidAmount,
    allExpenses,
  } = context;

  const [amounts, setAmounts] = useState<Record<number, string>>({});

  const pendingExpenses = expenses.filter(
    (expense) => expense.status === "pending",
  );

  useEffect(() => {
    const initialAmounts = expenses.reduce(
      (accumulator, expense) => {
        accumulator[expense.id] =
          expense.paid_amount > 0 ? String(expense.paid_amount) : "";

        return accumulator;
      },
      {} as Record<number, string>,
    );

    setAmounts(initialAmounts);
  }, [expenses]);

  const handleAmountChange = (id: number, value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    setAmounts((current) => ({
      ...current,
      [id]: value,
    }));
  };

  const handlePaid = async (id: number, status: "pending" | "paid") => {
    const amount = Number(amounts[id]);

    if (!amount || amount < 1) {
      return;
    }

    await updateExpensePaidAmount(id, amount);

    if (status === "pending") {
      await updateExpenseStatus(id, "paid");
    }
  };

  return {
    expenses,
    pendingExpenses,
    amounts,
    handleAmountChange,
    handlePaid,
    allExpenses,
  };
}
