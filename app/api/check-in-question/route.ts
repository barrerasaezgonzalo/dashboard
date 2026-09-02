import { CheckInMessage } from "@/app/types";
import {
  validateCheckInMessages,
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

  const { messages } = parseResult.data as { messages: unknown };

  // Validar que los mensajes sean válidos
  const messagesValidation = validateCheckInMessages(messages);
  if (!messagesValidation.valid) {
    return errorResponse(messagesValidation.error!);
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
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content: `
Eres un acompañante de bienestar personal.

No eres médico ni terapeuta.
No debes diagnosticar enfermedades ni indicar tratamientos.

Tu trabajo es hacer una única pregunta breve y humana
basada directamente en la respuesta del usuario.

La nueva pregunta debe:
- relacionarse con lo que el usuario acaba de contar
- ayudar a comprender mejor su situación
- evitar repetir la pregunta anterior
- ser concreta
- ser fácil de responder
- no dar consejos todavía

Devuelve únicamente la pregunta.
No incluyas explicaciones, listas ni texto adicional.
`.trim(),
          },
          {
            role: "user",
            content: `Historial del check-in:

${(messages as CheckInMessage[])
  .map(
    (message: CheckInMessage, index: number) => `
${index + 1}. Pregunta: ${message.question}
Respuesta: ${message.answer}
`,
  )
  .join("\n")}

Genera la siguiente pregunta basándote en TODO el historial.
No repitas preguntas ni temas ya tratados.
`.trim(),
          },
        ],
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return errorResponse(
      data.error?.message ?? "No se pudo generar la siguiente pregunta",
      response.status,
    );
  }

  const nextQuestion = data.choices?.[0]?.message?.content?.trim();

  if (!nextQuestion) {
    return errorResponse("Groq devolvió una pregunta vacía", 502);
  }

  return successResponse({ question: nextQuestion });
}
