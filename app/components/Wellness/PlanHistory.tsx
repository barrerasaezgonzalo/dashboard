"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { usePlanHistory } from "@/app/hooks/usePlanHistory";

export function PlanHistory() {
  const {
    planHistory,
    scrollContainerRef,
    scroll,
    handleSelectPlan,
    isSelectedPlan,
  } = usePlanHistory();

  if (planHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-xl border-t border-neutral-700 px-4 py-3">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Planes anteriores
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-neutral-400 transition hover:border-amber-500/60 hover:text-white"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-neutral-400 transition hover:border-amber-500/60 hover:text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="custom-scroll flex overflow-x-auto scroll-smooth pb-2"
      >
        <div className="flex w-max gap-2">
          {planHistory.map((plan) => {
            const isSelected = isSelectedPlan(plan.id);

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => handleSelectPlan(plan)}
                title={plan.title}
                className={`
                  max-w-48 shrink-0 cursor-pointer rounded-lg border px-4 py-2 text-sm transition
                  ${
                    isSelected
                      ? "border-green-500/50 text-green-500"
                      : plan.status === "completed"
                        ? "border-neutral-700 text-neutral-400 hover:border-emerald-500/40 hover:text-emerald-500"
                        : "border-neutral-700 text-orange-500/50 hover:border-red-500/40 hover:text-red-400"
                  }
                `}
              >
                <span className="block truncate">{plan.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
