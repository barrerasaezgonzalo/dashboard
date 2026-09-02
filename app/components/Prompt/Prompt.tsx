"use client";

import { Eraser, Sparkles } from "lucide-react";

import { DashboardSection } from "@/app/components/Ui/DashboardSection";
import { SectionHeader } from "@/app/components/Ui/SectionHeader";
import { SectionActionButton } from "../Ui/SectionActionButton";
import { usePrompt } from "@/app/hooks/usePrompt";
import { PromptEditor } from "./PromptEditor";

export function Prompt() {
  const { handlePrompt, prompt, setPrompt, loading } = usePrompt();

  return (
    <DashboardSection
      id="prompt"
      button={
        <SectionActionButton
          onClick={() => setPrompt("")}
          icon={Eraser}
          color="yellow"
        />
      }
      header={
        <SectionHeader
          title="Mejorador de Prompt"
          description="Ingresa tu Prompt y deja que la AI lo mejore."
          icon={Sparkles}
          color="yellow"
        />
      }
    >
      <PromptEditor
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        onSubmit={handlePrompt}
      />
    </DashboardSection>
  );
}
