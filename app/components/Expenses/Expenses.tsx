"use client";

import { SquarePlus, Wallet } from "lucide-react";
import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { ExpenseGroup } from "./ExpenseGroup";
import { useExpense } from "@/app/hooks/useExpense";
import { SectionActionButton } from "../Ui/SectionActionButton";
import { ExpenseModal } from "./ExpenseModal";

export function Expenses() {
  const {
    expenses,
    newTitle,
    setNewTitle,
    isCreateOpen,
    setIsCreateOpen,
    handleCreate,
  } = useExpense();

  return (
    <DashboardSection
      id="expenses"
      button={
        <SectionActionButton
          onClick={() => setIsCreateOpen(true)}
          icon={SquarePlus}
          color="indigo"
        />
      }
      header={<SectionHeader title="Gastos" icon={Wallet} color="indigo" />}
    >
      <ExpenseGroup expenses={expenses} />

      <ExpenseModal
        isOpen={isCreateOpen}
        title={newTitle}
        setTitle={setNewTitle}
        onClose={() => {
          setIsCreateOpen(false);
          setNewTitle("");
        }}
        onSubmit={handleCreate}
      />
    </DashboardSection>
  );
}
