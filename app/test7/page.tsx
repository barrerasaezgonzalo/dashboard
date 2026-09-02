"use client";

import {
  CheckCircle,
  CircleOff,
  History,
  LogIn,
  ChevronRight,
  Sparkles,
} from "lucide-react";

type PlanStatus = "completed" | "abandoned";

interface HistoryPlan {
  id: number;
  title: string;
  date: string;
  status: PlanStatus;
  completedTasks: number;
  difficultTasks: number;
  totalTasks: number;
}

export default function HistoryPage() {
  const plans: HistoryPlan[] = [
    {
      id: 1,
      title: "Volver a encontrar calma",
      date: "28 Ago 2026",
      status: "completed",
      completedTasks: 5,
      difficultTasks: 2,
      totalTasks: 7,
    },
    {
      id: 2,
      title: "Recuperar energía y orden",
      date: "16 Ago 2026",
      status: "abandoned",
      completedTasks: 2,
      difficultTasks: 1,
      totalTasks: 7,
    },
    {
      id: 3,
      title: "Conectar conmigo y mi entorno",
      date: "02 Ago 2026",
      status: "completed",
      completedTasks: 6,
      difficultTasks: 1,
      totalTasks: 7,
    },
    {
      id: 4,
      title: "Conectar conmigo y mi entorno",
      date: "02 Ago 2026",
      status: "completed",
      completedTasks: 6,
      difficultTasks: 1,
      totalTasks: 7,
    },
    {
      id: 5,
      title: "Conectar conmigo y mi entorno",
      date: "02 Ago 2026",
      status: "completed",
      completedTasks: 6,
      difficultTasks: 1,
      totalTasks: 7,
    },
  ];

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
        <div className="custom-scroll overflow-y-auto p-5">
          <header className="mt-4 text-center">
            <div className="w-40 h-30 flex mx-auto items-center justify-center ">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    style={{ fill: "#3D3C38" }}
                    d="M12.379,23.42c5.151,0,9.589,3.073,11.604,7.478c2.015-4.405,6.452-7.478,11.604-7.478h0.438		c0.497-3.181-0.44-6.462-2.925-8.983l0,0l-4.815,3.82c-2.237,1.774-3.673,4.038-4.303,6.415c-0.63-2.377-2.066-4.641-4.303-6.415		l-4.815-3.82l0,0c-2.485,2.521-3.422,5.802-2.925,8.983H12.379z"
                  />
                  <g>
                    <g>
                      <path
                        style={{ fill: "#FF612B" }}
                        d="M23.997,21.559c0.86-1.581,2.063-3.001,3.561-4.193c-0.756-2.023-1.934-3.924-3.561-5.55				c-1.627,1.626-2.804,3.528-3.56,5.55C21.934,18.558,23.136,19.978,23.997,21.559z"
                      />
                    </g>
                    <g>
                      <path
                        style={{ fill: "#FF612B" }}
                        d="M12.393,24.58h-7.89c0,6.408,5.195,11.604,11.604,11.604h7.89				C23.997,29.775,18.801,24.58,12.393,24.58z"
                      />
                    </g>
                    <g>
                      <path
                        style={{ fill: "#FF612B" }}
                        d="M35.601,24.58c-6.409,0-11.604,5.195-11.604,11.604h7.89c6.409,0,11.604-5.196,11.604-11.604				H35.601z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <span className="mt-1 inline-flex items-center gap-1.5 bg-emerald-800/10 px-3 py-1 text-xs tracking-wide text-emerald-800">
              <Sparkles size={13} />
              Tu recorrido
            </span>

            <h1 className="mt-2 text-2xl font-semibold text-emerald-800">
              Historial de bienestar
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
              Aquí puedes volver a tus ciclos anteriores y recordar qué acciones
              te hicieron bien y cuáles fueron más difíciles.
            </p>
          </header>

          <section className="mt-8">
            <div className="flex flex-col">
              {plans.map((plan) => {
                const isCompleted = plan.status === "completed";

                return (
                  <button
                    key={plan.id}
                    type="button"
                    className="group flex w-full items-center gap-4 border-b border-neutral-200 py-5 text-left transition hover:bg-neutral-50"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ml-4 ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : (
                        <CircleOff size={20} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-sm font-semibold text-neutral-700">
                          {plan.title}
                        </h2>

                        <span
                          className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider ${
                            isCompleted ? "text-emerald-700" : "text-orange-700"
                          }`}
                        >
                          {isCompleted ? "Completado" : "Abandonado"}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-neutral-400">
                        {plan.date}
                      </p>

                      <div className="mt-2 flex items-center gap-4 text-xs">
                        <span className="text-emerald-700">
                          {plan.completedTasks} realizadas
                        </span>

                        <span className="text-orange-600">
                          {plan.difficultTasks} difíciles
                        </span>

                        <span className="text-neutral-400">
                          {plan.totalTasks} días
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className="shrink-0 text-neutral-300 transition group-hover:text-emerald-600"
                    />
                  </button>
                );
              })}
            </div>
          </section>

          <div className="mt-7 text-center">
            <p className="text-xs leading-5 text-neutral-400">
              Cada ciclo deja información útil para conocerte mejor y crear
              planes más realistas para ti.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
