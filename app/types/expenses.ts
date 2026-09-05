type ExpenseStatus = "pending" | "paid";

type ExpenseCategory = {
  id: number;
  user_id: string;
  title: string;
  active: boolean;
  created_at: string;
};

export type Expense = {
  id: number;
  user_id: string;
  category_id: number;
  amount: number;
  status: ExpenseStatus;
  month: number;
  year: number;
  created_at: string;
  category: ExpenseCategory;
  title: string;
  last_month_amount: number;
};

export type ExpenseGroupProps = {
  expenses: Expense[];
};

export type ExpenseItemProps = {
  expense: Expense;
};

export type ExpenseModalProps = {
  isOpen: boolean;
  title: string;
  setTitle: (value: string) => void;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};
