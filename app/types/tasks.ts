import type { LucideIcon } from "lucide-react";

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

export type TaskItemProps = {
  task: Task;
  onNextStatus: (taskId: number, status?: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  confirming?: boolean;
  taskGroupConfig: TaskGroupConfig[];
  getNextStatus: (status: TaskStatus) => TaskStatus;
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

export type TaskGroupConfig = {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  emptyMessage: string;
  icon: LucideIcon;
  className: string;
  bg: string;
  border: string;
};

export type TaskGroupProps = {
  taskGroupConfig: TaskGroupConfig[];
  onNextStatus: (taskId: number, status?: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};
