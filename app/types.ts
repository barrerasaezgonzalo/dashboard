// Tasks

import { LucideIcon } from "lucide-react";
import { RefObject } from "react";

export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: number;
  user_id: string;
  title: string;
  status: TaskStatus;
  date?: string | null;
  important: boolean;
  summary?: string | null;
};

export type TaskGroupProps = {
  title: string;
  tasks: Task[];
  emptyMessage: string;
  onNextStatus: (taskId: number) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  className: string;
  icon: LucideIcon;
};

export type TaskItemProps = {
  task: Task;
  onNextStatus: (taskId: number, option: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  confirming?: boolean;
};

export type TaskFormData = {
  title: string;
  summary: string;
  date: string;
  important: boolean;
};

export type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSubmit: (data: TaskFormData) => Promise<void> | void;
};

export type TaskStatusOption = {
  status: TaskStatus;
  title: string;
  className: string;
};

export type TaskStatusMenuProps = {
  taskId: number;
  options: TaskStatusOption[];
  onChangeStatus: (taskId: number, status: TaskStatus) => void;
  onClose: () => void;
};

export type taskGroupConfigProps = {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  emptyMessage: string;
  icon: LucideIcon;
  className: string;
  bg: string;
  border: string;
};

// UI

export type SectionHeaderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export type ConfirmModalVariant = "info" | "warning";

export type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  variant?: ConfirmModalVariant;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  showCancel?: boolean;
};

type ToastVariant = "success" | "error";

export type ToastProps = {
  message: string;
  variant?: ToastVariant;
  icon?: LucideIcon;
};

// Notes

export type Note = {
  id: number;
  user_id: string;
  title: string;
  content: string;
  important: boolean;
};

export type NoteFormProps = {
  currentNote: Note | null;
  title: string;
  content: string;
  important: boolean;
  isNewNote: boolean;
  invalidTitle: boolean;
  disabledSave: boolean;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  handleSave: () => void;
  handleNewNote: () => void;
  handleImportant: () => void;
  handleOpenDelete: () => void;
};

export type NoteListProps = {
  notes: Note[];
  currentNote: Note | null;
  isNewNote: boolean;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  scroll: (direction: "left" | "right") => void;
  handleSelectNote: (note: Note) => void;
};

export type MapNoteProps = {
  id: number;
  user_id: string;
  title: string;
  content: string | null;
  important: boolean;
};

// Debts
export type ExpenseStatus = "pending" | "paid";

export type Expense = {
  id: number;
  user_id: string;
  title: string;
  paid_amount: number;
  last_paid_amount: number;
  status: ExpenseStatus;
  month: number;
  year: number;
  created_at: string;
};

export type ExpenseItemProps = {
  expense: Expense;
  amount: string;
  onAmountChange: (id: number, value: string) => void;
  onPaid: (id: number, status: ExpenseStatus) => Promise<void>;
};

// Habits

export type Habit = {
  id: number;
  user_id: string;
  name: string;
  days: boolean[];
  completed: boolean[];
  last_completed: number;
  created_at: string;
  last_reset_week: string | null;
};

export type HabitItemProps = {
  habit: Habit;
  currentDay: number;
  onToggleCompleted: (habit: Habit, index: number) => Promise<void>;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
};

export type HabitDayProps = {
  habit: Habit;
  index: number;
  enabled: boolean;
  currentDay: number;
  weekDay: string;
  onToggleCompleted: (habit: Habit, index: number) => Promise<void>;
};

export type HabitModalProps = {
  isOpen: boolean;
  habit: Habit | null;
  name: string;
  days: boolean[];
  saving: boolean;
  invalidHabit: boolean;
  setName: React.Dispatch<React.SetStateAction<string>>;
  onToggleDay: (index: number) => void;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};

// Wellness

export type WellnessCheckInMessage = {
  question: string;
  answer: string;
};

export type WellnessPlanRequest = {
  messages: WellnessCheckInMessage[];
};

export type GeneratedWellnessTask = {
  title: string;
  description: string;
  day: number;
  status: "pending";
};

export type GeneratedWellnessPlan = {
  title: string;
  summary: string;
  tasks: GeneratedWellnessTask[];
};

export type GroqPlanResponse = {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
  error?: {
    message?: string;
  };
};

export type PlanStatus = "active" | "completed" | "rejected";

export type PlanTaskStatus = "pending" | "completed" | "rejected";

export type CheckInAnswer = {
  question: string;
  answer: string;
};

export type CheckIn = {
  id: number;
  user_id: string;
  answers: CheckInAnswer[];
  created_at: string;
};

export type CheckInMessage = {
  question: string;
  answer: string;
};

export type PlanTask = {
  id: number;
  plan_id: number;
  title: string;
  description: string;
  day: number;
  status: PlanTaskStatus;
  created_at: string;
};

export type Plan = {
  id: number;
  user_id: string;
  checkin_id: number;
  title: string;
  summary: string;
  status: PlanStatus;
  created_at: string;
  tasks: PlanTask[];
};

export type WellnessTaskItemProps = {
  task: PlanTask;
  onStatusChange: (id: number, status: PlanTaskStatus) => void;
};

export type CheckInBlockProps = {
  question: string;
  answer: string;
  setAnswer: (value: string) => void;
  loadingQuestion: boolean;
  canContinue: boolean;
  canGeneratePlan: boolean;
  onContinue: () => Promise<void>;
  onGeneratePlan: () => Promise<void>;
  checkInCompleted: boolean;
};
