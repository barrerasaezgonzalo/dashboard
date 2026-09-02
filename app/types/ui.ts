import type { LucideIcon } from "lucide-react";

export type SectionColor =
  | "blue"
  | "green"
  | "orange"
  | "indigo"
  | "amber"
  | "gray"
  | "violet"
  | "yellow"
  | "cyan";

export type SectionHeaderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: SectionColor;
};

export type SectionActionButtonProps = {
  onClick: () => void;
  icon: LucideIcon;
  color: SectionColor;
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

export type ToastVariant = "success" | "error";

export type ToastProps = {
  message: string;
  variant?: ToastVariant;
  icon?: LucideIcon;
};
