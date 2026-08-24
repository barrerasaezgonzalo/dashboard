"use client";

import {
  CheckCircle2,
  Circle,
  Search as SearchLogo,
  SquareText,
  X,
} from "lucide-react";

import { useSearch } from "@/app/hooks/useSearch";

import { TaskModal } from "../Task/TaskModal";

export function Search() {
  const {
    search,
    setSearch,
    filteredTasks,
    filteredNotes,
    selectedTask,
    setIsModalOpen,
    handleTaskClick,
    handleNoteClick,
    handleUpdateTask,
    isModalOpen,
    searchRef,
  } = useSearch();
  const hasResults = filteredTasks.length > 0 || filteredNotes.length > 0;

  return (
    <div className="relative w-full max-w-70" ref={searchRef}>
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

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-700 hover:text-neutral-200"
          title="Limpiar búsqueda"
          aria-label="Limpiar búsqueda"
        >
          <X size={15} />
        </button>
      )}

      {search.trim() && (
        <div className="absolute left-0 top-12 z-50 w-full overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-xl">
          {hasResults ? (
            <div className="custom-scroll max-h-80 overflow-y-auto p-1">
              {filteredTasks.map((task) => (
                <button
                  key={`task-${task.id}`}
                  type="button"
                  onClick={() => handleTaskClick(task)}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-neutral-700"
                >
                  {task.status === "done" ? (
                    <CheckCircle2 size={17} className="shrink-0 text-tasks" />
                  ) : (
                    <Circle size={17} className="shrink-0 text-neutral-500" />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={`truncate text-sm ${
                          task.status === "done"
                            ? "text-neutral-500 line-through"
                            : "text-neutral-200"
                        }`}
                      >
                        {task.title}
                      </p>

                      <span className="shrink-0 rounded-md bg-tasks/10 px-2 py-0.5 text-[10px] font-medium text-tasks">
                        Tarea
                      </span>
                    </div>

                    {task.summary && (
                      <p className="mt-0.5 truncate text-xs text-neutral-500">
                        {task.summary}
                      </p>
                    )}
                  </div>
                </button>
              ))}

              {filteredNotes.map((note) => (
                <button
                  key={`note-${note.id}`}
                  type="button"
                  onClick={() => handleNoteClick(note)}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-neutral-700"
                >
                  <SquareText size={17} className="shrink-0 text-notes" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm text-neutral-200">
                        {note.title}
                      </p>

                      <span className="shrink-0 rounded-md bg-notes/10 px-2 py-0.5 text-[10px] font-medium text-notes">
                        Nota
                      </span>
                    </div>

                    {note.content && (
                      <p className="mt-0.5 truncate text-xs text-neutral-500">
                        {note.content}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-neutral-500">
              No se encontraron resultados.
            </div>
          )}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedTask ? handleUpdateTask : () => {}}
      />
    </div>
  );
}
