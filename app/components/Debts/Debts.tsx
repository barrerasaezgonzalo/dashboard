"use client";

import { Wallet } from "lucide-react";

import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { useExpense } from "@/app/hooks/useExpense";
import { ExpenseItem } from "./ExpenseItem";

export function Debts() {
  const { pendingExpenses, expenses, amounts, handleAmountChange, handlePaid } =
    useExpense();

  return (
    <DashboardSection
      id="expenses"
      header={
        <SectionHeader
          title="Gastos"
          description="Controla tus pagos pendientes."
          icon={Wallet}
          color="debts"
        />
      }
    >
      <div className="mx-4 flex items-center justify-between pt-4">
        <p className="text-sm text-neutral-500">
          {pendingExpenses.length} de {expenses.length} pagos pendientes
        </p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              amount={amounts[expense.id] ?? ""}
              onAmountChange={handleAmountChange}
              onPaid={handlePaid}
            />
          ))}
        </div>
      </div>
    </DashboardSection>
  );
}
