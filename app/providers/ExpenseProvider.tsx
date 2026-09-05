"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/app/lib/supabaseClient";
import type { Expense } from "@/app/types/expenses";

type ExpenseContextType = {
  expenses: Expense[];
  loading: boolean;
  loadExpenses: () => Promise<void>;
  updateAmount: (id: number, amount: number) => Promise<void>;
  updateTitle: (id: number, title: string) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  createExpense: (title: string) => Promise<void>;
};

export const ExpenseContext = createContext<ExpenseContextType | null>(null);

type ExpenseProviderProps = {
  children: ReactNode;
};

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setExpenses([]);
        return;
      }

      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .order("order", { ascending: true });

      if (error) {
        console.error("Error al cargar los gastos", error);
        return;
      }

      const currentExpenses = (data ?? []) as Expense[];

      const outdatedExpenses = currentExpenses.filter(
        (expense) => expense.month !== month || expense.year !== year,
      );

      if (outdatedExpenses.length > 0) {
        const updatedExpenses = outdatedExpenses.map((expense) => ({
          ...expense,
          user_id: user.id,
          last_month_amount: expense.amount,
          amount: 0,
          status: "pending" as const,
          month,
          year,
          updated_at: new Date().toISOString(),
        }));

        const { error: resetError } = await supabase
          .from("expenses")
          .upsert(updatedExpenses, {
            onConflict: "id",
          });

        if (resetError) {
          console.error("Error al actualizar los gastos", resetError);
          return;
        }

        const updatedMap = new Map(
          updatedExpenses.map((expense) => [expense.id, expense]),
        );

        setExpenses(
          currentExpenses.map(
            (expense) => updatedMap.get(expense.id) ?? expense,
          ),
        );

        return;
      }

      setExpenses(currentExpenses);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const updateAmount = async (id: number, amount: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const { data, error } = await supabase
      .from("expenses")
      .update({
        amount,
        status: amount === 0 ? "pending" : "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .eq("month", month)
      .eq("year", year)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar el gasto", error);
      throw error;
    }

    setExpenses((current) =>
      current.map((expense) => (expense.id === id ? data : expense)),
    );
  };

  const updateTitle = async (id: number, title: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const { data, error } = await supabase
      .from("expenses")
      .update({
        title: title.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .eq("month", month)
      .eq("year", year)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar el gasto", error);
      throw error;
    }

    setExpenses((current) =>
      current.map((expense) => (expense.id === id ? data : expense)),
    );
  };

  const deleteExpense = async (id: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)
      .eq("month", month)
      .eq("year", year);

    if (error) {
      console.error("Error al eliminar el gasto", error);
      throw error;
    }

    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  const createExpense = async (title: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const now = new Date();

    const { data, error } = await supabase
      .from("expenses")
      .insert({
        user_id: user.id,
        title: title.trim(),
        amount: 0,
        last_month_amount: 0,
        status: "pending",
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error al crear el gasto", error);
      throw error;
    }

    setExpenses((current) => [...current, data]);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        loadExpenses,
        updateAmount,
        updateTitle,
        deleteExpense,
        createExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
