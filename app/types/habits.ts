import type { Dispatch, SetStateAction } from "react";

export type HabitDayStatus = "pending" | "completed" | "failed";

export type Habit = {
  id: number;
  user_id: string;
  name: string;
  days: boolean[];
  completed: HabitDayStatus[];
  last_completed: number;
  last_reset_week: string;
  created_at?: string;
};

export type CreateHabit = {
  name: string;
  days: boolean[];
};

export type HabitItemProps = {
  habit: Habit;
  currentDay: number;
  onToggleCompleted: (habit: Habit, index: number) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
};

export type HabitDayProps = {
  habit: Habit;
  index: number;
  enabled: boolean;
  currentDay: number;
  weekDay: string;
  onToggleCompleted: (habit: Habit, index: number) => void;
};

export type HabitModalProps = {
  isOpen: boolean;
  habit: Habit | null;
  name: string;
  days: boolean[];
  saving: boolean;
  invalidHabit: boolean;
  setName: Dispatch<SetStateAction<string>>;
  onToggleDay: (index: number) => void;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};

export type HabitGroupProps = {
  habits: Habit[];
  currentDay: number;
  onToggleCompleted: (habit: Habit, index: number) => Promise<void>;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
};
