"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import { errorLogger, ErrorLog } from "@/app/lib/errorLogger";
import { Toast } from "@/app/components/Ui/Toast";

type ErrorNotification = ErrorLog & {
  id: string;
};

type ErrorContextType = {
  errors: ErrorNotification[];
  clearError: (id: string) => void;
  clearAllErrors: () => void;
};

export const ErrorContext = createContext<ErrorContextType | null>(null);

type ErrorProviderProps = {
  children: ReactNode;
};

/**
 * Provider centralizado para manejo de errores
 * Suscribe a los logs del errorLogger y muestra toasts al usuario
 */
export function ErrorProvider({ children }: ErrorProviderProps) {
  const [errors, setErrors] = useState<ErrorNotification[]>([]);

  // Suscribirse a nuevos errores del logger
  useEffect(() => {
    const unsubscribe = errorLogger.subscribe((log) => {
      // Solo mostrar errores y advertencias (no info)
      if (log.level === "info") {
        return;
      }

      // Solo mostrar si hay mensaje para el usuario
      if (!log.userMessage) {
        return;
      }

      const id = `${Date.now()}-${Math.random()}`;
      const notification: ErrorNotification = {
        ...log,
        id,
      };

      setErrors((prev) => [...prev, notification]);

      // Auto-remover después de 5 segundos
      setTimeout(() => {
        setErrors((prev) => prev.filter((err) => err.id !== id));
      }, 5000);
    });

    return () => unsubscribe();
  }, []);

  const clearError = useCallback((id: string) => {
    setErrors((prev) => prev.filter((err) => err.id !== id));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return (
    <ErrorContext.Provider
      value={{
        errors,
        clearError,
        clearAllErrors,
      }}
    >
      {children}

      {/* Mostrar último error */}
      {errors.length > 0 && errors[errors.length - 1]?.userMessage && (
        <Toast
          message={errors[errors.length - 1]?.userMessage || ""}
          variant="error"
        />
      )}
    </ErrorContext.Provider>
  );
}
