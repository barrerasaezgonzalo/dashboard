"use client";

import { ListClock, SquarePlus } from "lucide-react";
import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { useHabit } from "@/app/hooks/useHabit";
import { HabitModal } from "./HabitModal";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { Toast } from "../Ui/Toast";
import { SectionActionButton } from "../Ui/SectionActionButton";
import { HabitGroup } from "./HabitGroup";
import { useHabitItem } from "@/app/hooks/useHabitItem";

export function HabitTracking() {
  const {
    habits,
    currentDay,
    selectedHabit,
    isModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    responseOperationMessage,
    name,
    setName,
    days,
    saving,
    invalidHabit,
    handleToggleDay,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseModal,
    handleSaveHabit,
    handleDeleteHabit,
  } = useHabit();
  const { handleToggleCompleted } = useHabitItem();

  return (
    <DashboardSection
      id="habits"
      button={
        <SectionActionButton
          onClick={handleOpenCreate}
          icon={SquarePlus}
          color="cyan"
        />
      }
      header={<SectionHeader title="Hábitos" icon={ListClock} color="cyan" />}
    >
      <HabitGroup
        habits={habits}
        currentDay={currentDay}
        onToggleCompleted={handleToggleCompleted}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <HabitModal
        isOpen={isModalOpen}
        habit={selectedHabit}
        name={name}
        days={days}
        saving={saving}
        invalidHabit={invalidHabit}
        setName={setName}
        onToggleDay={handleToggleDay}
        onClose={handleCloseModal}
        onSubmit={handleSaveHabit}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminar hábito"
        description="¿Estás seguro de que deseas eliminar este hábito?"
        variant="warning"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteHabit}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <Toast message={responseOperationMessage} />
    </DashboardSection>
  );
}
