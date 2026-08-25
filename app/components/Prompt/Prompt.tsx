"use client";

import { DashboardSection } from "@/app/components/Ui/DashboardSection";
import { SectionHeader } from "@/app/components/Ui/SectionHeader";
import { usePrompt } from "@/app/hooks/usePrompt";
import { Eraser, SendHorizonal, Sparkles } from "lucide-react";

export function Prompt() {
  const { handlePrompt, prompt, setPrompt, loading } = usePrompt();
  return (
    <DashboardSection
      id="prompt"
      button={
        <button
          type="button"
          onClick={() => setPrompt("")}
          title="Limpiar"
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-notes/50 transition hover:border-notes/80 hover:text-notes/80"
        >
          <Eraser size={25} />
        </button>
      }
      header={
        <SectionHeader
          title="Mejorador de Prompt"
          description={`Ingresa tu Prompt y deja que la AI lo mejore.`}
          icon={Sparkles}
          color="prompts"
        />
      }
    >
      <div className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-4">
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Escribe tu prompt aquí..."
          className="custom-scroll min-h-152 w-full flex-1 resize-none rounded-lg border border-neutral-700 bg-neutral-900/60 p-3 text-sm leading-6 text-neutral-300 outline-none transition placeholder:text-neutral-600 focus:border-prompts/50 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            disabled={!prompt.trim() || loading}
            onClick={handlePrompt}
            title="Generar Prompt"
            className="ml-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-xs font-medium text-prompts/80 transition hover:border-prompts/80 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:opacity-50"
          >
            <SendHorizonal size={25} />
          </button>
        </div>
      </div>
    </DashboardSection>
  );
}
