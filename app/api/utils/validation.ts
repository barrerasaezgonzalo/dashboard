/**
 * Validaciones compartidas para APIs
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
  data?: Record<string, unknown>;
}

/**
 * Valida que una cadena sea válida (no esté vacía, sea string)
 */
export function validateString(
  value: unknown,
  fieldName: string,
  minLength = 1,
  maxLength = 10000,
): ValidationResult {
  if (typeof value !== "string") {
    return {
      valid: false,
      error: `${fieldName} debe ser texto`,
    };
  }

  const trimmed = value.trim();

  if (trimmed.length < minLength) {
    return {
      valid: false,
      error: `${fieldName} no puede estar vacío`,
    };
  }

  if (trimmed.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} no puede exceder ${maxLength} caracteres`,
    };
  }

  return { valid: true, data: { value: trimmed } };
}

/**
 * Valida un array de mensajes de check-in
 */
export function validateCheckInMessages(
  value: unknown,
  minMessages = 1,
  maxMessages = 10,
): ValidationResult {
  if (!Array.isArray(value)) {
    return {
      valid: false,
      error: "Los mensajes deben ser un array",
    };
  }

  if (value.length < minMessages) {
    return {
      valid: false,
      error: `Se requieren al menos ${minMessages} mensaje(s) de check-in`,
    };
  }

  if (value.length > maxMessages) {
    return {
      valid: false,
      error: `No se pueden procesar más de ${maxMessages} mensajes`,
    };
  }

  // Validar estructura de cada mensaje
  for (let i = 0; i < value.length; i++) {
    const msg = value[i];

    if (typeof msg.question !== "string" || !msg.question?.trim()) {
      return {
        valid: false,
        error: `Mensaje ${i + 1}: pregunta vacía`,
      };
    }

    if (typeof msg.answer !== "string" || !msg.answer?.trim()) {
      return {
        valid: false,
        error: `Mensaje ${i + 1}: respuesta vacía`,
      };
    }

    if (msg.question.length > 500) {
      return {
        valid: false,
        error: `Mensaje ${i + 1}: pregunta muy larga (máx 500 caracteres)`,
      };
    }

    if (msg.answer.length > 5000) {
      return {
        valid: false,
        error: `Mensaje ${i + 1}: respuesta muy larga (máx 5000 caracteres)`,
      };
    }
  }

  return { valid: true };
}

/**
 * Valida un número dentro de un rango
 */
export function validateNumber(
  value: unknown,
  fieldName: string,
  min = 0,
  max = 100,
): ValidationResult {
  if (typeof value !== "number") {
    return {
      valid: false,
      error: `${fieldName} debe ser un número`,
    };
  }

  if (value < min || value > max) {
    return {
      valid: false,
      error: `${fieldName} debe estar entre ${min} y ${max}`,
    };
  }

  return { valid: true, data: { value } };
}

/**
 * Valida que el request tenga un Content-Type válido
 */
export function validateContentType(request: Request): ValidationResult {
  const contentType = request.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    return {
      valid: false,
      error: "El Content-Type debe ser application/json",
    };
  }

  return { valid: true };
}

/**
 * Valida y parsea JSON del request
 */
export async function parseRequestJSON(
  request: Request,
): Promise<ValidationResult> {
  try {
    const data = await request.json();
    return { valid: true, data };
  } catch {
    return {
      valid: false,
      error: "El JSON del request es inválido",
    };
  }
}

/**
 * Crea una respuesta de error standardizada
 */
export function errorResponse(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

/**
 * Crea una respuesta de éxito
 */
export function successResponse(data: Record<string, unknown>, status = 200) {
  return Response.json(data, { status });
}
