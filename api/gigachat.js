// Vercel serverless function -> /api/gigachat
// Проксирует запросы приложения к Anthropic API (модель claude-*).
// НЕОБЯЗАТЕЛЬНО: без него приложение работает, но «умные» функции
// (придумать рецепт, маршрут, стилист, консьерж) используют запасные ответы.
//
// Чтобы включить ИИ:
//   1) Vercel → Project → Settings → Environment Variables
//   2) Добавь ANTHROPIC_API_KEY = твой ключ от Anthropic
//   3) Redeploy
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(200).json({ content: [] }); // нет ключа -> приложение возьмёт запасной ответ
    return;
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: body.model || "claude-sonnet-4-5",
        max_tokens: body.max_tokens || 1000,
        system: body.system,
        messages: body.messages || [],
      }),
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(200).json({ content: [] });
  }
}
