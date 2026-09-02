import {
  validateString,
  parseRequestJSON,
  errorResponse,
  successResponse,
} from "@/app/api/utils/validation";

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return errorResponse("GROQ_API_KEY no está configurada", 500);
  }

  // Parsear y validar JSON
  const parseResult = await parseRequestJSON(request);
  if (!parseResult.valid) {
    return errorResponse(parseResult.error!);
  }

  const { prompt } = parseResult.data as { prompt: unknown };

  // Validar que el prompt sea válido
  const promptValidation = validateString(prompt, "prompt", 5, 10000);
  if (!promptValidation.valid) {
    return errorResponse(promptValidation.error!);
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        temperature: 0.5,
        messages: [
          {
            role: "system",
            content: `Actúa como un experto en ingeniería de prompts.

Tu tarea es transformar el prompt del usuario en una versión más completa, clara, específica y efectiva.

Conserva siempre la intención original.
Amplía el prompt cuando sea útil para mejorar significativamente la calidad de la respuesta.
Añade contexto, rol, restricciones, criterios de calidad, pasos o formato de salida cuando aporten valor.
No inventes objetivos ni requisitos que contradigan lo pedido por el usuario.
Evita redundancias, pero no sacrifiques detalle útil por brevedad.

El resultado debe ser suficientemente detallado como para guiar bien a un modelo de IA.

Devuelve SOLO el prompt mejorado, listo para copiar y pegar.
Responde en español.
`.trim(),
          },
          {
            role: "user",
            content: `
Prompt:
${promptValidation.data?.value}
`.trim(),
          },
        ],
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return errorResponse(
      data.error?.message ?? "No se pudo mejorar el prompt",
      response.status,
    );
  }

  const newPrompt = data.choices?.[0]?.message?.content?.trim();

  if (!newPrompt) {
    return errorResponse("Groq devolvió un prompt vacío", 502);
  }

  return successResponse({ newPrompt });
}
