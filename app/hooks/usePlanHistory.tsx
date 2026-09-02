"use client";

import { useHorizontalScroll } from "@/app/hooks/useHorizontalScroll";
import { useWellness } from "@/app/hooks/useWellness";
import { Plan } from "@/app/types";

export function usePlanHistory() {
  const { planHistory, selectedPlan, selectPlan, clearSelectedPlan } =
    useWellness();

  const { scrollContainerRef, scroll } = useHorizontalScroll();

  const handleSelectPlan = (plan: Plan) => {
    if (selectedPlan?.id === plan.id) {
      clearSelectedPlan();
      return;
    }

    selectPlan(plan);
  };

  const isSelectedPlan = (planId: number) => {
    return selectedPlan?.id === planId;
  };

  return {
    planHistory,
    scrollContainerRef,
    scroll,
    handleSelectPlan,
    isSelectedPlan,
  };
}
