"use client";

import {
  Ban,
  Check,
  CheckCircle,
  History,
  LogIn,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

type PlanStatus = "pending" | "completed" | "rejected";

interface PlanDay {
  day: number;
  title: string;
  description: string;
  status: PlanStatus;
}

export default function Page() {
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const [days, setDays] = useState<PlanDay[]>([
    {
      day: 1,
      title: "Haz espacio para respirar",
      description:
        "Regálate 10 minutos sin pantallas ni distracciones. Busca un lugar tranquilo y simplemente permite que tu cuerpo baje el ritmo.",
      status: "completed",
    },
    {
      day: 2,
      title: "Ordena un espacio pequeño",
      description:
        "Elige un lugar reducido que te genere ruido visual y ordénalo sin intentar solucionar todo de una vez.",
      status: "pending",
    },
    {
      day: 3,
      title: "Conecta con alguien",
      description:
        "Escribe o llama a una persona con quien te haga bien conversar, aunque sea por unos minutos.",
      status: "pending",
    },
    {
      day: 4,
      title: "Muévete sin exigencias",
      description:
        "Haz una caminata breve o algún movimiento suave que te permita salir de la rutina.",
      status: "pending",
    },
    {
      day: 5,
      title: "Haz algo solo para ti",
      description:
        "Dedica un momento a una actividad que disfrutes sin necesidad de convertirla en algo productivo.",
      status: "pending",
    },
    {
      day: 6,
      title: "Suelta algo pendiente",
      description:
        "Identifica una pequeña tarea que llevas postergando y dedica unos minutos a resolverla.",
      status: "pending",
    },
    {
      day: 7,
      title: "Mira lo que avanzaste",
      description:
        "Reserva unos minutos para observar cómo te sentiste durante estos días y qué acciones quisieras mantener.",
      status: "pending",
    },
  ]);

  const completed = days.filter((day) => day.status === "completed").length;

  const progress = Math.round((completed / days.length) * 100);

  const canCompletePlan =
    days.length > 0 && days.every((day) => day.status !== "pending");

  const handleStatusChange = (day: number, status: PlanStatus) => {
    setDays((current) =>
      current.map((item) =>
        item.day === day
          ? {
              ...item,
              status: item.status === status ? "pending" : status,
            }
          : item,
      ),
    );
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.6]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col border border-white/50 bg-white/95 shadow-2xl backdrop-blur-md">
        <div className="flex justify-end gap-3 px-5 pt-5 text-sm">
          <button
            type="button"
            className="flex items-center gap-1 text-neutral-500 transition hover:text-neutral-700"
          >
            <History size={15} />
            Historial
          </button>

          <button
            type="button"
            className="flex items-center gap-1 text-emerald-700 transition hover:text-emerald-800"
          >
            <LogIn size={15} />
            Iniciar sesión
          </button>
        </div>

        <div className="custom-scroll overflow-y-auto px-5 pb-6 pt-2">
          <header className="flex flex-col items-center text-center">
            <div className="flex h-28 w-36 items-center justify-center">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <g>
                  <path
                    style={{ fill: "#3D3C38" }}
                    d="M12.379,23.42c5.151,0,9.589,3.073,11.604,7.478c2.015-4.405,6.452-7.478,11.604-7.478h0.438 c0.497-3.181-0.44-6.462-2.925-8.983l0,0l-4.815,3.82c-2.237,1.774-3.673,4.038-4.303,6.415c-0.63-2.377-2.066-4.641-4.303-6.415 l-4.815-3.82l0,0c-2.485,2.521-3.422,5.802-2.925,8.983H12.379z"
                  />

                  <g>
                    <path
                      style={{ fill: "#FF612B" }}
                      d="M23.997,21.559c0.86-1.581,2.063-3.001,3.561-4.193c-0.756-2.023-1.934-3.924-3.561-5.55 c-1.627,1.626-2.804,3.528-3.56,5.55C21.934,18.558,23.136,19.978,23.997,21.559z"
                    />

                    <path
                      style={{ fill: "#FF612B" }}
                      d="M12.393,24.58h-7.89c0,6.408,5.195,11.604,11.604,11.604h7.89 C23.997,29.775,18.801,24.58,12.393,24.58z"
                    />

                    <path
                      style={{ fill: "#FF612B" }}
                      d="M35.601,24.58c-6.409,0-11.604,5.195-11.604,11.604h7.89c6.409,0,11.604-5.196,11.604-11.604 H35.601z"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div className="mt-1 inline-flex items-center gap-1.5 bg-emerald-800/10 px-3 py-1 text-xs tracking-wide text-emerald-800">
              <Sparkles size={13} />
              Tu plan está listo
            </div>

            <h1 className="mt-4 text-2xl font-semibold text-emerald-800">
              Tu ruta para volver a ti
            </h1>

            <p className="mt-3 max-w-md text-sm font-medium leading-6 text-neutral-500">
              Esta semana vamos a enfocarnos en recuperar un poco de calma,
              ordenar lo que tienes en mente y crear pequeños espacios para
              cuidarte sin exigirte cambios drásticos.
            </p>
          </header>

          <div className="mt-6 border-y border-neutral-200 py-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-500">
                Progreso de tu plan
              </span>

              <span className="font-semibold text-emerald-700">
                {completed} de {days.length}
              </span>
            </div>

            <div className="h-1.5 w-full bg-neutral-200">
              <div
                className="h-full bg-emerald-600 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <section className="mt-5">
            <div className="mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Tu ruta
              </span>

              <h2 className="mt-1 text-lg font-semibold text-neutral-700">
                Pequeños pasos, uno a la vez
              </h2>
            </div>

            <div className="flex flex-col">
              {days.map((item) => {
                const isCompleted = item.status === "completed";

                const isRejected = item.status === "rejected";

                return (
                  <div
                    key={item.day}
                    className="border-b border-neutral-200 py-4"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center text-xs font-semibold ${
                          isCompleted
                            ? "bg-emerald-600 text-white"
                            : isRejected
                              ? "bg-orange-100 text-orange-700"
                              : "border border-neutral-300 text-neutral-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={16} />
                        ) : isRejected ? (
                          <Ban size={15} />
                        ) : (
                          item.day
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <span
                          className={`text-sm font-semibold ${
                            isCompleted
                              ? "text-neutral-400 line-through"
                              : isRejected
                                ? "text-orange-700"
                                : "text-neutral-700"
                          }`}
                        >
                          {item.title}
                        </span>

                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                          {item.description}
                        </p>

                        <div className="mt-3 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(item.day, "completed")
                            }
                            className={`flex items-center gap-1.5 text-xs font-medium transition ${
                              isCompleted
                                ? "text-emerald-700"
                                : "text-neutral-400 hover:text-emerald-700"
                            }`}
                          >
                            <Check size={15} />
                            La hice
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(item.day, "rejected")
                            }
                            className={`flex items-center gap-1.5 text-xs font-medium transition ${
                              isRejected
                                ? "text-orange-700"
                                : "text-neutral-400 hover:text-orange-700"
                            }`}
                          >
                            <Ban size={15} />
                            No pude hacerla
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="mt-6 text-center">
            <p className="text-xs leading-5 text-neutral-400">
              No necesitas hacerlo perfecto. Avanza a tu ritmo y vuelve cuando
              lo necesites.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5">
            {!confirmAbandon ? (
              <button
                type="button"
                onClick={() => setConfirmAbandon(true)}
                className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition hover:text-orange-700"
              >
                <Ban size={16} />
                Abandonar plan
              </button>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span className="text-xs text-neutral-500">
                  ¿Seguro que quieres abandonar?
                </span>
                <div className="flex flex-row gap-2 items-center mr-auto">
                  <button
                    type="button"
                    onClick={() => setConfirmAbandon(false)}
                    className="text-xs font-medium text-neutral-400 transition hover:text-neutral-600"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={() => {}}
                    className="text-xs font-medium text-orange-700 transition hover:text-orange-800"
                  >
                    Sí, abandonar
                  </button>
                </div>
              </div>
            )}

            <button
              disabled={!canCompletePlan}
              type="button"
              className="flex items-center gap-2 bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              <CheckCircle size={17} />
              Completar plan
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
