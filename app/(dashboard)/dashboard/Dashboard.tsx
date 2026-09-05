"use client";

import { Notes } from "@/app/components/Notes/Notes";
import { Expenses } from "@/app/components/Expenses/Expenses";
import { HabitTracking } from "@/app/components/HabitTracking/HabitTracking";
import { Tasks } from "@/app/components/Task/Tasks";
import { Calendar } from "@/app/components/Calendar/Calendar";
import { useEffect } from "react";

export function Dashboard() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({
      block: "start",
    });
  }, []);

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 scroll-mt-32 pb-8">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <Tasks />
        <Expenses />
      </div>
      <div className="flex flex-col gap-4 lg:col-span-1">
        <Calendar />
        <HabitTracking />
        <Notes />
      </div>
    </div>
  );
}
