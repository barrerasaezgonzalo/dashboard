"use client";

import { useContext } from "react";
import { WellnessContext } from "@/app/providers/WellnessProvider";

export function useWellness() {
  const context = useContext(WellnessContext);

  if (!context) {
    throw new Error("useWellness debe usarse dentro de WellnessProvider");
  }

  return context;
}
