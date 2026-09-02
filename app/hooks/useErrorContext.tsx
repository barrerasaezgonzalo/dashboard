"use client";

import { useContext } from "react";
import { ErrorContext } from "@/app/providers/ErrorProvider";

export function useErrorContext() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useErrorContext debe usarse dentro de ErrorProvider");
  }

  return context;
}
