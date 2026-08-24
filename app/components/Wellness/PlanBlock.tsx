"use client";

import { ListOrdered } from "lucide-react";
import { SectionHeader } from "@/app/components/Ui/SectionHeader";
import { DashboardSection } from "@/app/components/Ui/DashboardSection";
import { useWellness } from "@/app/hooks/useWellness";
import { WellnessTaskItem } from "./WellnessTaskItem";

export function PlanBlock() {
  const { activePlan, updatePlanTaskStatus } = useWellness();
  const tasks = activePlan?.tasks || [];
  return (
    <DashboardSection
      id="wellness"
      header={
        <SectionHeader
          title="Plan de accion"
          description="Plan generado en base a tus respuestas para ayudarte a recuperar el equilibrio de forma gradual y sostenible."
          icon={ListOrdered}
          color="wellness"
        />
      }
    >
      <div className="mx-4 py-4">
        <div className="space-y-3 mt-4">
          {tasks.map((task) => (
            <WellnessTaskItem
              key={task.id}
              task={task}
              onStatusChange={updatePlanTaskStatus}
            />
          ))}
        </div>
      </div>
    </DashboardSection>
  );
}
