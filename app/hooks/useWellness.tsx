"use client";

import { useContext, useEffect, useState } from "react";

import { checkInQuestions, MAX_ANSWER, MIN_ANSWER } from "@/app/constants";
import { WellnessContext } from "@/app/providers/WellnessProvider";
import { CheckInMessage } from "../types";

export function useWellness() {
  const context = useContext(WellnessContext);

  if (!context) {
    throw new Error("useWellness debe usarse dentro de WellnessProvider");
  }

  const {
    activePlan,
    loading,
    createCheckIn,
    createPlan,
    updatePlanTaskStatus,
    updatePlanStatus,
  } = context;

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

    const currentMessage = { question: question, answer: answer.trim() };
    const updatedMessages = [...messages, currentMessage];

    setMessages(updatedMessages);
    setAnswer("");
    if (updatedMessages.length >= MAX_ANSWER) {
      setQuestion("");
      return;
    }
    setLoadingQuestion(true);

    const response = await fetch("/api/check-in-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question,
        answer: currentMessage.answer,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Error generating next question:", data.error);
      setLoadingQuestion(false);
      return;
    }

    setQuestion(data.question);
    setLoadingQuestion(false);
  };

  const handlePreparePlan = async () => {
    if (!canGeneratePlan || activePlan) {
      return;
    }

    const currentAnswer = answer.trim();
    const finalMessages = currentAnswer
      ? [...messages, { question: question, answer: currentAnswer }]
      : messages;
    const checkIn = await createCheckIn({ answers: finalMessages });

    if (!checkIn) {
      return;
    }

    const response = await fetch("/api/check-in-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: finalMessages }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error generating plan:", data.error);
      return;
    }

    const plan = data.plan;

    await createPlan({
      checkinId: checkIn.id,
      title: plan.title,
      summary: plan.summary,
      tasks: plan.tasks,
    });

    resetCheckIn();
  };

  const resetCheckIn = () => {
    setMessages([]);
    setAnswer("");
    setQuestion(checkInQuestions[0]);
  };

  useEffect(() => {
    const randomQuestion =
      checkInQuestions[Math.floor(Math.random() * checkInQuestions.length)];
    setQuestion(randomQuestion);
  }, []);

  useEffect(() => {
    resetCheckIn;
  }, [resetCheckIn]);

  return {
    activePlan,
    loading,
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
    createPlan,
    updatePlanTaskStatus,
    updatePlanStatus,
    resetCheckIn,
  };
}
