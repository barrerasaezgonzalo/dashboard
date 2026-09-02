"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, CircleCheck, Shrink } from "lucide-react";

import { QuizCourse } from "./QuizCourse";
import { useLearning } from "@/app/hooks/useLearning";
import type { ModalCourseProps } from "@/app/types";

export function ModalCourse({ isOpen, setIsOpen }: ModalCourseProps) {
  const [isOpenQuiz, setIsOpenQuiz] = useState(false);

  const {
    activeCourse,
    selectedSession,
    handleGenerateQuiz,
    loading,
    handlePassedQuiz,
  } = useLearning();

  if (!isOpen) return null;

  const session =
    selectedSession ??
    activeCourse?.sessions.find((session) => session.status === "active");

  if (!activeCourse || !session) {
    return null;
  }

  const markdownContent = session.content
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t");

  const handleOpenQuiz = async () => {
    const quiz = await handleGenerateQuiz();

    if (!quiz) return;

    setIsOpenQuiz(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-6 py-4">
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-violet-400" />

              <span className="text-lg font-medium text-violet-400">
                Material de aprendizaje
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-violet-400 transition hover:bg-violet-500/10"
            >
              <Shrink size={20} />
            </button>
          </div>

          <div className="custom-scroll flex-1 overflow-y-auto px-6 py-6">
            <div className="mb-7">
              <span className="text-sm uppercase tracking-wider text-violet-400">
                {activeCourse.title}
              </span>

              <h2 className="mt-2 text-xl font-semibold text-neutral-200">
                {session.title}
              </h2>

              <p className="mt-2 text-base leading-7 text-neutral-400">
                {session.description}
              </p>
            </div>

            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="mb-3 mt-7 text-xl font-semibold text-violet-400">
                    {children}
                  </h2>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-3 mt-7 text-lg font-semibold text-violet-400">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-2 mt-6 text-base font-semibold text-neutral-200">
                    {children}
                  </h3>
                ),

                h4: ({ children }) => (
                  <h4 className="mb-2 mt-5 text-base font-medium text-neutral-300">
                    {children}
                  </h4>
                ),

                p: ({ children }) => (
                  <p className="mb-4 text-base leading-7 text-neutral-400">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-4 ml-5 list-disc space-y-2 text-base leading-7 text-neutral-400 marker:text-violet-400">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-4 ml-5 list-decimal space-y-2 text-base leading-7 text-neutral-400 marker:text-violet-400">
                    {children}
                  </ol>
                ),

                li: ({ children }) => <li className="pl-1">{children}</li>,

                strong: ({ children }) => (
                  <strong className="font-semibold text-neutral-300">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="text-neutral-300">{children}</em>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-5 border-l-2 border-violet-500 pl-4 text-neutral-400">
                    {children}
                  </blockquote>
                ),

                code: ({ children }) => (
                  <code className="rounded bg-neutral-800 px-1.5 py-0.5 text-sm text-violet-300">
                    {children}
                  </code>
                ),

                pre: ({ children }) => (
                  <pre className="custom-scroll mb-5 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-sm leading-6 text-neutral-300">
                    {children}
                  </pre>
                ),

                hr: () => <hr className="my-6 border-neutral-800" />,
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>

          <div className="shrink-0 border-t border-zinc-800 px-6 py-4">
            <div className="flex justify-end">
              <button
                onClick={handleOpenQuiz}
                disabled={loading}
                type="button"
                className="flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-base font-medium text-violet-400 transition hover:border-violet-500/60 hover:bg-violet-500/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CircleCheck size={19} />

                {loading ? "Generando Quiz..." : "Realizar Quiz"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuizCourse
        isOpen={isOpenQuiz}
        setIsOpen={setIsOpenQuiz}
        onPassed={handlePassedQuiz}
        onCloseCourse={() => setIsOpen(false)}
      />
    </>
  );
}
