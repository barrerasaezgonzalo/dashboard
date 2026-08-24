"use client";

import { Lock, ListClock, Plus } from "lucide-react";

type Habit = {
  id: number;
  name: string;
  days: boolean[];
  completed: boolean[];
};

const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

const habits: Habit[] = [
  {
    id: 1,
    name: "Caminar 30 min",
    days: [true, true, true, true, true, true, true],
    completed: [true, true, false, false, false, false, false],
  },
  {
    id: 2,
    name: "Leer 20 min",
    days: [true, true, true, true, true, true, true],
    completed: [true, false, true, false, false, false, false],
  },
  {
    id: 3,
    name: "Ejercicio",
    days: [true, false, true, false, true, false, false],
    completed: [true, false, false, false, false, false, false],
  },
  {
    id: 4,
    name: "Tomar agua",
    days: [true, true, true, true, true, true, true],
    completed: [true, true, true, false, false, false, false],
  },
  {
    id: 5,
    name: "Meditar",
    days: [true, true, true, true, true, false, false],
    completed: [false, true, false, false, false, false, false],
  },
  {
    id: 6,
    name: "Estudiar",
    days: [true, true, true, true, true, false, false],
    completed: [true, false, true, false, false, false, false],
  },
  {
    id: 7,
    name: "Ordenar escritorio",
    days: [false, false, false, false, true, false, false],
    completed: [false, false, false, false, false, false, false],
  },
  {
    id: 8,
    name: "Planificar semana",
    days: [true, false, false, false, false, false, true],
    completed: [true, false, false, false, false, false, false],
  },
];

export function HabitTracking() {
  const today = new Date();

  const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;

  const availableUntilToday = habits.flatMap((habit) =>
    habit.days.map((enabled, index) => ({
      enabled,
      completed: habit.completed[index],
      index,
    })),
  );

  const totalAvailable = availableUntilToday.filter(
    (day) => day.enabled && day.index <= currentDay,
  ).length;

  const totalCompleted = availableUntilToday.filter(
    (day) => day.enabled && day.completed && day.index <= currentDay,
  ).length;

  const progress =
    totalAvailable > 0
      ? Math.round((totalCompleted / totalAvailable) * 100)
      : 0;

  return (
    <section
      className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800"
      id="habits"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-neutral-700 px-5 py-4">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <ListClock size={20} className="text-cyan-400" />
            Hábitos
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Seguimiento de esta semana.
          </p>
        </div>

        <div className="rounded-lg bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-400">
          {progress}%
        </div>
      </div>

      {/* Week */}
      <div className="p-4">
        {/* Habits */}
        <div className="space-y-1">
          <div className="space-y-1">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="grid grid-cols-[minmax(140px,1fr)_repeat(7,36px)] items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-neutral-700/30"
              >
                <span className="truncate text-sm text-neutral-300">
                  {habit.name}
                </span>

                {habit.days.map((enabled, index) => {
                  const future = index > currentDay;
                  const completed = habit.completed[index];
                  const disabled = !enabled || future;

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={disabled}
                      className={[
                        "flex h-6 w-6 items-center justify-center rounded-lg border text-xs font-medium transition",
                        !enabled
                          ? "cursor-not-allowed border-neutral-700/40 bg-neutral-900/30 text-neutral-600"
                          : future
                            ? "cursor-not-allowed border-neutral-500 bg-neutral-900/30 text-neutral-400 opacity-30"
                            : completed
                              ? "cursor-pointer border-cyan-500 bg-cyan-500/15 text-cyan-400"
                              : "cursor-pointer border-neutral-600 text-neutral-400 hover:border-cyan-500/60 hover:text-cyan-400",
                      ].join(" ")}
                    >
                      {!enabled ? <Lock size={11} /> : weekDays[index]}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-700 pt-3 text-xs text-neutral-500">
          <button
            type="button"
            onClick={() => {}}
            className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-lg bg-cyan-500/10 px-2 py-3 font-medium text-cyan-400 transition hover:bg-cyan-500/20"
          >
            <Plus size={14} />
            Agregar hábito
          </button>
        </div>
      </div>
    </section>
  );
}
