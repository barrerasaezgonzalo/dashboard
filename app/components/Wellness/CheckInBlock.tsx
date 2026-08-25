"use client";

import { DashboardSection } from "@/app/components/Ui/DashboardSection";
import { SectionHeader } from "@/app/components/Ui/SectionHeader";
import { MAX_ANSWER } from "@/app/constants";
import { useWellness } from "@/app/hooks/useWellness";
import { CheckInBlockProps } from "@/app/types";

import { ListOrdered, SendHorizonal, Sparkles } from "lucide-react";
import { useState } from "react";

export function CheckInBlock({
  question,
  answer,
  setAnswer,
  loadingQuestion,
  canContinue,
  canGeneratePlan,
  onContinue,
  onGeneratePlan,
  checkInCompleted,
}: CheckInBlockProps) {
  const { activePlan } = useWellness();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <DashboardSection
      id="wellness"
      header={
        <SectionHeader
          title="Check In"
          description={`Contesta con honestidad para personalizar tu plan. Son tan solo un máximo de ${MAX_ANSWER} preguntas, puedes generar tu plan desde la tercera respuesta.`}
          icon={ListOrdered}
          color="wellness"
        />
      }
    >
      <div className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-4">
        <p className="text-sm text-neutral-400 pl-1">
          {checkInCompleted
            ? "Presiona el botón Generar plan"
            : loadingQuestion
              ? "Preparando la siguiente pregunta..."
              : question}
        </p>

        <textarea
          value={answer}
          disabled={
            loadingQuestion ||
            Boolean(activePlan) ||
            checkInCompleted ||
            isSubmitting
          }
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          className="custom-scroll min-h-52 w-full flex-1 resize-none rounded-lg border border-neutral-700 bg-neutral-900/60 p-3 text-sm leading-6 text-neutral-300 outline-none transition placeholder:text-neutral-600 focus:border-wellness/50 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            disabled={
              !canGeneratePlan ||
              loadingQuestion ||
              Boolean(activePlan) ||
              isSubmitting
            }
            onClick={async () => {
              setIsSubmitting(true);
              await onGeneratePlan();
              setIsSubmitting(false);
            }}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 py-3 text-sm font-medium transition text-wellness/80 hover:border-wellness/80 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:opacity-50"
          >
            <Sparkles size={25} />
            Generar plan
          </button>

          <button
            type="button"
            disabled={
              !canContinue ||
              loadingQuestion ||
              Boolean(activePlan) ||
              checkInCompleted ||
              isSubmitting
            }
            onClick={async () => {
              setIsSubmitting(true);
              await onContinue();
              setIsSubmitting(false);
            }}
            title="Siguiente pregunta"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-xs font-medium text-wellness/80 transition hover:border-wellness/80 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:opacity-50"
          >
            <SendHorizonal size={25} />
          </button>
        </div>
      </div>
    </DashboardSection>
  );
}
