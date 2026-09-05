import type { LucideIcon } from "lucide-react";
import { RefObject } from "react";

type SectionColor =
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
  icon: LucideIcon;
  color: SectionColor;
};

export type SectionActionButtonProps = {
  onClick: () => void;
  icon?: LucideIcon;
  color: SectionColor;
};

type ConfirmModalVariant = "info" | "warning";

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

export type NotificationsProps = {
  dropdownRef: RefObject<HTMLDivElement | null>;
  setIsDropdownOpen: (value: boolean) => void;
  isDropdownOpen: boolean;
  notifications: {
    id: string;
    icon: React.ElementType;
    title: string;
  }[];
  count: number;
};

export type LogoutProps = {
  setIsLogoutOpen: (value: boolean) => void;
  isLogoutOpen: boolean;
  handleLogout: () => Promise<void>;
};

export type DashboardSectionProps = {
  id: string;
  children: React.ReactNode;
  header: React.ReactNode;
  button?: React.ReactNode;
};
