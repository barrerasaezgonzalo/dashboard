export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY no está configurada" },
      { status: 500 },
    );
  }
  const { prompt } = await request.json();
  if (!prompt?.trim()) {
    return Response.json({ error: "prompt es obligatorio" }, { status: 400 });
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
            content: `Actúa como un experto en optimización de prompts.

Mejora el prompt del usuario haciéndolo más claro, específico y útil, sin volverlo innecesariamente largo.

Conserva la intención original.
No agregues requisitos que el usuario no haya pedido, salvo que sean necesarios para obtener una mejor respuesta.
Prefiere instrucciones concretas y breves.

Devuelve SOLO el prompt mejorado, listo para copiar y pegar. EN ESPAÑOL
`.trim(),
          },
          {
            role: "user",
            content: `
Prompt:
${prompt}
`.trim(),
          },
        ],
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return Response.json(
      {
        error: data.error?.message ?? "No se pudo mejorar el prompt",
      },
      { status: response.status },
    );
  }

  const newPrompt = data.choices?.[0]?.message?.content?.trim();

  if (!newPrompt) {
    return Response.json(
      { error: "Groq devolvió un prompt vacio" },
      { status: 502 },
    );
  }

  return Response.json({ newPrompt });
}
