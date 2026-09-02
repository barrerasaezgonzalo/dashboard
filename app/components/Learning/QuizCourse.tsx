"use client";

import { useState } from "react";
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  ListChecks,
  ThumbsUp,
  CircleOff,
  Check,
} from "lucide-react";
import { useLearning } from "@/app/hooks/useLearning";
import { QuizCourseProps } from "@/app/types";

export function QuizCourse({
  isOpen,
  setIsOpen,
  onPassed,
  onCloseCourse,
}: QuizCourseProps) {
  const { quiz, handleGenerateQuiz, selectedSession, loading, activeCourse } =
    useLearning();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const isLastSession =
    selectedSession?.position === activeCourse?.totalSessions;

  if (!isOpen || !quiz) return null;

  const questions = quiz.questions;

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];

    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;

    answers.forEach((answer, index) => {
      if (answer === questions[index].correctIndex) {
        correctCount++;
      }
    });

    return Math.round((correctCount / questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setShowResults(false);
  };

  const handleRetry = async () => {
    resetQuiz();
    await handleGenerateQuiz();
  };

  const handleClose = () => {
    resetQuiz();
    setIsOpen(false);
  };

  const handlePassed = async () => {
    resetQuiz();
    setIsOpen(false);
    onCloseCourse();

    await onPassed();
  };

  const score = showResults ? calculateScore() : 0;
  const passed = score >= 80;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative flex w-xl max-w-xl flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col border-b border-zinc-800 pb-4">
          <div className="flex items-start gap-2 text-violet-400">
            <ListChecks size={24} className="mb-1 mt-1" />

            <div className="line-clamp-2 text-xl font-semibold">
              Quiz: {selectedSession?.title}
            </div>
          </div>

          {!showResults && (
            <div className="text-base text-neutral-300">
              Pregunta {currentIndex + 1} de {questions.length}
            </div>
          )}
        </div>

        <div className="flex-1 py-3">
          {!showResults ? (
            <div className="space-y-6">
              <h3 className="text-lg font-medium leading-relaxed text-neutral-300">
                {questions[currentIndex].question}
              </h3>

              <div className="space-y-3">
                {questions[currentIndex].options.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectOption(index)}
                    className={`relative flex h-20 w-full items-center justify-center rounded border p-4 text-sm transition-all ${
                      selectedOption === index
                        ? "border-violet-500 bg-violet-600/20 font-medium text-white"
                        : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <div
                      className={`absolute left-4 flex h-7 w-7 items-center justify-center rounded-full border transition ${
                        selectedOption === index
                          ? "border-violet-500 bg-violet-500 text-white"
                          : "border-zinc-600"
                      }`}
                    >
                      {selectedOption === index && <Check size={18} />}
                    </div>

                    <span className="px-10 text-center">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-4 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                {passed ? (
                  <Rocket size={60} className="mb-4 text-emerald-400" />
                ) : (
                  <CircleOff size={60} className="text-red-400" />
                )}

                <h3 className="text-2xl font-bold text-white">
                  {passed
                    ? "¡Felicitaciones, aprobaste!"
                    : "No alcanzaste el puntaje mínimo"}
                </h3>

                <p className="text-zinc-400">
                  Tu puntaje es de{" "}
                  <strong className="text-base text-violet-400">
                    {score}%
                  </strong>{" "}
                  (Se requiere un mínimo de 80%).
                </p>
              </div>

              <div className="max-h-70 space-y-4 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left text-sm">
                <span className="mb-4 block font-semibold text-zinc-400">
                  Resumen de respuestas:
                </span>

                {questions.map((question, index) => {
                  const isCorrect = answers[index] === question.correctIndex;

                  return (
                    <div
                      key={question.id}
                      className="flex items-center justify-between border-b border-white/20 pb-2"
                    >
                      <span className="truncate pr-2 text-zinc-300">
                        {question.question}
                      </span>

                      <span
                        className={
                          isCorrect
                            ? "shrink-0 text-green-700"
                            : "shrink-0 text-red-400"
                        }
                      >
                        <ThumbsUp size={20} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 border-t border-zinc-800 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-violet-700 bg-neutral-900/60 px-4 text-base font-medium text-white transition hover:border-violet-500 hover:text-violet-400 sm:w-auto"
          >
            <ArrowLeft size={20} />
            Volver al capítulo
          </button>

          {!showResults ? (
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleNext}
              className={`flex items-center gap-2 rounded-lg border px-5 py-2 text-sm font-medium transition-colors ${
                selectedOption !== null
                  ? "border-violet-500 bg-violet-600/20 text-white"
                  : "cursor-not-allowed border-violet-500 bg-zinc-800 text-zinc-500"
              }`}
            >
              {currentIndex === questions.length - 1
                ? "Finalizar"
                : "Siguiente"}

              <ArrowRight size={16} />
            </button>
          ) : !passed ? (
            <button
              type="button"
              onClick={handleRetry}
              disabled={loading}
              className="flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-base font-medium text-violet-400 transition hover:border-violet-500/60 hover:bg-violet-500/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check size={19} />

              {loading ? "Generando..." : "Reintentar Quiz"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePassed}
              className="flex items-center gap-2 rounded-lg border border-violet-500 bg-violet-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-violet-300 hover:bg-violet-500"
            >
              {isLastSession ? "Finalizar curso" : "Siguiente capítulo"}

              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
