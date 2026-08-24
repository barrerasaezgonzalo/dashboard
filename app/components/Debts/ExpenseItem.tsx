"use client";

import {
  Check,
  CircleDollarSign,
  MoveRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { formatNumber } from "@/app/utils";
import { ExpenseItemProps } from "@/app/types";

export function ExpenseItem({
  expense,
  amount,
  onAmountChange,
  onPaid,
}: ExpenseItemProps) {
  const isPaid = expense.status === "paid";

  const numericAmount = Number(amount) || 0;

  const isValidAmount = numericAmount >= 1;

  const paidAmount = expense.paid_amount;

  const lastPaidAmount = expense.last_paid_amount;

  const paidLess = isPaid && paidAmount < lastPaidAmount;

  const paidMore = isPaid && paidAmount > lastPaidAmount;

  const paidSame = isPaid && paidAmount === lastPaidAmount;

  return (
    <article
      className={`group flex min-w-0 items-center gap-3 rounded-lg border p-3 transition ${
        isPaid
          ? "border-blue-500/50 bg-neutral-800/20"
          : "border-red-700 bg-neutral-900/20"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          !isPaid
            ? "bg-neutral-700/40 text-neutral-500"
            : paidLess
              ? "bg-green-700/10 text-green-400"
              : paidMore
                ? "bg-red-700/10 text-red-400"
                : "bg-neutral-700/40 text-neutral-400"
        }`}
      >
        {!isPaid && <CircleDollarSign size={17} />}

        {paidLess && <TrendingDown size={17} />}

        {paidMore && <TrendingUp size={17} />}

        {paidSame && <MoveRight size={17} />}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            isPaid ? "text-neutral-200" : "text-neutral-400"
          }`}
        >
          {expense.title}
        </p>

        <p className="mt-0.5 text-xs text-neutral-500">
          Mes anterior: ${formatNumber(expense.last_paid_amount)}
        </p>

        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={(event) => onAmountChange(expense.id, event.target.value)}
          placeholder="Monto pagado"
          className="mt-2 h-8 w-fit rounded-md border border-neutral-700 bg-neutral-800 px-2 text-xs text-neutral-200 outline-none placeholder:text-neutral-600 focus:border-debts/60"
        />
      </div>

      <button
        type="button"
        disabled={!isValidAmount}
        onClick={() => onPaid(expense.id, expense.status)}
        title={isPaid ? "Actualizar monto" : "Marcar como pagado"}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition ${
          !isValidAmount
            ? "cursor-not-allowed border-neutral-700 text-neutral-700"
            : isPaid
              ? "cursor-pointer border-blue-500/50 bg-blue-500/10 text-blue-500"
              : "cursor-pointer border-neutral-700 text-neutral-500 hover:border-blue-500/60 hover:bg-blue-500/10 hover:text-blue-500"
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </button>
    </article>
  );
}
