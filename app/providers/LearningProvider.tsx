"use client";

import { createContext, useState, type ReactNode } from "react";
import type { LearningCourse, LearningSession, Quiz } from "@/app/types";

export interface LearningContextType {
  activeCourse: LearningCourse | null;
  selectedSession: LearningSession | null;
  quiz: Quiz | null;
  loading: boolean;
  setActiveCourse: (course: LearningCourse | null) => void;
  setSelectedSession: (session: LearningSession | null) => void;
  setQuiz: (quiz: Quiz | null) => void;
  setLoading: (loading: boolean) => void;
  completedCourse: LearningCourse | null;
  setCompletedCourse: (course: LearningCourse | null) => void;
}

export const LearningContext = createContext<LearningContextType | null>(null);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [activeCourse, setActiveCourse] = useState<LearningCourse | null>(null);
  const [completedCourse, setCompletedCourse] = useState<LearningCourse | null>(
    null,
  );
  const [selectedSession, setSelectedSession] =
    useState<LearningSession | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <LearningContext.Provider
      value={{
        activeCourse,
        selectedSession,
        quiz,
        loading,
        setActiveCourse,
        setSelectedSession,
        setQuiz,
        setLoading,
        completedCourse,
        setCompletedCourse,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}
