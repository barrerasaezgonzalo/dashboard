import { HabitGroupProps } from "@/app/types/habits";
import { HabitItem } from "./HabitItem";

export function HabitGroup({
  habits,
  currentDay,
  onToggleCompleted,
  onEdit,
  onDelete,
}: HabitGroupProps) {
  return (
    <div className="p-4">
      {habits.length > 0 ? (
        <div className="space-y-2">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              currentDay={currentDay}
              onToggleCompleted={onToggleCompleted}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-20 items-center justify-center rounded-lg border border-dashed border-neutral-700">
          <p className="text-base text-neutral-500">
            No tienes hábitos creados.
          </p>
        </div>
      )}
    </div>
  );
}
