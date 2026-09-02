"use client";

import { ListTodo, SquarePlus } from "lucide-react";
import { useTask } from "@/app/hooks/useTask";
import { TaskGroup } from "./TaskGroup";
import { TaskModal } from "./TaskModal";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { SectionHeader } from "../Ui/SectionHeader";
import { DashboardSection } from "../Ui/DashboardSection";
import { Toast } from "../Ui/Toast";
import { SectionActionButton } from "../Ui/SectionActionButton";

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
      button={
        <SectionActionButton
          onClick={handleOpenCreate}
          icon={SquarePlus}
          color="blue"
        />
      }
      header={
        <SectionHeader
          title="Tareas"
          description="Gestiona el estado de tus tareas."
          icon={ListTodo}
          color="blue"
        />
      }
    >
      <TaskGroup
        taskGroupConfig={taskGroupConfig}
        onNextStatus={handleNextStatus}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

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
