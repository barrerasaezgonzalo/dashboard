"use client";

import ReactMarkdown from "react-markdown";
import { useLearning } from "@/app/hooks/useLearning";
import { GraduationCap, SquarePlus } from "lucide-react";
import { SectionHeader } from "../Ui/SectionHeader";
import { SectionActionButton } from "../Ui/SectionActionButton";
import { DashboardSection } from "../Ui/DashboardSection";

export function CompletedCourse() {
  const { completedCourse, handleResetLearning } = useLearning();

  if (!completedCourse) return null;

  return (
    <DashboardSection
      id="learning"
      button={
        <SectionActionButton
          onClick={handleResetLearning}
          icon={SquarePlus}
          color="violet"
        />
      }
      header={
        <SectionHeader
          title="Felicidades"
          description={`completaste ${completedCourse.title}`}
          icon={GraduationCap}
          color="violet"
        />
      }
    >
      <div className="rounded-xl bg-neutral-800/40 p-5">
        <div className="text-base leading-7 text-neutral-400">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="mb-3 text-xl font-semibold text-white">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="mb-2 mt-5 text-lg font-semibold text-neutral-200">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="mb-4 leading-7 text-neutral-400">{children}</p>
              ),

              ul: ({ children }) => (
                <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-400">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="mb-4 ml-6 list-decimal space-y-1 text-neutral-400">
                  {children}
                </ol>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold text-neutral-200">
                  {children}
                </strong>
              ),
            }}
          >
            {completedCourse.finalSummary ?? ""}
          </ReactMarkdown>
        </div>
      </div>

      {completedCourse.relatedCourses &&
        completedCourse.relatedCourses.length > 0 && (
          <div className="mx-4">
            <h4 className="text-base font-medium text-neutral-200">
              Puedes continuar con
            </h4>

            <div className="mt-3  flex flex-wrap gap-2">
              {completedCourse.relatedCourses.map((course) => (
                <div
                  key={course.title}
                  className="max-w-xl w-full rounded-lg border border-neutral-700 px-3 py-2"
                >
                  <p className="text-sm font-medium text-violet-400">
                    {course.title}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    {course.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
    </DashboardSection>
  );
}
