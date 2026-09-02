"use client";

import { useContext, useState } from "react";
import { LearningContext } from "@/app/providers/LearningProvider";
import type {
  CourseLevel,
  GenerateSessionParams,
  GenerateSessionResponse,
  LearningCourse,
  LearningSession,
  Quiz,
} from "@/app/types";

export function useLearning() {
  const context = useContext(LearningContext);

  if (!context) {
    throw new Error("useLearning must be used within LearningProvider");
  }

  const {
    activeCourse,
    selectedSession,
    setActiveCourse,
    setSelectedSession,
    setQuiz,
    setLoading,
    loading,
    setCompletedCourse,
  } = context;

  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<CourseLevel>("basic");
  const [duration, setDuration] = useState("6");

  const generateSession = async ({
    topic,
    level,
    totalSessions,
    position,
    courseTitle,
    previousSessions,
  }: GenerateSessionParams): Promise<GenerateSessionResponse> => {
    const response = await fetch("/api/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        level,
        totalSessions,
        position,
        courseTitle,
        previousSessions,
      }),
    });

    if (!response.ok) {
      throw new Error("Error generating session");
    }
    return await response.json();
  };

  const handleGenerateCourse = async () => {
    if (!topic.trim() || loading) return;

    const totalSessions = Number(duration);
    if (!totalSessions || totalSessions < 1 || totalSessions > 12) {
      return;
    }

    try {
      setLoading(true);

      const data = await generateSession({
        topic,
        level,
        totalSessions,
        position: 1,
        previousSessions: [],
      });

      if (!data.title) return;

      const firstSession: LearningSession = {
        id: crypto.randomUUID(),
        title: data.session.title,
        description: data.session.description,
        content: data.session.content,
        summary: data.session.summary,
        status: "active",
        position: 1,
      };

      const course: LearningCourse = {
        id: crypto.randomUUID(),
        title: data.title,
        topic,
        level,
        totalSessions,
        status: "active",
        sessions: [firstSession],
      };

      setActiveCourse(course);
      setSelectedSession(firstSession);
    } finally {
      setLoading(false);
    }
  };

  const generateQuiz = async (): Promise<Quiz | null> => {
    const session =
      selectedSession ??
      activeCourse?.sessions.find((session) => session.status === "active");

    if (!session) return null;

    const response = await fetch("/api/create-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: session.title, content: session.content }),
    });

    if (!response.ok) {
      throw new Error("Error generating quiz");
    }

    const data: Quiz = await response.json();
    setSelectedSession(session);
    setQuiz(data);
    return data;
  };

  const handleGenerateQuiz = async (): Promise<Quiz | null> => {
    if (loading) return null;

    try {
      setLoading(true);
      return await generateQuiz();
    } finally {
      setLoading(false);
    }
  };

  const generateCourseCompletion = async (course: LearningCourse) => {
    const response = await fetch("/api/complete-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: course.title,
        topic: course.topic,
        level: course.level,
        sessions: course.sessions.map((session) => ({
          position: session.position,
          title: session.title,
          summary: session.summary,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error("Error completing course");
    }

    return await response.json();
  };

  const handlePassedQuiz = async () => {
    if (!activeCourse || !selectedSession || loading) return;

    const updatedSessions = activeCourse.sessions.map((session) =>
      session.id === selectedSession.id
        ? { ...session, status: "passed" as const }
        : session,
    );

    const updatedCourse: LearningCourse = {
      ...activeCourse,
      sessions: updatedSessions,
    };

    const isLastSession =
      selectedSession.position >= activeCourse.totalSessions;

    if (isLastSession) {
      const completedData = await generateCourseCompletion(updatedCourse);

      const completedCourse: LearningCourse = {
        ...updatedCourse,
        status: "completed",
        finalSummary: completedData.summary,
        relatedCourses: completedData.relatedCourses,
      };

      setCompletedCourse(completedCourse);
      setActiveCourse(null);
      setSelectedSession(null);
      setQuiz(null);

      return;
    }

    try {
      setLoading(true);

      const nextPosition = selectedSession.position + 1;

      const data = await generateSession({
        topic: updatedCourse.topic,
        level: updatedCourse.level,
        totalSessions: updatedCourse.totalSessions,
        position: nextPosition,
        courseTitle: updatedCourse.title,
        previousSessions: updatedCourse.sessions.map((session) => ({
          position: session.position,
          title: session.title,
          summary: session.summary,
        })),
      });

      const nextSession: LearningSession = {
        id: crypto.randomUUID(),
        title: data.session.title,
        description: data.session.description,
        content: data.session.content,
        summary: data.session.summary,
        status: "active",
        position: nextPosition,
      };

      const courseWithNextSession: LearningCourse = {
        ...updatedCourse,
        sessions: [...updatedCourse.sessions, nextSession],
      };

      setActiveCourse(courseWithNextSession);
      setSelectedSession(nextSession);
      setQuiz(null);
    } finally {
      setLoading(false);
    }
  };

  const handleResetLearning = () => {
    setActiveCourse(null);
    setSelectedSession(null);
    setQuiz(null);
    setCompletedCourse(null);
  };
  return {
    ...context,
    topic,
    setTopic,
    level,
    setLevel,
    duration,
    setDuration,
    handleGenerateCourse,
    handleGenerateQuiz,
    handlePassedQuiz,
    handleResetLearning,
  };
}
