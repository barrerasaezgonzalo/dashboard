"use client";

import { DashboardSection } from "@/app/components/Ui/DashboardSection";
import { SectionHeader } from "@/app/components/Ui/SectionHeader";
import { useWellness } from "@/app/hooks/useWellness";
import { Ban, CheckCircle, ListOrdered, Sparkles } from "lucide-react";
import { useState } from "react";
import { ConfirmModal } from "../Ui/ConfirmModal";

export function EmptyPlanBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { activePlan, updatePlanStatus, resetCheckIn } = useWellness();
  const tasks = activePlan?.tasks || [];
  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const progress =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const canCompletePlan =
    tasks.length > 0 && tasks.every((task) => task.status !== "pending");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "complete" | "reject" | null
  >(null);

  return (
    <DashboardSection
      id="wellness"
      header={
        <SectionHeader
          title={title}
          description={description}
          icon={ListOrdered}
          color="wellness"
        />
      }
    >
      <div className="mt-8 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
          <Sparkles size={24} />
        </div>

        <h3 className="mt-4 text-xl font-medium text-neutral-300">
          {activePlan ? activePlan.title : "Aún no tienes un plan activo"}
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
          {activePlan
            ? activePlan?.summary
            : "Sentirse bien es clave para ser feliz, por eso queremos ayudarte a cuidar tu salud."}
        </p>

        {activePlan && (
          <div className="mt-5 flex items-center gap-3">
            <span className="rounded-lg bg-wellness/10 px-3 py-1.5 text-sm font-medium text-wellness">
              {progress}%
            </span>

            <span className="text-sm text-neutral-400">
              {completedTasks} de {tasks.length} tareas
            </span>
          </div>
        )}

        {activePlan && (
          <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-neutral-700 pt-4 sm:flex-row">
            <button
              disabled={isSubmitting}
              type="button"
              onClick={() => setConfirmAction("reject")}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 h-12 text-sm font-medium text-neutral-400 transition hover:border-red-500/60 hover:text-red-400 sm:w-auto"
            >
              <Ban size={20} />
              Rechazar Plan
            </button>

            <button
              type="button"
              disabled={!canCompletePlan || isSubmitting}
              onClick={() => setConfirmAction("complete")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-neutral-900/60 h-12 px-4 text-sm font-medium text-wellness/80 transition border border-neutral-700 hover:border-wellness/80 disabled:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle size={20} />
              Completar Plan
            </button>
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={confirmAction !== null}
        title={
          confirmAction === "complete" ? "Completar plan" : "Rechazar plan"
        }
        description={
          confirmAction === "complete"
            ? "¿Estás seguro de que deseas completar este plan?"
            : "¿Estás seguro de que deseas rechazar este plan?"
        }
        variant={confirmAction === "reject" ? "warning" : "info"}
        confirmText={confirmAction === "complete" ? "Completar" : "Rechazar"}
        cancelText="Cancelar"
        onClose={() => setConfirmAction(null)}
        onConfirm={async () => {
          if (!activePlan || !confirmAction) {
            return;
          }
          setIsSubmitting(true);
          await updatePlanStatus(
            activePlan.id,
            confirmAction === "complete" ? "completed" : "rejected",
          );
          resetCheckIn();
          setIsSubmitting(false);
          setConfirmAction(null);
        }}
      />
    </DashboardSection>
  );
}
