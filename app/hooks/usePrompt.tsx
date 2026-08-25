"use client";

import { useState } from "react";

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
        console.error("Error generating prompt:", data.error);
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
