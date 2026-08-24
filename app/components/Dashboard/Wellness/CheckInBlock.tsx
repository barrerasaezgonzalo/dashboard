"use client";

import { ListOrdered, SendHorizonal, Sparkles } from "lucide-react";

type CheckInBlockProps = {
  question: string;
  answer: string;
  setAnswer: (value: string) => void;
};

export function CheckInBlock({
  question,
  answer,
  setAnswer,
}: CheckInBlockProps) {
  return (
    <section className="flex h-full w-full min-w-0 flex-col rounded-xl border border-neutral-700 bg-neutral-800 p-5">
      <div className="flex items-start justify-between gap-3 border-b border-neutral-700 pb-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <ListOrdered size={20} className="text-green-500" />
            ¿Como te sientes hoy?
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Contesta con honestidad para personalizar tu bienestar
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-4">
        <div>
          <p className="mt-1 text-sm text-neutral-400">{question}</p>
        </div>

        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          className="custom-scroll min-h-52 w-full flex-1 resize-none rounded-lg border border-neutral-700 bg-neutral-900/60 p-3 text-sm leading-6 text-neutral-300 outline-none transition placeholder:text-neutral-600 focus:border-green-500/60"
        />

        <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {}}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-2 py-3 text-xs font-medium text-neutral-400 transition hover:border-neutral-500 hover:text-white sm:w-auto"
          >
            <Sparkles size={15} className="text-green-500" />
            Omitir y generar plan
          </button>

          <button
            type="button"
            onClick={() => {}}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-500/10 px-2 py-3 text-xs font-medium text-green-400 transition hover:bg-green-500/20 sm:w-auto"
          >
            <SendHorizonal size={15} />
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
}
