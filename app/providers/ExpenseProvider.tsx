"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/hooks/useAuth";
import { Expense, ExpenseStatus } from "../types";

type ExpenseContextType = {
  expenses: Expense[];
  loading: boolean;
  allExpenses: Expense[];
  updateExpenseStatus: (id: number, status: ExpenseStatus) => Promise<void>;
  updateExpensePaidAmount: (id: number, paidAmount: number) => Promise<void>;
};

export const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = useCallback(async () => {
    if (!user) {
      setExpenses([]);
      setLoading(false);

      return;
    }

    setLoading(true);

    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id)
      .eq("month", month)
      .eq("year", year)
      .order("id");

    if (error) {
      console.error("Error loading expenses:", error);

      setLoading(false);

      return;
    }

    if (data && data.length > 0) {
      setExpenses(data);
      setLoading(false);

      return;
    }

    const previousDate = new Date(year, month - 2, 1);

    const previousMonth = previousDate.getMonth() + 1;

    const previousYear = previousDate.getFullYear();

    const { data: previousExpenses, error: previousError } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id)
      .eq("month", previousMonth)
      .eq("year", previousYear)
      .order("id");

    if (previousError) {
      console.error("Error loading previous expenses:", previousError);

      setLoading(false);

      return;
    }

    if (!previousExpenses || previousExpenses.length === 0) {
      setExpenses([]);
      setLoading(false);

      return;
    }

    const newExpenses = previousExpenses.map((expense) => ({
      user_id: user.id,
      title: expense.title,
      paid_amount: 0,
      last_paid_amount: expense.paid_amount,
      status: "pending",
      month,
      year,
    }));

    const { data: createdExpenses, error: createError } = await supabase
      .from("expenses")
      .insert(newExpenses)
      .select();

    if (createError) {
      console.error("Error creating monthly expenses:", createError);

      setLoading(false);

      return;
    }

    setExpenses(createdExpenses ?? []);
    setLoading(false);
  }, [user]);

  const updateExpenseStatus = async (id: number, status: ExpenseStatus) => {
    const { error } = await supabase
      .from("expenses")
      .update({
        status,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating expense status:", error);

      return;
    }

    setExpenses((current) =>
      current.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              status,
            }
          : expense,
      ),
    );
    setAllExpenses((current) =>
      current.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              status,
            }
          : expense,
      ),
    );
  };

  const updateExpensePaidAmount = async (id: number, paidAmount: number) => {
    const { error } = await supabase
      .from("expenses")
      .update({
        paid_amount: paidAmount,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating expense paid amount:", error);

      return;
    }

    setExpenses((current) =>
      current.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              paid_amount: paidAmount,
            }
          : expense,
      ),
    );
  };

  const loadAllExpenses = useCallback(async () => {
    if (!user) {
      setAllExpenses([]);
      return;
    }

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error loading all expenses:", error);

      return;
    }

    setAllExpenses(data ?? []);
  }, [user]);

  useEffect(() => {
    loadExpenses();
    loadAllExpenses();
  }, [loadExpenses, loadAllExpenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        updateExpenseStatus,
        updateExpensePaidAmount,
        allExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
