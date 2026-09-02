"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase";
import { errorLogger } from "@/app/lib/errorLogger";
import type { Expense } from "@/app/types/expenses";

type ExpenseContextType = {
  expenses: Expense[];
  loading: boolean;
  loadExpenses: () => Promise<void>;
  updateAmount: (id: number, amount: number) => Promise<void>;
};

export const ExpenseContext = createContext<ExpenseContextType | null>(null);

type ExpenseProviderProps = {
  children: ReactNode;
};

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = async () => {
    try {
      setLoading(true);

      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("order", { ascending: true });

      if (error) {
        errorLogger.logError("Error al cargar los gastos", error, {
          context: "ExpenseProvider",
          userMessage:
            "No se pudieron cargar los gastos. Por favor, recarga la página.",
        });
        return;
      }

      const currentExpenses = data ?? [];

      const outdatedExpenses = currentExpenses.filter(
        (expense) => expense.month !== month || expense.year !== year,
      );

      if (outdatedExpenses.length > 0) {
        await Promise.all(
          outdatedExpenses.map((expense) =>
            supabase
              .from("expenses")
              .update({
                last_month_amount: expense.amount,
                amount: 0,
                status: "pending",
                month,
                year,
                updated_at: new Date().toISOString(),
              })
              .eq("id", expense.id),
          ),
        );

        const { data: updatedExpenses, error: reloadError } = await supabase
          .from("expenses")
          .select("*")
          .order("title", { ascending: true });

        if (reloadError) {
          errorLogger.logError("Error al recargar los gastos", reloadError, {
            context: "ExpenseProvider",
            userMessage:
              "Error al actualizar los gastos. Por favor, recarga la página.",
          });
          return;
        }

        setExpenses(updatedExpenses ?? []);
        return;
      }

      setExpenses(currentExpenses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const updateAmount = async (id: number, amount: number) => {
    const { data, error } = await supabase
      .from("expenses")
      .update({
        amount,
        status: amount === 0 ? "pending" : "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      errorLogger.logError("Error al actualizar el gasto", error, {
        context: "ExpenseProvider",
        userMessage:
          "No se pudo actualizar el gasto. Por favor, intenta de nuevo.",
      });
      throw error;
    }

    setExpenses((current) =>
      current.map((expense) => (expense.id === id ? data : expense)),
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        loadExpenses,
        updateAmount,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
