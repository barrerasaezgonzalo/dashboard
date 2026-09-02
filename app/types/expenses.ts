export type ExpenseStatus = "pending" | "paid";

export type ExpenseCategory = {
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
  onAmountChange: (id: number, amount: number) => Promise<void>;
};

export type ExpenseItemProps = {
  expense: Expense;
  onAmountChange: (id: number, amount: number) => Promise<void>;
};

export type ExpenseModalProps = {
  isOpen: boolean;
  categories: ExpenseCategory[];
  onClose: () => void;
  onCreate: (title: string) => Promise<void>;
  onUpdate: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};
export type UseExpenseItemProps = {
  expense: Expense;
  onAmountChange: (id: number, amount: number) => Promise<void>;
};
