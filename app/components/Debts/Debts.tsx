"use client";

import { Wallet } from "lucide-react";

import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { ExpenseGroup } from "./ExpenseGroup";
import { useExpense } from "@/app/hooks/useExpense";

export function Debts() {
  const { expenses, updateAmount } = useExpense();

  return (
    <DashboardSection
      id="expenses"
      header={
        <SectionHeader
          title="Gastos"
          description="Controla tus pagos pendientes."
          icon={Wallet}
          color="indigo"
        />
      }
    >
      <ExpenseGroup expenses={expenses} onAmountChange={updateAmount} />
    </DashboardSection>
  );
}
