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

// WIP

export type PlanTaskStatus = "pending" | "completed" | "rejected";

export type PlanTask = {
  id: number;
  title: string;
  day: number;
  status: PlanTaskStatus;
};
