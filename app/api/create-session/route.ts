import {
  validateString,
  validateNumber,
  parseRequestJSON,
  errorResponse,
} from "@/app/api/utils/validation";

interface PreviousSession {
  position: number;
  title: string;
  summary: string;
}

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

  const {
    topic,
    level,
    totalSessions,
    position,
    courseTitle,
    previousSessions = [],
  } = parseResult.data as {
    topic: unknown;
    level: unknown;
    totalSessions: unknown;
    position: unknown;
    courseTitle: unknown;
    previousSessions: unknown;
  };

  // Validar tema
  const topicValidation = validateString(topic, "El tema", 3, 500);
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

  // Validar cantidad de sesiones
  const totalSessionsValidation = validateNumber(
    totalSessions,
    "Total de sesiones",
    1,
    12,
  );
  if (!totalSessionsValidation.valid) {
    return errorResponse(totalSessionsValidation.error!);
  }

  // Validar posición
  const positionValidation = validateNumber(
    position,
    "Posición de sesión",
    1,
    totalSessions as number,
  );
  if (!positionValidation.valid) {
    return errorResponse(positionValidation.error!);
  }

  const isFirstSession = (position as number) === 1;

  // Validar sesiones anteriores
  const validPreviousSessions: PreviousSession[] = Array.isArray(
    previousSessions,
  )
    ? (previousSessions as PreviousSession[])
    : [];

  const previousContext =
    validPreviousSessions.length > 0
      ? validPreviousSessions
          .map(
            (session: PreviousSession) => `
Sesión ${session.position}
Título: ${session.title}
Resumen: ${session.summary}
`,
          )
          .join("\n")
      : "No existen sesiones anteriores.";

  const messages = [
    {
      role: "system",
      content: `
Eres un experto en educación y diseño de cursos personalizados.

Tu trabajo es generar una única sesión de un curso.

La sesión debe:
- adaptarse al nivel solicitado
- corresponder exactamente a la posición indicada
- mantener una progresión lógica
- evitar repetir contenido de sesiones anteriores
- explicar los conceptos con claridad
- tener entre 500 y 700 palabras aproximadamente
- preparar al estudiante para continuar avanzando

Si es la primera sesión:
- introduce correctamente el tema
- establece una base adecuada para las siguientes sesiones

Si no es la primera sesión:
- continúa naturalmente desde lo aprendido anteriormente
- aumenta la profundidad de forma progresiva
- no vuelvas a explicar contenido ya cubierto salvo que sea necesario como contexto

El contenido debe estar escrito en Markdown válido.

Usa cuando corresponda:
- encabezados con ## y ###
- listas con -
- listas numeradas
- texto en negrita con **
- bloques de código con triple backtick indicando el lenguaje

No uses HTML.

Cuando el tema sea programación o tecnología:
- utiliza herramientas y prácticas actuales
- evita tecnologías obsoletas o desaconsejadas
- incluye ejemplos de código cuando ayuden a comprender
- explica el código de forma breve y clara

El campo "content" debe contener únicamente el material de estudio de la sesión.

El campo "description":
- debe tener entre 90 y 110 palabras
- debe explicar claramente qué se aprenderá en esta sesión
- debe mencionar los conceptos principales
- no debe incluir saludos ni introducciones innecesarias
- debe corresponder específicamente a la sesión actual

El campo "summary":
- debe tener entre 80 y 150 palabras
- debe resumir únicamente los conceptos realmente enseñados
- debe mencionar conceptos, herramientas y habilidades cubiertas
- debe servir como contexto para generar sesiones posteriores
- no debe incluir saludos ni texto innecesario

Devuelve únicamente JSON válido con esta estructura:

{
  "title": "Título general del curso",
  "session": {
    "title": "Título de la sesión",
    "description": "Descripción de la sesión",
    "content": "Contenido completo en Markdown",
    "summary": "Resumen de los conceptos enseñados"
  }
}

El campo "title" representa el título general del curso.

Si ya se proporcionó un título de curso, debes conservar exactamente ese título.

IMPORTANTE:
- Devuelve únicamente JSON válido.
- No agregues texto antes ni después del JSON.
- Escapa correctamente todas las comillas dentro de strings.
- Escapa correctamente los saltos de línea dentro de strings.
- No uses bloques Markdown alrededor del JSON.
- Verifica que el JSON pueda ser procesado directamente con JSON.parse().
`.trim(),
    },
    {
      role: "user",
      content: `
Tema: ${topicValidation.data?.value}
Nivel: ${level}
Cantidad total de sesiones: ${totalSessions}
Sesión a generar: ${position} de ${totalSessions}

${courseTitle ? `Título actual del curso: ${courseTitle}` : ""}

Sesiones anteriores:

${previousContext}

Genera únicamente la sesión ${position} de ${totalSessions}.

${
  isFirstSession
    ? "Esta es la primera sesión. Genera también un título general apropiado para el curso."
    : "Continúa el curso usando las sesiones anteriores como contexto. No repitas contenido ya enseñado."
}
`.trim(),
    },
  ];

  const generate = async () => {
    return fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        temperature: 0.4,
        response_format: {
          type: "json_object",
        },
        messages,
      }),
    });
  };

  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await generate();
    const data = await response.json();

    if (!response.ok) {
      const message = data.error?.message ?? "No se pudo generar la sesión";

      const jsonGenerationError =
        message.includes("Failed to generate JSON") ||
        data.error?.code === "failed_generation" ||
        data.error?.code === "json_validate_failed";

      if (jsonGenerationError && attempt < maxAttempts) {
        continue;
      }

      return errorResponse(message, response.status);
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      if (attempt < maxAttempts) {
        continue;
      }

      return errorResponse("Groq devolvió una respuesta vacía", 502);
    }

    try {
      const session = JSON.parse(content);

      return Response.json(session);
    } catch {
      if (attempt < maxAttempts) {
        continue;
      }

      return errorResponse("Groq devolvió un formato inválido", 502);
    }
  }

  return errorResponse("No se pudo generar la sesión", 502);
}
