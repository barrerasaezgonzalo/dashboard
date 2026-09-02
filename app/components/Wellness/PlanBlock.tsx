"use client";

import { ArrowLeft, ListOrdered, Trash2 } from "lucide-react";

import { DashboardSection } from "@/app/components/Ui/DashboardSection";
import { SectionHeader } from "@/app/components/Ui/SectionHeader";
import { useWellness } from "@/app/hooks/useWellness";

import { WellnessTaskItem } from "./WellnessTaskItem";
import { useState } from "react";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { SectionActionButton } from "../Ui/SectionActionButton";

export function PlanBlock() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    activePlan,
    selectedPlan,
    clearSelectedPlan,
    updatePlanTaskStatus,
    deletePlan,
  } = useWellness();

  const planToShow = selectedPlan ?? activePlan;

  const isHistory = Boolean(selectedPlan);

  if (!planToShow) {
    return null;
  }

  return (
    <DashboardSection
      id="wellness"
      button={
        isHistory ? (
          <div className="flex gap-2">
            <SectionActionButton
              onClick={clearSelectedPlan}
              icon={ArrowLeft}
              color="green"
            />
            <SectionActionButton
              onClick={() => setIsDeleteModalOpen(true)}
              icon={Trash2}
              color="orange"
            />
          </div>
        ) : undefined
      }
      header={
        <SectionHeader
          title={isHistory ? "Plan anterior" : "Plan de acción"}
          description={
            isHistory
              ? "Revisa las tareas y resultados de este plan."
              : "Plan generado en base a tus respuestas para ayudarte a recuperar el equilibrio de forma gradual y sostenible."
          }
          icon={ListOrdered}
          color="green"
        />
      }
    >
      <div className="mx-4 py-4">
        {isHistory && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-neutral-300">
              {planToShow.title}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {planToShow.summary}
            </p>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {planToShow.tasks.map((task) => (
            <WellnessTaskItem
              key={task.id}
              task={task}
              onStatusChange={updatePlanTaskStatus}
              readOnly={isHistory}
            />
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminar Plan"
        description="¿Estás seguro de que deseas eliminar este plan?"
        variant="warning"
        onConfirm={async () => {
          if (!selectedPlan) return;
          await deletePlan(selectedPlan.id);
          setIsDeleteModalOpen(false);
        }}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </DashboardSection>
  );
}
