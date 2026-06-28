// ─────────────────────────────────────────────────────────────
//  Slow Glow · серверная функция для ИИ  (GigaChat / Сбер)
//  Путь в проекте:  api/gigachat.js
//
//  В Vercel → проект → Settings → Environment Variables добавь:
//    GIGACHAT_AUTH_KEY = <твой Authorization key с developers.sber.ru>   (обязательно)
//    GIGACHAT_SCOPE    = GIGACHAT_API_PERS   (необязательно, это значение по умолчанию)
//    GIGACHAT_MODEL    = GigaChat            (необязательно)
//
//  Authorization key — длинная строка (обычно заканчивается на ==).
//  После добавления файла и ключа — Redeploy.
//  Заработают: чат-консьерж, языки, путешествия, поиск мест, стилист,
//  «придумать рецепт из холодильника». (Распознавание фото в «моменте»
//  у GigaChat ограничено — текстовые функции работают полноценно.)
// ─────────────────────────────────────────────────────────────

// Сертификаты Сбера не входят в стандартный набор Node — для обращения
// к API GigaChat отключаем строгую проверку TLS только в этой функции.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Кэш токена между «тёплыми» вызовами функции
let _tok = null; // { value, exp }

function uuid() {
  try { return globalThis.crypto.randomUUID(); }
  catch (e) {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}

async function getAccessToken() {
  const now = Date.now();
  if (_tok && _tok.exp - 60000 > now) return _tok.value;

  const authKey = process.env.GIGACHAT_AUTH_KEY;
  const scope = process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS";
  if (!authKey) throw new Error("GIGACHAT_AUTH_KEY не задан в Environment Variables на Vercel");

  const r = await fetch("https://ngw.devices.sberbank.ru:9443/api/v2/oauth", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + authKey,
      "RqUID": uuid(),
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body: "scope=" + encodeURIComponent(scope)
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.access_token) {
    throw new Error("OAuth GigaChat (" + r.status + "): " + JSON.stringify(data));
  }
  // expires_at приходит как метка времени в миллисекундах
  _tok = { value: data.access_token, exp: data.expires_at || now + 25 * 60 * 1000 };
  return _tok.value;
}

// Приложение шлёт запрос в формате Anthropic: { system, messages:[{role, content}] },
// где content — строка или массив блоков (текст/картинка). GigaChat ждёт строки.
function toGigaMessages(system, messages) {
  const out = [];
  if (system) out.push({ role: "system", content: String(system) });
  for (const m of (messages || [])) {
    let content = m.content;
    if (Array.isArray(content)) {
      content = content
        .map(b => (typeof b === "string" ? b : (b && b.type === "text" ? b.text : "")))
        .filter(Boolean)
        .join("\n");
      if (!content) content = "Опиши, пожалуйста, по сути запроса.";
    }
    out.push({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(content || "")
    });
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const { max_tokens, system, messages } = body;

    const token = await getAccessToken();

    const r = await fetch("https://gigachat.devices.sberbank.ru/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: process.env.GIGACHAT_MODEL || "GigaChat",
        messages: toGigaMessages(system, messages),
        max_tokens: max_tokens || 1200,
        temperature: 0.7
      })
    });

    const data = await r.json().catch(() => ({}));
    const text =
      data && data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : "";

    if (!text) {
      return res.status(r.status || 500).json({ error: "GigaChat (" + r.status + "): " + JSON.stringify(data) });
    }

    // Ответ в формате, который понимает приложение (как у Anthropic)
    return res.status(200).json({ content: [{ type: "text", text }] });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
