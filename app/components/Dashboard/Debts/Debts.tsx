"use client";

import { Check, CircleDollarSign, Plus, Wallet } from "lucide-react";

type DebtStatus = "pendding" | "payed";

type Debt = {
  id: number;
  title: string;
  base: string;
  status: DebtStatus;
};

const initialDebts: Debt[] = [
  {
    id: 1,
    title: "Gastos Comunes",
    base: "$10.000",
    status: "pendding",
  },
  {
    id: 2,
    title: "Arriendo",
    base: "$2.100",
    status: "pendding",
  },
  {
    id: 3,
    title: "Mantención",
    base: "$3.000",
    status: "payed",
  },
  {
    id: 4,
    title: "Internet",
    base: "$20.000",
    status: "payed",
  },
  {
    id: 5,
    title: "Electricidad",
    base: "$35.000",
    status: "payed",
  },
  {
    id: 6,
    title: "Agua",
    base: "$18.000",
    status: "payed",
  },
];

export function Debts() {
  const pending = initialDebts.filter((debt) => debt.status === "pendding");

  return (
    <section
      className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800"
      id="expenses"
    >
      <div className="flex items-start justify-between gap-3 border-b border-neutral-700 px-5 py-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <Wallet size={20} className="text-orange-400" />
            Gastos
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Controla tus pagos pendientes.
          </p>
        </div>

        <div className="rounded-lg bg-orange-500/10 px-3 py-1.5 text-sm font-medium text-orange-400">
          {pending.length} pendientes
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {initialDebts.map((debt) => {
            const isPaid = debt.status === "payed";

            return (
              <div
                key={debt.id}
                className={[
                  "group flex min-w-0 items-center gap-3 rounded-lg border p-3 transition",
                  isPaid
                    ? "border-neutral-700/50 bg-neutral-900/20"
                    : "border-orange-500/20 bg-orange-500/[0.03] hover:border-orange-500/40",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    isPaid
                      ? "bg-neutral-700/40 text-neutral-500"
                      : "bg-orange-500/10 text-orange-400",
                  ].join(" ")}
                >
                  <CircleDollarSign size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={[
                      "truncate text-sm font-medium",
                      isPaid
                        ? "text-neutral-500 line-through"
                        : "text-neutral-200",
                    ].join(" ")}
                  >
                    {debt.title}
                  </p>

                  <p
                    className={[
                      "mt-0.5 text-xs",
                      isPaid ? "text-neutral-600" : "text-orange-400",
                    ].join(" ")}
                  >
                    {debt.base}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {}}
                  title={isPaid ? "Pago realizado" : "Marcar como pagado"}
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition",
                    isPaid
                      ? "border-green-500/50 bg-green-500/10 text-green-400"
                      : "cursor-pointer border-neutral-700 text-neutral-500 hover:border-green-500/60 hover:bg-green-500/10 hover:text-green-400",
                  ].join(" ")}
                >
                  <Check size={14} strokeWidth={3} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-700 pt-4">
          <button
            type="button"
            onClick={() => {}}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-orange-500/10 px-3 py-2.5 text-xs font-medium text-orange-400 transition hover:bg-orange-500/20"
          >
            <Plus size={14} />
            Agregar gasto
          </button>
        </div>
      </div>
    </section>
  );
}
