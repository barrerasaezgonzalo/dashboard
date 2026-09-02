"use client";

import { CheckCircle, History, LogIn, RotateCcw, Sparkles } from "lucide-react";

export default function CompletedPlanPage() {
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

      <div className="relative w-full max-w-lg border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex justify-end gap-3 text-sm">
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

        <div className="flex flex-col items-center text-center mt-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle size={32} />
          </div>

          <div className="mt-4 mb-4 inline-flex items-center gap-1.5 bg-emerald-800/10 px-3 py-1 text-xs tracking-wide text-emerald-800">
            <Sparkles size={13} />
            Plan completado
          </div>

          <h1 className="mt-2 text-2xl font-semibold text-emerald-800">
            Terminaste tu ruta de bienestar
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
            Completaste este ciclo. Tómate un momento para reconocer lo que
            pudiste hacer y también aquello que fue más difícil.
          </p>
        </div>

        <div className="mt-7 border-y border-neutral-200 py-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="block text-2xl font-semibold text-emerald-700">
                7
              </span>

              <span className="text-xs text-neutral-400">Días</span>
            </div>

            <div>
              <span className="block text-2xl font-semibold text-emerald-700">
                5
              </span>

              <span className="text-xs text-neutral-400">Realizadas</span>
            </div>

            <div>
              <span className="block text-2xl font-semibold text-orange-600">
                2
              </span>

              <span className="text-xs text-neutral-400">Difíciles</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Un pequeño cierre
          </span>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Durante estos días priorizaste espacios de calma, conexión y
            pequeños cambios en tu rutina. No se trata de haber cumplido todo
            perfectamente, sino de reconocer qué acciones te hicieron bien y
            cuáles necesitas adaptar para tu próximo ciclo.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            className="ml-auto flex items-center gap-2 bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <RotateCcw size={17} />
            Crear nuevo plan
          </button>
        </div>
      </div>
    </main>
  );
}
