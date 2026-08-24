import { CheckCircle2 } from "lucide-react";

type TaskSuccessToastProps = {
  message: string;
};

export function TaskSuccessToast({ message }: TaskSuccessToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed right-5 top-2 z-50 flex items-center gap-2 rounded-lg border border-emerald-500 bg-emerald-500 px-4 py-3 text-sm text-white shadow-lg">
      <CheckCircle2 size={17} />
      {message}
    </div>
  );
}
