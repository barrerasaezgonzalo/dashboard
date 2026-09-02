import {
  GeneratedWellnessPlan,
  GroqPlanResponse,
  WellnessPlanRequest,
} from "@/app/types";
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

  const { messages } = parseResult.data as WellnessPlanRequest;

  // Validar que los mensajes sean válidos (mínimo 3 para generar un plan)
  const messagesValidation = validateCheckInMessages(messages, 3, 10);
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
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `
Eres un acompañante de bienestar personal.

No eres médico ni terapeuta.
No debes diagnosticar enfermedades ni indicar tratamientos.

Analiza toda la conversación del check-in y crea un único plan práctico, activo y realista.

Devuelve únicamente un objeto JSON válido.
No incluyas markdown, explicaciones ni texto fuera del JSON.

Devuelve exactamente esta estructura:

{
  "title": "Título breve del plan",
  "summary": "Resumen humano y breve de lo que parece necesitar el usuario",
  "tasks": [
    {
      "title": "Acción concreta",
      "description": "Explicación breve y amable",
      "day": 1,
      "status": "pending"
    }
  ]
}

Genera exactamente 7 tareas.

Cada tarea debe tener un día distinto:

1 = Día 1
2 = Día 2
3 = Día 3
4 = Día 4
5 = Día 5
6 = Día 6
7 = Día 7

El campo "status" de TODAS las tareas debe ser exactamente "pending".

Las tareas deben ayudar al usuario a avanzar en problemas concretos, tomar decisiones, resolver pendientes, mejorar relaciones, organizar su entorno o recuperar autonomía.

Evita tareas genéricas o demasiado básicas como:
- tomar agua
- caminar unos minutos
- respirar profundamente
- dormir temprano
- escuchar música
- escribir cosas positivas

Solo propón ese tipo de tareas si la conversación muestra que representan una dificultad real para el usuario.

Prioriza tareas como:
- terminar una tarea pendiente concreta
- ordenar o eliminar algo que genera carga
- poner un límite a una persona
- tener una conversación pendiente
- planificar una decisión importante
- retomar una actividad abandonada
- resolver un trámite
- salir de casa con un propósito específico
- organizar una parte concreta de la semana
- dar un paso medible hacia un objetivo personal

Cada tarea debe:
- tener un resultado observable
- indicar exactamente qué debe hacer
- ser suficientemente desafiante para producir avance
- seguir siendo realista según lo que contó el usuario
- relacionarse directamente con algo del check-in
- evitar repetir acciones innecesariamente

El título y el resumen deben reflejar el contexto general de todas las respuestas.
`.trim(),
          },
          { role: "user", content: JSON.stringify(messages) },
        ],
      }),
    },
  );
  const responseParsed = (await response.json()) as GroqPlanResponse;

  if (!response.ok) {
    return errorResponse(
      responseParsed.error?.message ?? "No se pudo generar el plan",
      response.status,
    );
  }

  const content = responseParsed.choices?.[0]?.message?.content?.trim();

  if (!content) {
    return errorResponse("Groq devolvió una respuesta vacía", 502);
  }

  try {
    const plan = JSON.parse(content) as GeneratedWellnessPlan;
    return successResponse({ plan });
  } catch {
    return errorResponse("Groq devolvió un plan con formato inválido", 502);
  }
}
