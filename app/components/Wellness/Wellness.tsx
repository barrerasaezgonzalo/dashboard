"use client";

import { useCheckIn } from "@/app/hooks/useCheckIn";
import { useWellness } from "@/app/hooks/useWellness";
import { CheckInBlock } from "./CheckInBlock";
import { EmptyPlanBlock } from "./EmptyPlanBlock";
import { PlanBlock } from "./PlanBlock";
import { Toast } from "../Ui/Toast";

export function Wellness() {
  const { activePlan, selectedPlan, responseOperationMessage } = useWellness();

  const {
    question,
    answer,
    setAnswer,
    loadingQuestion,
    canContinue,
    canGeneratePlan,
    handleContinue,
    handlePreparePlan,
    checkInCompleted,
    resetCheckIn,
  } = useCheckIn();

  const planToShow = selectedPlan ?? activePlan;

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
      {activePlan ? (
        <EmptyPlanBlock
          title="Resumen del plan"
          description="Avanza paso a paso en tu plan y completa las tareas pendientes. Cada acción suma y te permite ver con más claridad el progreso que estás logrando."
          onPlanClosed={resetCheckIn}
        />
      ) : (
        <CheckInBlock
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          loadingQuestion={loadingQuestion}
          canContinue={canContinue}
          canGeneratePlan={canGeneratePlan}
          onContinue={handleContinue}
          onGeneratePlan={handlePreparePlan}
          checkInCompleted={checkInCompleted}
        />
      )}

      {planToShow ? (
        <PlanBlock />
      ) : (
        <EmptyPlanBlock
          title="Plan Wellness"
          description="Completa tu Check In respondiendo las consultas y para así poder generar un plan personalizado para tus próximos 7 días."
        />
      )}

      <Toast message={responseOperationMessage} />
    </div>
  );
}
