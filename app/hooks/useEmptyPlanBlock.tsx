"use client";

import { useState } from "react";

import { useWellness } from "@/app/hooks/useWellness";
import { ConfirmModalVariant } from "../types";

type ConfirmAction = "complete" | "reject" | null;

type UseEmptyPlanBlockProps = {
  onPlanClosed?: () => void;
};

export function useEmptyPlanBlock({ onPlanClosed }: UseEmptyPlanBlockProps) {
  const { activePlan, updatePlanStatus } = useWellness();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const tasks = activePlan?.tasks ?? [];

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const progress =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const canCompletePlan =
    tasks.length > 0 && tasks.every((task) => task.status !== "pending");

  const handleOpenComplete = () => {
    setConfirmAction("complete");
  };

  const handleOpenReject = () => {
    setConfirmAction("reject");
  };

  const handleCloseConfirm = () => {
    setConfirmAction(null);
  };

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

  const modalTitle =
    confirmAction === "complete" ? "Completar plan" : "Rechazar plan";

  const modalDescription =
    confirmAction === "complete"
      ? "¿Estás seguro de que deseas completar este plan?"
      : "¿Estás seguro de que deseas rechazar este plan?";

  const modalVariant: ConfirmModalVariant =
    confirmAction === "reject" ? "warning" : "info";

  const modalConfirmText =
    confirmAction === "complete" ? "Completar" : "Rechazar";

  return {
    activePlan,
    tasks,
    completedTasks,
    progress,
    canCompletePlan,

    isSubmitting,
    confirmAction,

    handleOpenComplete,
    handleOpenReject,
    handleCloseConfirm,
    handleConfirm,

    modalTitle,
    modalDescription,
    modalVariant,
    modalConfirmText,
  };
}
