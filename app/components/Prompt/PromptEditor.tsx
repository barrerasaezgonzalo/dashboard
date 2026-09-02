"use client";

import { PromptEditorProps } from "@/app/types/prompt";
import { Copy, SendHorizonal } from "lucide-react";

export function PromptEditor({
  prompt,
  setPrompt,
  loading,
  onSubmit,
}: PromptEditorProps) {
  const handleCopy = async () => {
    if (!prompt.trim()) return;

    await navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-4">
      <div className="relative flex flex-1">
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Escribe tu prompt aquí..."
          className="custom-scroll min-h-60 w-full flex-1 resize-none rounded-lg border border-neutral-700 bg-neutral-900/60 p-3 pr-12 text-base leading-6 text-neutral-300 outline-none transition placeholder:text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {prompt.trim() && (
          <button
            type="button"
            onClick={handleCopy}
            title="Copiar prompt"
            aria-label="Copiar prompt"
            className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-700 bg-neutral-900/80 text-neutral-500 transition hover:border-yellow-500/60 hover:text-yellow-500"
          >
            <Copy size={17} />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
        <button
          type="button"
          disabled={!prompt.trim() || loading}
          onClick={onSubmit}
          title="Generar Prompt"
          className="ml-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 text-xs font-medium text-yellow-500 transition hover:border-yellow-500/80 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:opacity-50"
        >
          <SendHorizonal size={25} />
        </button>
      </div>
    </div>
  );
}
