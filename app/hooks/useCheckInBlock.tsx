"use client";

import { useState } from "react";

type UseCheckInBlockProps = {
  onContinue: () => Promise<void>;
  onGeneratePlan: () => Promise<void>;
};

export function useCheckInBlock({
  onContinue,
  onGeneratePlan,
}: UseCheckInBlockProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGeneratePlan = async () => {
    setIsSubmitting(true);

    try {
      await onGeneratePlan();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = async () => {
    setIsSubmitting(true);

    try {
      await onContinue();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleGeneratePlan,
    handleContinue,
  };
}
