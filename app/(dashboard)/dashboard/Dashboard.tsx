import { Notes } from "@/app/components/Notes/Notes";
import { Debts } from "@/app/components/Debts/Debts";
import { Files } from "@/app/components/Dashboard/Files/Files";
import { Calendar } from "@/app/components/Dashboard/Calendar";
import { Wellness } from "@/app/components/Wellness/Wellness";
import { HabitTracking } from "@/app/components/HabitTracking/HabitTracking";
import { Tasks } from "@/app/components/Task/Tasks";

export function Dashboard() {
  return (
    <div className="grid grid-cols-3 items-start gap-4">
      <div className="col-span-2 flex flex-col gap-4">
        <Wellness />
        <Tasks />
        <Debts />
      </div>

      <div className="flex flex-col gap-4">
        <HabitTracking />
        <Notes />
        <Calendar />
        <Files />
      </div>
    </div>
  );
}
