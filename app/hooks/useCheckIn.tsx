"use client";

import { useEffect, useState } from "react";

import { checkInQuestions, MAX_ANSWER, MIN_ANSWER } from "@/app/constants";

import { useWellness } from "@/app/hooks/useWellness";
import { errorLogger } from "@/app/lib/errorLogger";
import { CheckInMessage } from "@/app/types";

export function useCheckIn() {
  const { activePlan, createCheckIn, createPlan } = useWellness();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState<CheckInMessage[]>([]);
  const [loadingQuestion, setLoadingQuestion] = useState(false);

  const canContinue =
    answer.trim().length > 0 &&
    messages.length < MAX_ANSWER &&
    !loadingQuestion;

  const canGeneratePlan = messages.length >= MIN_ANSWER && !loadingQuestion;

  const checkInCompleted = messages.length >= MAX_ANSWER;

  const handleContinue = async () => {
    if (!canContinue || activePlan) {
      return;
    }

    const currentMessage: CheckInMessage = {
      question,
      answer: answer.trim(),
    };

    const updatedMessages = [...messages, currentMessage];

    setMessages(updatedMessages);
    setAnswer("");

    if (updatedMessages.length >= MAX_ANSWER) {
      setQuestion("");
      return;
    }

    setLoadingQuestion(true);

    try {
      const response = await fetch("/api/check-in-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        errorLogger.logError(
          "Error al generar la siguiente pregunta",
          data.error,
          {
            context: "useCheckIn",
            userMessage:
              "Error al generar la pregunta. Por favor, intenta de nuevo.",
          },
        );
        return;
      }

      setQuestion(data.question);
    } catch (error) {
      errorLogger.logError("Error al generar la siguiente pregunta", error, {
        context: "useCheckIn",
        userMessage:
          "Error al generar la pregunta. Por favor, intenta de nuevo.",
      });
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handlePreparePlan = async () => {
    if (!canGeneratePlan || activePlan) {
      return;
    }

    const currentAnswer = answer.trim();

    const finalMessages = currentAnswer
      ? [
          ...messages,
          {
            question,
            answer: currentAnswer,
          },
        ]
      : messages;

    const checkIn = await createCheckIn({
      answers: finalMessages,
    });

    if (!checkIn) {
      return;
    }

    try {
      const response = await fetch("/api/check-in-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: finalMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        errorLogger.logError(
          "Error al generar el plan de bienestar",
          data.error,
          {
            context: "useCheckIn",
            userMessage:
              "Error al generar el plan. Por favor, intenta de nuevo.",
          },
        );
        return;
      }

      await createPlan({
        checkinId: checkIn.id,
        title: data.plan.title,
        summary: data.plan.summary,
        tasks: data.plan.tasks,
      });

      resetCheckIn();
    } catch (error) {
      errorLogger.logError("Error al preparar el plan de bienestar", error, {
        context: "useCheckIn",
        userMessage: "Error al preparar el plan. Por favor, intenta de nuevo.",
      });
    }
  };

  const resetCheckIn = () => {
    const randomQuestion =
      checkInQuestions[Math.floor(Math.random() * checkInQuestions.length)];

    setMessages([]);
    setAnswer("");
    setQuestion(randomQuestion);
    setLoadingQuestion(false);
  };

  useEffect(() => {
    const randomQuestion =
      checkInQuestions[Math.floor(Math.random() * checkInQuestions.length)];

    setQuestion(randomQuestion);
  }, []);

  return {
    question,
    answer,
    setAnswer,
    messages,
    loadingQuestion,
    canContinue,
    canGeneratePlan,
    checkInCompleted,
    handleContinue,
    handlePreparePlan,
    resetCheckIn,
  };
}
