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

  const { title, topic, level, sessions } = parseResult.data as {
    title: unknown;
    topic: unknown;
    level: unknown;
    sessions: unknown;
  };

  // Validar título
  const titleValidation = validateString(title, "Título del curso", 3, 200);
  if (!titleValidation.valid) {
    return errorResponse(titleValidation.error!);
  }

  // Validar tema
  const topicValidation = validateString(topic, "Tema del curso", 3, 500);
  if (!topicValidation.valid) {
    return errorResponse(topicValidation.error!);
  }

  // Validar nivel
  const validLevels = ["basic", "intermediate", "advanced"];
  if (typeof level !== "string" || !validLevels.includes(level)) {
    return errorResponse(
      "El nivel debe ser basic, intermediate o advanced",
      400,
    );
  }

  // Validar que haya sesiones
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return errorResponse("Se requiere al menos una sesión completada", 400);
  }

  if (sessions.length > 12) {
    return errorResponse("No se pueden procesar más de 12 sesiones", 400);
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
        temperature: 0.7,
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: `
Eres un experto en educación y diseño de rutas de aprendizaje.

El usuario acaba de completar un curso.

Tu tarea es:

1. Generar un resumen final de lo aprendido.
2. Recomendar otros cursos relacionados que pueda estudiar a continuación.

El resumen debe:
- sintetizar los conocimientos principales adquiridos
- mencionar conceptos, herramientas y habilidades aprendidas
- reflejar la progresión completa del curso
- tener entre 200 y 300 palabras
- no incluir saludos ni felicitaciones genéricas
- estar escrito en Markdown válido

Los cursos relacionados deben:
- ser coherentes con lo que el usuario acaba de aprender
- permitir profundizar o avanzar hacia temas relacionados
- evitar repetir exactamente el curso recién completado
- incluir entre 3 y 5 opciones
- tener título y descripción breve

Devuelve únicamente JSON válido:

{
  "summary": "Resumen final en Markdown",
  "relatedCourses": [
    {
      "title": "Título del curso sugerido",
      "description": "Descripción breve"
    }
  ]
}
`.trim(),
          },
          {
            role: "user",
            content: `
Curso completado: ${titleValidation.data?.value}
Tema: ${topicValidation.data?.value}
Nivel: ${level}

Sesiones completadas:

${(
  sessions as Array<{
    position: number;
    title: string;
    summary: string;
  }>
)
  .map(
    (session) => `
Sesión ${session.position}: ${session.title}

${session.summary}
`,
  )
  .join("\n")}

Genera el resumen final y los cursos relacionados.
`.trim(),
          },
        ],
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return errorResponse(
      data.error?.message ?? "No se pudo completar el curso",
      response.status,
    );
  }

  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    return errorResponse("Groq devolvió una respuesta vacía", 502);
  }

  try {
    return Response.json(JSON.parse(content));
  } catch {
    return errorResponse("Groq devolvió un formato inválido", 502);
  }
}
