export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY no está configurada" },
      { status: 500 },
    );
  }
  const { question, answer } = await request.json();
  if (!answer?.trim()) {
    return Response.json(
      { error: "La respuesta es obligatoria" },
      { status: 400 },
    );
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
            content: `
Pregunta anterior:
${question}
Respuesta del usuario:
${answer}
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
        error:
          data.error?.message ?? "No se pudo generar la siguiente pregunta",
      },
      { status: response.status },
    );
  }

  const nextQuestion = data.choices?.[0]?.message?.content?.trim();

  if (!nextQuestion) {
    return Response.json(
      { error: "Groq devolvió una pregunta vacía" },
      { status: 502 },
    );
  }

  return Response.json({ question: nextQuestion });
}
