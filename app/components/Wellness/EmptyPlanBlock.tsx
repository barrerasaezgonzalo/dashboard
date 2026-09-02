"use client";

import { useState } from "react";

import { Ban, CheckCircle, ListOrdered, Sparkles } from "lucide-react";

import { DashboardSection } from "@/app/components/Ui/DashboardSection";
import { SectionHeader } from "@/app/components/Ui/SectionHeader";
import { ConfirmModal } from "@/app/components/Ui/ConfirmModal";
import { useWellness } from "@/app/hooks/useWellness";
import { PlanHistory } from "./PlanHistory";
import { EmptyPlanBlockProps } from "@/app/types";

export function EmptyPlanBlock({
  title,
  description,
  onPlanClosed,
}: EmptyPlanBlockProps) {
  const { activePlan, selectedPlan, updatePlanStatus } = useWellness();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [confirmAction, setConfirmAction] = useState<
    "complete" | "reject" | null
  >(null);

  const planToShow = selectedPlan ?? activePlan;

  const isViewingHistory = Boolean(selectedPlan);

  const tasks = planToShow?.tasks ?? [];

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const progress =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const canCompletePlan =
    tasks.length > 0 && tasks.every((task) => task.status !== "pending");

  const handleConfirm = async () => {
    if (!activePlan || !confirmAction) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePlanStatus(
        activePlan.id,
        confirmAction === "complete" ? "completed" : "rejected",
      );

      onPlanClosed?.();

      setConfirmAction(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DashboardSection
        id="wellness"
        header={
          <SectionHeader
            title={title}
            description={description}
            icon={ListOrdered}
            color="green"
          />
        }
      >
        <div className="mt-8 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="flex h-18 w-18 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
            <Sparkles size={30} />
          </div>

          <h3 className="mt-4 text-xl font-medium text-neutral-300">
            {planToShow ? planToShow.title : "Aún no tienes un plan activo"}
          </h3>

          <p className="mt-2 max-w-xl text-lg leading-6 text-neutral-400">
            {planToShow
              ? planToShow.summary
              : "Sentirse bien es clave para ser feliz, por eso queremos ayudarte a cuidar tu salud."}
          </p>

          {!activePlan && !selectedPlan && <PlanHistory />}

          {activePlan && !isViewingHistory && (
            <div className="mt-5 flex items-center gap-3">
              <span className="rounded-lg bg-green-500/10 px-3 py-1.5 text-base font-medium text-green-500">
                {progress}%
              </span>

              <span className="text-base text-neutral-400">
                {completedTasks} de {tasks.length} tareas
              </span>
            </div>
          )}

          {activePlan && !isViewingHistory && (
            <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-neutral-700 pt-4 sm:flex-row">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setConfirmAction("reject")}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-base font-medium text-neutral-400 transition hover:border-red-500/60 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                <Ban size={20} />
                Rechazar Plan
              </button>

              <button
                type="button"
                disabled={!canCompletePlan || isSubmitting}
                onClick={() => setConfirmAction("complete")}
                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-base font-medium text-green-500/80 transition hover:border-green-500/80 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:opacity-50"
              >
                <CheckCircle size={20} />
                Completar Plan
              </button>
            </div>
          )}
        </div>
      </DashboardSection>

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
        onConfirm={handleConfirm}
      />
    </>
  );
}
