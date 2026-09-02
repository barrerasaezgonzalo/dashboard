/**
 * Sistema centralizado de logging y manejo de errores
 */

export type ErrorLevel = "error" | "warning" | "info";

export interface ErrorLog {
  level: ErrorLevel;
  message: string;
  context?: string;
  timestamp: Date;
  error?: unknown;
  userMessage?: string; // Mensaje seguro para mostrar al usuario
}

/**
 * Logger centralizado para errores y eventos
 */
class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // Mantener últimos 100 logs
  private listeners: Set<(log: ErrorLog) => void> = new Set();

  /**
   * Registra un error
   */
  logError(
    message: string,
    error?: unknown,
    options?: {
      context?: string;
      userMessage?: string;
    },
  ) {
    const log: ErrorLog = {
      level: "error",
      message,
      context: options?.context,
      timestamp: new Date(),
      error,
      userMessage:
        options?.userMessage ||
        "Ocurrió un error. Por favor, intenta de nuevo.",
    };

    this._addLog(log);
    this._notifyListeners(log);

    // Ambiente de desarrollo: mostrar en consola
    if (process.env.NODE_ENV === "development") {
      console.error(`[${log.context || "APP"}] ${message}`, error);
    }
  }

  /**
   * Registra una advertencia
   */
  logWarning(
    message: string,
    options?: {
      context?: string;
      userMessage?: string;
    },
  ) {
    const log: ErrorLog = {
      level: "warning",
      message,
      context: options?.context,
      timestamp: new Date(),
      userMessage: options?.userMessage,
    };

    this._addLog(log);
    this._notifyListeners(log);

    if (process.env.NODE_ENV === "development") {
      console.warn(`[${log.context || "APP"}] ${message}`);
    }
  }

  /**
   * Registra información
   */
  logInfo(
    message: string,
    options?: {
      context?: string;
    },
  ) {
    const log: ErrorLog = {
      level: "info",
      message,
      context: options?.context,
      timestamp: new Date(),
    };

    this._addLog(log);

    if (process.env.NODE_ENV === "development") {
      console.log(`[${log.context || "APP"}] ${message}`);
    }
  }

  /**
   * Obtiene todos los logs
   */
  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  /**
   * Obtiene logs de los últimos N minutos
   */
  getRecentLogs(minutes = 5): ErrorLog[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return this.logs.filter((log) => log.timestamp > cutoff);
  }

  /**
   * Limpia los logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Suscribirse a nuevos logs
   */
  subscribe(listener: (log: ErrorLog) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Extrae un mensaje amigable de un error desconocido
   */
  static getUserFriendlyMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message || "Ocurrió un error desconocido";
    }

    if (typeof error === "string") {
      return error;
    }

    return "Ocurrió un error desconocido";
  }

  private _addLog(log: ErrorLog) {
    this.logs.push(log);

    // Mantener límite de logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  private _notifyListeners(log: ErrorLog) {
    this.listeners.forEach((listener) => {
      try {
        listener(log);
      } catch (err) {
        // Evitar que errores en listeners rompan el sistema
        if (process.env.NODE_ENV === "development") {
          console.error("Error en listener de ErrorLogger:", err);
        }
      }
    });
  }
}

// Instancia única del logger
export const errorLogger = new ErrorLogger();

/**
 * Hook para usar el error logger en componentes
 */
export function useErrorLogger() {
  return {
    logError: (
      message: string,
      error?: unknown,
      options?: {
        context?: string;
        userMessage?: string;
      },
    ) => errorLogger.logError(message, error, options),

    logWarning: (
      message: string,
      options?: {
        context?: string;
        userMessage?: string;
      },
    ) => errorLogger.logWarning(message, options),

    logInfo: (
      message: string,
      options?: {
        context?: string;
      },
    ) => errorLogger.logInfo(message, options),
  };
}
