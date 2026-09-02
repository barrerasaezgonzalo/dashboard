"use client";

import { History, LogIn, Sparkles } from "lucide-react";

export default function EmptyHistoryPage() {
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

      <div className="relative w-full max-w-lg border border-white/50 bg-white/95 px-6 py-6 shadow-2xl backdrop-blur-md">
        <div className="flex justify-end gap-3 text-sm">
          <button
            type="button"
            className="flex items-center gap-1 text-emerald-700 transition hover:text-emerald-800"
          >
            <History size={15} />
            Historial
          </button>

          <button
            type="button"
            className="flex items-center gap-1 text-neutral-500 transition hover:text-neutral-700"
          >
            <LogIn size={15} />
            Iniciar sesión
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center text-center">
          <div className="flex h-24 w-28 items-center justify-center">
            <svg viewBox="0 0 48 48" className="h-full w-full">
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

          <div className="mt-4 mb-4 inline-flex items-center gap-1.5 bg-emerald-800/10 px-3 py-1 text-xs tracking-wide text-emerald-800">
            <Sparkles size={13} />
            Tu recorrido
          </div>

          <h1 className="mt-3 text-2xl font-semibold text-emerald-800">
            Aún no tienes planes anteriores
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
            Cuando completes o cierres un plan de bienestar, podrás volver aquí
            para revisar tu recorrido y recordar qué acciones te ayudaron más.
          </p>

          <div className="mt-8 w-full border-y border-neutral-200 py-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <History size={22} />
            </div>

            <p className="mt-4 text-sm font-medium text-neutral-600">
              Tu historial comenzará con tu primer plan.
            </p>

            <p className="mt-1 text-xs leading-5 text-neutral-400">
              Aquí aparecerán tus planes completados y abandonados.
            </p>
          </div>

          <button
            type="button"
            className="mt-7 bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Crear mi primer plan
          </button>
        </div>
      </div>
    </main>
  );
}
