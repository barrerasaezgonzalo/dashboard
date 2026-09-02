import {
  validateString,
  parseRequestJSON,
  errorResponse,
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

  const { title, content } = parseResult.data as {
    title: unknown;
    content: unknown;
  };

  // Validar título
  const titleValidation = validateString(title, "Título de la sesión", 3, 200);
  if (!titleValidation.valid) {
    return errorResponse(titleValidation.error!);
  }

  // Validar contenido (más largo para tener material suficiente)
  const contentValidation = validateString(
    content,
    "Contenido de la sesión",
    50,
    50000,
  );
  if (!contentValidation.valid) {
    return errorResponse(contentValidation.error!);
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
        temperature: 0.9,
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: `
Eres un experto en educación y evaluación.

Tu trabajo es generar un quiz basado únicamente en el contenido de la sesión entregada.

Genera exactamente 5 preguntas.

Cada pregunta debe:
- evaluar comprensión real del contenido
- tener exactamente 4 alternativas
- tener una sola respuesta correcta
- evitar preguntas demasiado obvias
- evitar repetir preguntas dentro del mismo quiz
- variar el orden de la respuesta correcta
- no incluir explicaciones adicionales

Devuelve únicamente JSON válido con esta estructura:

{
  "questions": [
    {
      "id": 1,
      "question": "Pregunta",
      "options": [
        "Opción 1",
        "Opción 2",
        "Opción 3",
        "Opción 4"
      ],
      "correctIndex": 0
    }
  ]
}

"correctIndex" debe ser un número entre 0 y 3 correspondiente al índice de la respuesta correcta.

No uses Markdown fuera de los textos de las preguntas u opciones.
No agregues texto antes ni después del JSON.
`.trim(),
          },
          {
            role: "user",
            content: `
Título de la sesión:
${titleValidation.data?.value}

Contenido estudiado:
${contentValidation.data?.value}

Genera un quiz de 5 preguntas basado exclusivamente en este material.
`.trim(),
          },
        ],
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return errorResponse(
      data.error?.message ?? "No se pudo generar el quiz",
      response.status,
    );
  }

  const contentResponse = data.choices?.[0]?.message?.content;

  if (!contentResponse) {
    return errorResponse("Groq devolvió una respuesta vacía", 502);
  }

  try {
    const quiz = JSON.parse(contentResponse);

    if (!Array.isArray(quiz.questions) || quiz.questions.length !== 5) {
      return errorResponse("Groq devolvió un quiz inválido", 502);
    }

    return Response.json(quiz);
  } catch {
    return errorResponse("Groq devolvió un formato inválido", 502);
  }
}
