"use client";

import { ListOrdered, Sparkles } from "lucide-react";

export function EmptyPlanBlock() {
  return (
    <section className="flex h-full w-full min-w-0 flex-col rounded-xl border border-neutral-700 bg-neutral-800 p-5">
      <div className="flex items-start justify-between gap-3 border-b border-neutral-700 pb-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <ListOrdered size={20} className="text-green-500" />
            Plan Wellness
          </h2>

          <p className="mt-1 text-sm text-neutral-500">Wellness Action Plan</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
          <Sparkles size={22} className="text-green-400" />
        </div>

        <h3 className="mt-4 text-sm font-medium text-neutral-200">
          Aún no tienes un plan
        </h3>

        <p className="mt-2 max-w-sm text-xs leading-relaxed text-neutral-500">
          Completa tu check-in para generar un plan personalizado para los
          próximos días.
        </p>
      </div>
    </section>
  );
}
