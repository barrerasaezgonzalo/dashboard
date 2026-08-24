"use client";

import { AlertTriangle, Info, X } from "lucide-react";
import { ConfirmModalProps } from "@/app/types";

export function ConfirmModal({
  isOpen,
  title,
  description,
  variant = "warning",
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
  showCancel = true,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const isWarning = variant === "warning";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-xl border border-neutral-700 bg-[#292929] shadow-2xl"
      >
        <div className="flex items-start justify-between px-5 pt-5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
              isWarning
                ? "bg-red-500/10 text-red-400"
                : "bg-blue-500/10 text-blue-400"
            }`}
          >
            {isWarning ? <AlertTriangle size={21} /> : <Info size={21} />}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-5 pt-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>

          <p className="mt-2 text-sm leading-6 text-neutral-400">
            {description}
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-neutral-700 px-5 py-4">
          {showCancel && (
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-neutral-600 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:bg-neutral-700"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
              isWarning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
