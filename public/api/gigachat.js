// Vercel serverless function -> /api/gigachat
// Проксирует запросы приложения к GigaChat (Сбер) и возвращает ответ в том же
// формате, что ждёт приложение: { content: [{ type:"text", text:"..." }] }.
//
// Чтобы включить ИИ:
//   Vercel → Project → Settings → Environment Variables, добавь:
//     GIGACHAT_AUTH_KEY = ключ авторизации GigaChat (Authorization key, Base64)
//     (необязательно) GIGACHAT_SCOPE = GIGACHAT_API_PERS | GIGACHAT_API_B2B | GIGACHAT_API_CORP   (по умолчанию PERS)
//     (необязательно) GIGACHAT_MODEL = GigaChat | GigaChat-Pro | GigaChat-Max                     (по умолчанию GigaChat)
//   затем Redeploy.
// Без ключа функция отвечает { content: [] } — приложение берёт запасные ответы.

import crypto from "node:crypto";

let _tok = null; // кэш access_token между «тёплыми» вызовами: { token, exp }

async function getToken(authKey, scope) {
  if (_tok && _tok.exp > Date.now() + 60000) return _tok.token;
  const r = await fetch("https://ngw.devices.sberbank.ru:9443/api/v2/oauth", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + authKey,
      "RqUID": crypto.randomUUID(),
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body: "scope=" + encodeURIComponent(scope),
  });
  const d = await r.json();
  if (!d || !d.access_token) throw new Error("gigachat: no access_token");
  _tok = { token: d.access_token, exp: Date.now() + 25 * 60 * 1000 };
  return _tok.token;
}

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }
  const authKey = process.env.GIGACHAT_AUTH_KEY || "MDE5ZWZlOTMtMzViZC03NzYyLTgxNGEtOWNjMDM0OGJjZWI3OjY0MTExZGFjLWNiMTUtNGYxMC1hY2UyLTVmMjRlNjQ4MWE3MA==";
  if (!authKey) { res.status(200).json({ content: [] }); return; } // нет ключа -> запасной ответ
  // GigaChat использует сертификат НУЦ Минцифры РФ. На сервере (только для этих вызовов)
  // снимаем строгую проверку TLS, иначе fetch упадёт с ошибкой сертификата.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const scope = process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS";
  const model = process.env.GIGACHAT_MODEL || "GigaChat";
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    // Anthropic-стиль { system, messages:[{role,content}] } -> GigaChat messages
    const msgs = [];
    if (body.system) msgs.push({ role: "system", content: String(body.system) });
    for (const m of (body.messages || [])) {
      const content = typeof m.content === "string"
        ? m.content
        : (Array.isArray(m.content) ? m.content.map(c => (c && c.text) || "").join("") : "");
      msgs.push({ role: m.role === "assistant" ? "assistant" : "user", content });
    }
    const token = await getToken(authKey, scope);
    const r = await fetch("https://gigachat.devices.sberbank.ru/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: msgs,
        temperature: typeof body.temperature === "number" ? body.temperature : 0.6,
        max_tokens: Math.min(body.max_tokens || 1024, 8192),
      }),
    });
    const d = await r.json();
    const text = d && d.choices && d.choices[0] && d.choices[0].message
      ? (d.choices[0].message.content || "")
      : "";
    res.status(200).json({ content: text ? [{ type: "text", text }] : [] });
  } catch (e) {
    res.status(200).json({ content: [] }); // мягкий откат -> приложение покажет запасной ответ
  }
}
