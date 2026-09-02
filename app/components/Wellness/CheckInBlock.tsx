"use client";

import { ListOrdered, SendHorizonal, Sparkles } from "lucide-react";

import { DashboardSection } from "@/app/components/Ui/DashboardSection";
import { SectionHeader } from "@/app/components/Ui/SectionHeader";

import { MAX_ANSWER } from "@/app/constants";
import { CheckInBlockProps } from "@/app/types";
import { useCheckInBlock } from "@/app/hooks/useCheckInBlock";

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
  const { isSubmitting, handleGeneratePlan, handleContinue } = useCheckInBlock({
    onContinue,
    onGeneratePlan,
  });

  const disableTextarea = loadingQuestion || checkInCompleted || isSubmitting;

  const disableGenerate = !canGeneratePlan || loadingQuestion || isSubmitting;

  const disableContinue =
    !canContinue || loadingQuestion || checkInCompleted || isSubmitting;

  const questionText = checkInCompleted
    ? "Presiona el botón Generar plan"
    : loadingQuestion
      ? "Preparando la siguiente pregunta..."
      : question;

  return (
    <DashboardSection
      id="wellness"
      header={
        <SectionHeader
          title="Check In"
          description={`Contesta con honestidad para personalizar tu plan. Son tan solo un máximo de ${MAX_ANSWER} preguntas, puedes generar tu plan desde la tercera respuesta.`}
          icon={ListOrdered}
          color="green"
        />
      }
    >
      <div className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-4">
        <p className="pl-1 text-lg text-neutral-400">{questionText}</p>

        <textarea
          value={answer}
          disabled={disableTextarea}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          className="custom-scroll min-h-52 w-full flex-1 resize-none rounded-lg border border-neutral-700 bg-neutral-900/60 p-3 text-base leading-6 text-neutral-300 outline-none transition placeholder:text-neutral-600 focus:border-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            disabled={disableGenerate}
            onClick={handleGeneratePlan}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 py-3 text-lg font-medium text-green-500/80 transition hover:border-green-500/80 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:opacity-50"
          >
            <Sparkles size={25} />
            Generar plan
          </button>

          <button
            type="button"
            disabled={disableContinue}
            onClick={handleContinue}
            title="Siguiente pregunta"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-xs font-medium text-green-500/80 transition hover:border-green-500/80 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:opacity-50"
          >
            <SendHorizonal size={25} />
          </button>
        </div>
      </div>
    </DashboardSection>
  );
}
