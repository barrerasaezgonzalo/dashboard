"use client";

import { ListClock, SquarePlus } from "lucide-react";
import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { useHabit } from "@/app/hooks/useHabit";
import { HabitModal } from "./HabitModal";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { Toast } from "../Ui/Toast";
import { HabitItem } from "./HabitItem";

export function HabitTracking() {
  const {
    habits,
    progress,
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
    handleToggleCompleted,
    handleToggleDay,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseModal,
    handleSaveHabit,
    handleDeleteHabit,
  } = useHabit();

  return (
    <DashboardSection
      id="habits"
      button={
        <button
          type="button"
          onClick={handleOpenCreate}
          title="Nuevo hábito"
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-habits/50 transition hover:border-habits/80 hover:text-habits/80"
        >
          <SquarePlus size={25} />
        </button>
      }
      header={
        <SectionHeader
          title="Hábitos"
          description="Seguimiento de esta semana."
          icon={ListClock}
          color="habits"
        />
      }
    >
      <div className="mt-4 mx-4 flex items-center justify-between gap-2">
        <div className="rounded-lg bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-400">
          {progress}%
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              currentDay={currentDay}
              onToggleCompleted={handleToggleCompleted}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      </div>

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
