import { ToastProps } from "@/app/types";
import { CheckCircle2, CircleX } from "lucide-react";

export function Toast({ message, variant = "success", icon }: ToastProps) {
  if (!message) {
    return null;
  }

  const isError = variant === "error";
  const DefaultIcon = isError ? CircleX : CheckCircle2;
  const Icon = icon ?? DefaultIcon;

  return (
    <div
      className={`fixed right-5 top-2 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-lg ${
        isError
          ? "border-red-500 bg-red-500 text-neutral-100"
          : "border-emerald-500 bg-emerald-500 text-neutral-100"
      }`}
    >
      <Icon size={17} />
      {message}
    </div>
  );
}
