import { LucideIcon } from "lucide-react";

export type MenuChild = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type MenuItem = {
  label: string;
  href?: string;
  icon: LucideIcon;
  children?: MenuChild[];
  description: string;
};

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
  expandedTasks: number[];
  onNextStatus: (taskId: number) => void;
  onToggleSummary: (taskId: number) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  selectedTaskId?: number;
};

export type TaskItemProps = {
  task: Task;
  expanded: boolean;
  onNextStatus: (taskId: number) => void;
  onToggleSummary: (taskId: number) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  selected?: boolean;
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
