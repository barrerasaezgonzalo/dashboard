"use client";

import { useState } from "react";

import type {
  Task,
  TaskGroupConfig,
  TaskStatus,
  TaskStatusOption,
} from "@/app/types";
import { isDateOverdue } from "@/app/utils";

export function useTaskItem(
  task: Task,
  taskGroupConfig: TaskGroupConfig[],
  getNextStatus: (status: TaskStatus) => TaskStatus,
) {
  const [confirming, setConfirming] = useState(false);

  const overdue =
    !!task.date && task.status !== "done" && isDateOverdue(task.date);

  const currentStatus =
    taskGroupConfig.find((option) => option.status === task.status) ??
    taskGroupConfig[0];

  const availableStatusOptions: TaskStatusOption[] = taskGroupConfig
    .filter((option) => option.status !== task.status)
    .map((option) => ({
      status: option.status,
      title: option.title,
      className: option.className,
    }));

  return {
    overdue,
    confirming,
    setConfirming,
    currentStatus,
    availableStatusOptions,
    getNextStatus,
  };
}
