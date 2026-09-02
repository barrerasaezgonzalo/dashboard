import { useHorizontalScroll } from "@/app/hooks/useHorizontalScroll";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HistoryCourses() {
  const { scrollContainerRef, scroll } = useHorizontalScroll();
  const last = [
    "Como hacer Test unitarios",
    "Como user Kiro CLI para AI ",
    "Como aprender React",
    "Como prepararse para una entreivista",
    "Como generar un plan de Marketing",
  ];

  return (
    <>
      {last && (
        <div className="w-full border-t border-neutral-700 bg-neutral-800">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-base font-semibold mt-4 uppercase tracking-wider text-neutral-400">
              Aprendizajes anteriores
            </span>

            <div className="flex items-center gap-1 mt-4">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-neutral-400 transition hover:border-violet-500/60 hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() => scroll("right")}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-neutral-400 transition hover:border-violet-500/60 hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="custom-scroll flex overflow-x-auto scroll-smooth pb-2"
          >
            <div className="flex w-xl-max gap-2 mb-4">
              {last.map((plan) => {
                return (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => plan}
                    title={plan}
                    className={`
                                max-w-60 shrink-0 cursor-pointer rounded-lg border px-4 py-4 text-base transition bg-neutral-900/60                      
                                border-neutral-700 text-neutral-500 hover:border-violet-500/40 hover:text-violet-500"
                    `}
                  >
                    <span className="block truncate">{plan}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
