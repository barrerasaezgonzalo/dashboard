"use client";

import { useState } from "react";
import { errorLogger } from "@/app/lib/errorLogger";

export function usePrompt() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePrompt = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        errorLogger.logError("Error al mejorar el prompt", data.error, {
          context: "usePrompt",
          userMessage:
            "Error al mejorar el prompt. Por favor, intenta de nuevo.",
        });
        return;
      }

      setPrompt(data.newPrompt);
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePrompt,
    prompt,
    setPrompt,
    loading,
  };
}
