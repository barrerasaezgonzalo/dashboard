"use client";

import { useState } from "react";
import { useTask } from "./useTask";

export function useSearch() {
  const { tasks } = useTask();
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const term = search.toLowerCase().trim();
    if (!term) return false;
    return (
      task.title.toLowerCase().includes(term) ||
      task.summary?.toLowerCase().includes(term)
    );
  });

  return {
    search,
    setSearch,
    filteredTasks,
  };
}
