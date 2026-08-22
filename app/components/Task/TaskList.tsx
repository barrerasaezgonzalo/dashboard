"use client";
import { CheckCircle2, ListTodo, Plus } from "lucide-react";
import { useTask } from "@/app/hooks/useTask";
import { TaskGroup } from "./TaskGroup";
import { TaskModal } from "./TaskModal";
import ConfirmModal from "../Ui/ConfirmModal";
import { useSearchParams } from "next/navigation";

export function TaskList() {
  const {
    expandedTasks,
    handleNextStatus,
    handleToggleSummary,
    taskGroups,
    handleOpenCreate,
    successMessage,
    handleOpenEdit,
    handleOpenDelete,
    isModalOpen,
    setIsModalOpen,
    selectedTask,
    handleUpdateTask,
    handleCreateTask,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteTask,
  } = useTask();

  const searchParams = useSearchParams();
  const selectedTaskId = Number(searchParams.get("task"));

  return (
    <section className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-700 px-5 py-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <ListTodo size={20} />
            Tareas
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Gestiona el estado de tus tareas.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          <Plus size={17} />
          Nueva tarea
        </button>

        {successMessage && (
          <div className="fixed top-2 right-5 z-50 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 shadow-lg">
            <CheckCircle2 size={17} />
            {successMessage}
          </div>
        )}
      </div>

      <div className="space-y-5 border-t border-neutral-700 px-3 py-4">
        {taskGroups.map((group) => (
          <TaskGroup
            {...group}
            key={group.title}
            title={group.title}
            tasks={group.tasks}
            emptyMessage={group.emptyMessage}
            expandedTasks={expandedTasks}
            onNextStatus={handleNextStatus}
            onToggleSummary={handleToggleSummary}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            selectedTaskId={selectedTaskId}
          />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title={"Eliminar tarea"}
        description={"¿Estas seguro que deseas eliminar esta tarea?"}
        variant="warning"
        onConfirm={handleDeleteTask}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </section>
  );
}
