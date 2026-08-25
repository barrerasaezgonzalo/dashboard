"use client";

import { useEffect, useRef, useState } from "react";
import { isDateOverdue } from "@/app/utils";
import type { Task } from "@/app/types";
import { useTask } from "./useTask";

export function useTaskItem(task: Task) {
  const [confirming, setConfirming] = useState(false);
  const { taskGroupConfig, getNextStatus } = useTask();
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const overdue =
    task.status !== "done" && !!task.date && isDateOverdue(task.date);
  const nextStatus = getNextStatus(task.status);

  const currentStatus =
    taskGroupConfig.find((option) => option.status === task.status) ??
    taskGroupConfig[0];

  const availableStatusOptions = taskGroupConfig.filter(
    (option) => option.status !== task.status,
  );

  useEffect(() => {
    if (!confirming) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target as Node)
      ) {
        setConfirming(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [confirming]);

  return {
    overdue,
    confirming,
    setConfirming,
    nextStatus,
    currentStatus,
    availableStatusOptions,
    statusMenuRef,
  };
}
