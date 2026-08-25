"use client";

import { CheckInBlock } from "./CheckInBlock";
import { EmptyPlanBlock } from "./EmptyPlanBlock";
import { PlanBlock } from "./PlanBlock";
import { useWellness } from "@/app/hooks/useWellness";

export function Wellness() {
  const {
    activePlan,
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
  } = useWellness();

  return (
    <div
      className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 "
      id="wellness"
    >
      {!activePlan ? (
        <>
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
          <EmptyPlanBlock
            title="Plan Wellness"
            description="Completa tu Check In respondiendo las consultas y para así poder generar un plan personalizado para tus próximos 7 días."
          />
        </>
      ) : (
        <>
          <EmptyPlanBlock
            onPlanClosed={resetCheckIn}
            title="Resumen del plan"
            description="Avanza paso a paso en tu plan y completa las tareas pendientes. Cada acción suma y te permite ver con más claridad el progreso que estás logrando."
          />
          <PlanBlock />
        </>
      )}
    </div>
  );
}
