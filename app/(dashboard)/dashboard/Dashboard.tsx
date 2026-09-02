"use client";
import { Notes } from "@/app/components/Notes/Notes";
import { Debts } from "@/app/components/Debts/Debts";
import { Wellness } from "@/app/components/Wellness/Wellness";
import { HabitTracking } from "@/app/components/HabitTracking/HabitTracking";
import { Tasks } from "@/app/components/Task/Tasks";
import { Calendar } from "@/app/components/Calendar/Calendar";
import { Prompt } from "@/app/components/Prompt/Prompt";
import { Files } from "@/app/components/Files/Files";
import { Learning } from "@/app/components/Learning/Learning";

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 scroll-mt-32">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <Tasks />
        <Wellness />
        <Debts />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Files />
          <Prompt />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-1">
        <Calendar />
        <HabitTracking />
        <Learning />
        <Notes />
      </div>
    </div>
  );
}
