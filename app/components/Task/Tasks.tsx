"use client";

import { ListTodo, SquarePlus } from "lucide-react";

import { useTask } from "@/app/hooks/useTask";

import { TaskGroup } from "./TaskGroup";
import { TaskModal } from "./TaskModal";

import { ConfirmModal } from "../Ui/ConfirmModal";
import { SectionHeader } from "../Ui/SectionHeader";
import { DashboardSection } from "../Ui/DashboardSection";
import { TaskSummary } from "./TaskSummary";
import { Toast } from "../Ui/Toast";

export function Tasks() {
  const {
    handleNextStatus,
    taskGroupConfig,
    handleOpenCreate,
    responseOperationMessage,
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

  return (
    <DashboardSection
      id="tasks"
      header={
        <SectionHeader
          title="Tareas"
          description="Gestiona el estado de tus tareas."
          icon={ListTodo}
          color="tasks"
        />
      }
    >
      <div className="m-4 flex">
        <TaskSummary groups={taskGroupConfig} />

        <button
          type="button"
          onClick={handleOpenCreate}
          className="ml-auto flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-tasks/50 transition hover:border-tasks/80 hover:text-tasks/80"
        >
          <SquarePlus size={25} />
        </button>
      </div>

      <div className="space-y-5 px-3 py-4">
        {taskGroupConfig.map((group) => (
          <TaskGroup
            {...group}
            key={group.status}
            onNextStatus={handleNextStatus}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
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
        title="Eliminar tarea"
        description="¿Estás seguro de que deseas eliminar esta tarea?"
        variant="warning"
        onConfirm={handleDeleteTask}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      <Toast message={responseOperationMessage} />
    </DashboardSection>
  );
}
