"use client";

import Link from "next/link";
import { Search as SearchLogo, Circle, CheckCircle2 } from "lucide-react";

import { useSearch } from "@/app/hooks/useSearch";

export function Search() {
  const { search, setSearch, filteredTasks } = useSearch();

  return (
    <div className="relative w-full max-w-100">
      <SearchLogo
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
      />

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search ..."
        className="h-10 w-full rounded-lg border border-neutral-600 bg-transparent pl-10 pr-4 text-sm text-neutral-200 outline-none placeholder:text-neutral-400 focus:border-neutral-500"
      />

      {search.trim() && (
        <div className="absolute left-0 top-12 z-50 w-full overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-xl">
          {filteredTasks.length > 0 ? (
            <div className="max-h-80 overflow-y-auto p-1">
              {filteredTasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/tasks?task=${task.id}`}
                  onClick={() => setSearch("")}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-neutral-700"
                >
                  {task.status === "done" ? (
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-blue-400"
                    />
                  ) : (
                    <Circle size={17} className="shrink-0 text-neutral-500" />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={[
                          "truncate text-sm",
                          task.status === "done"
                            ? "text-neutral-500 line-through"
                            : "text-neutral-200",
                        ].join(" ")}
                      >
                        {task.title}
                      </p>

                      <span className="shrink-0 rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                        Task
                      </span>
                    </div>

                    {task.summary && (
                      <p className="mt-0.5 truncate text-xs text-neutral-500">
                        {task.summary}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-neutral-500">
              No se encontraron resultados.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
