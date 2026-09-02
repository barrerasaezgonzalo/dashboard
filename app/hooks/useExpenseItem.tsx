"use client";

import { useEffect, useState } from "react";
import type { UseExpenseItemProps } from "@/app/types/expenses";

export function useExpenseItem({
  expense,
  onAmountChange,
}: UseExpenseItemProps) {
  const [amount, setAmount] = useState(
    expense.amount > 0 ? String(expense.amount) : "",
  );

  const numericAmount = Number(amount) || 0;
  const currentAmount = Number(expense.amount) || 0;
  const lastMonthAmount = Number(expense.last_month_amount) || 0;

  const hasChanges = numericAmount !== currentAmount;
  const isPaid = expense.status === "paid";
  const hasLastMonth = lastMonthAmount > 0;

  const spentLess =
    hasLastMonth && currentAmount > 0 && currentAmount < lastMonthAmount;

  const spentMore = hasLastMonth && currentAmount > lastMonthAmount;

  const spentSame =
    hasLastMonth && currentAmount > 0 && currentAmount === lastMonthAmount;

  const formattedAmount = amount
    ? new Intl.NumberFormat("es-CL").format(numericAmount)
    : "";

  const formattedLastMonth = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(lastMonthAmount);

  useEffect(() => {
    setAmount(expense.amount > 0 ? String(expense.amount) : "");
  }, [expense.amount]);

  const handleAmountChange = (value: string) => {
    setAmount(value.replace(/\D/g, "").slice(0, 9));
  };

  const handleSave = async () => {
    await onAmountChange(expense.id, numericAmount);
  };

  return {
    formattedAmount,
    formattedLastMonth,
    hasChanges,
    isPaid,
    spentLess,
    spentMore,
    spentSame,
    handleAmountChange,
    handleSave,
  };
}
