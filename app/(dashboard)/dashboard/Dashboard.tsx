import { Notes } from "@/app/components/Notes/Notes";
import { Debts } from "@/app/components/Debts/Debts";
import { Wellness } from "@/app/components/Wellness/Wellness";
import { HabitTracking } from "@/app/components/HabitTracking/HabitTracking";
import { Tasks } from "@/app/components/Task/Tasks";
import { Calendar } from "@/app/components/Calendar/Calendar";
import { Prompt } from "@/app/components/Prompt/Prompt";
import { Files } from "@/app/components/Files/Files";

export function Dashboard() {
  return (
    <div className="grid grid-cols-3 items-start gap-4 ">
      <div className="col-span-2 flex flex-col gap-4 ">
        <Tasks />
        <Wellness />
        <Debts />
      </div>

      <div className="flex flex-col gap-4 ">
        <Files />
        <HabitTracking />
        <Notes />
        <Calendar />
        <Prompt />
      </div>
    </div>
  );
}
