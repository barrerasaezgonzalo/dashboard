"use client";

import { useLearning } from "@/app/hooks/useLearning";
import { CreateCourse } from "./CreateCourse";
import { ActiveCourse } from "./ActiveCourse";
import { CompletedCourse } from "./CompletedCourse";

export function Learning() {
  const { activeCourse, completedCourse } = useLearning();
  return (
    <div id="learning">
      {completedCourse ? (
        <CompletedCourse />
      ) : activeCourse ? (
        <ActiveCourse />
      ) : (
        <CreateCourse />
      )}
    </div>
  );
}
