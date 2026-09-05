"use client";

import { ExpenseGroupProps } from "@/app/types/expenses";
import { ExpenseItem } from "./ExpenseItem";

export function ExpenseGroup({ expenses }: ExpenseGroupProps) {
  return (
    <div className="p-4">
      {expenses.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-20 items-center justify-center rounded-lg border border-dashed border-neutral-700">
          <p className="text-base text-neutral-500">
            No tienes gastos creados.
          </p>
        </div>
      )}
    </div>
  );
}
