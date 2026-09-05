"use client";

import {
  Check,
  CircleDollarSign,
  MoveRight,
  Save,
  SquarePen,
  Trash2,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";

import type { ExpenseItemProps } from "@/app/types/expenses";
import { useExpenseItem } from "@/app/hooks/useExpenseItem";
import { ConfirmModal } from "../Ui/ConfirmModal";

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const {
    title,
    setTitle,
    isEditing,
    isDeleteOpen,
    setIsDeleteOpen,
    formattedAmount,
    formattedLastMonth,
    hasChanges,
    isPaid,
    spentLess,
    spentMore,
    spentSame,
    handleAmountChange,
    handleSaveAmount,
    handleOpenEdit,
    handleCancelEdit,
    handleSaveTitle,
    handleDelete,
    titleHasChanges,
  } = useExpenseItem(expense);

  return (
    <>
      <article
        className={`rounded-lg border p-3 transition ${
          isPaid
            ? "border-blue-500/50 bg-neutral-800/20"
            : "border-orange-400/50 bg-neutral-900/20"
        }`}
      >
        <div className="flex items-center gap-1">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              spentLess
                ? "bg-green-700/10 text-green-400"
                : spentMore
                  ? "bg-red-700/10 text-red-400"
                  : "bg-neutral-700/40 text-neutral-400"
            }`}
          >
            {spentLess ? (
              <TrendingDown size={18} />
            ) : spentMore ? (
              <TrendingUp size={18} />
            ) : spentSame ? (
              <MoveRight size={18} />
            ) : (
              <CircleDollarSign
                size={18}
                className={isPaid ? "text-blue-500/50" : ""}
              />
            )}
          </div>

          {isEditing ? (
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-9 min-w-0 flex-1 rounded-md border border-neutral-700 bg-neutral-800 px-2 text-base text-neutral-300 outline-none focus:border-indigo-500/60"
            />
          ) : (
            <p
              className={`min-w-0 flex-1 truncate text-lg font-medium ${
                isPaid ? "text-neutral-200" : "text-neutral-400"
              }`}
            >
              {expense.title}
            </p>
          )}

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSaveTitle}
                disabled={!title.trim() || !titleHasChanges}
                title="Guardar nombre"
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                  titleHasChanges && title.trim()
                    ? "cursor-pointer text-green-400 hover:text-green-300"
                    : "cursor-not-allowed text-neutral-700"
                }`}
              >
                <Save size={18} />
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
                title="Cancelar edición"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-white"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                title="Editar gasto"
                onClick={handleOpenEdit}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-white"
              >
                <SquarePen size={18} />
              </button>

              <button
                type="button"
                title="Eliminar gasto"
                onClick={() => setIsDeleteOpen(true)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <input
              type="text"
              inputMode="numeric"
              value={formattedAmount}
              onChange={(event) => handleAmountChange(event.target.value)}
              placeholder="Monto"
              className="h-9 w-full rounded-md border border-neutral-700 bg-neutral-800 px-2 text-base text-neutral-400 outline-none placeholder:text-neutral-500 focus:border-indigo-500/60"
            />

            <p className="mt-1 pl-1 text-xs text-neutral-500">
              Anterior {formattedLastMonth}
            </p>
          </div>

          <button
            type="button"
            disabled={!hasChanges && !isPaid}
            onClick={handleSaveAmount}
            title="Guardar monto"
            className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-indigo-500/50 text-indigo-400 transition hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-transparent disabled:text-neutral-700 ${
              isPaid ? "bg-indigo-500/10" : ""
            }`}
          >
            <Check size={16} strokeWidth={3} />
          </button>
        </div>
      </article>

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Eliminar gasto"
        description={`¿Estás seguro de que deseas eliminar "${expense.title}"?`}
        variant="warning"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
