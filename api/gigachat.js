// Vercel serverless function -> /api/gigachat
// Прокси приложения к GigaChat (Сбер). Возвращает ответ в формате, который ждёт
// приложение: { content: [{ type:"text", text:"..." }] }.
//
// Поддерживает ФОТО: если сообщение содержит изображения (анализатор пинов,
// «сохранения», стилист), они загружаются в хранилище GigaChat и цепляются через
// attachments к запросу — тогда модель их реально «видит». Для запросов с фото
// используется vision-модель (по умолчанию GigaChat-Max), с откатом в текст.
//
// Переменные окружения (необязательны — ключ уже вписан по умолчанию):
//   GIGACHAT_AUTH_KEY     — Authorization key (Base64) из личного кабинета
//   GIGACHAT_SCOPE        — GIGACHAT_API_PERS | _B2B | _CORP (по умолчанию PERS)
//   GIGACHAT_MODEL        — текстовая модель (по умолчанию GigaChat)
//   GIGACHAT_VISION_MODEL — модель для фото (по умолчанию GigaChat-Max)
// Без ключа отвечает { content: [] } — приложение берёт запасные ответы.

import crypto from "node:crypto";

export const config = { maxDuration: 60 };

const AUTH_KEY = process.env.GIGACHAT_AUTH_KEY || "MDE5ZWZlOTMtMzViZC03NzYyLTgxNGEtOWNjMDM0OGJjZWI3OjY0MTExZGFjLWNiMTUtNGYxMC1hY2UyLTVmMjRlNjQ4MWE3MA==";
const SCOPE = process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS";
const MODEL_TEXT = process.env.GIGACHAT_MODEL || "GigaChat";
const MODEL_VISION = process.env.GIGACHAT_VISION_MODEL || "GigaChat-Max";
const OAUTH = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const API = "https://gigachat.devices.sberbank.ru/api/v1";
const EXT = { "image/png":"png","image/webp":"webp","image/gif":"gif","image/jpeg":"jpg","image/jpg":"jpg" };

let _tok = null; // { token, exp }

async function getToken() {
  if (_tok && _tok.exp > Date.now() + 60000) return _tok.token;
  const r = await fetch(OAUTH, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + AUTH_KEY,
      "RqUID": crypto.randomUUID(),
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body: "scope=" + encodeURIComponent(SCOPE),
  });
  const d = await r.json();
  if (!d || !d.access_token) throw new Error("gigachat: no access_token");
  _tok = { token: d.access_token, exp: Date.now() + 25 * 60 * 1000 };
  return _tok.token;
}

async function uploadImage(token, mime, b64) {
  const bin = Buffer.from(b64, "base64");
  if (bin.length > 14 * 1024 * 1024) throw new Error("image too large"); // лимит GigaChat 15 МБ
  const fd = new FormData();
  fd.append("file", new Blob([bin], { type: mime }), "image." + (EXT[mime] || "jpg"));
  fd.append("purpose", "general");
  const r = await fetch(API + "/files", {
    method: "POST",
    headers: { "Authorization": "Bearer " + token, "Accept": "application/json" }, // Content-Type задаёт FormData
    body: fd,
  });
  const d = await r.json();
  if (!d || !d.id) throw new Error("gigachat: upload failed");
  return d.id;
}

async function deleteFile(token, id) {
  try { await fetch(API + "/files/" + id + "/delete", { method: "POST", headers: { "Authorization": "Bearer " + token, "Accept": "application/json" } }); } catch (e) {}
}

async function chat(token, model, messages, temperature, max_tokens) {
  const r = await fetch(API + "/chat/completions", {
    method: "POST",
    headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ model, messages, temperature, max_tokens }),
  });
  let text = "";
  try { const d = await r.json(); text = d && d.choices && d.choices[0] && d.choices[0].message ? (d.choices[0].message.content || "") : ""; } catch (e) {}
  return { ok: r.ok, text };
}

async function gigachat(body) {
  if (!AUTH_KEY) return { content: [] };
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // сертификат НУЦ Минцифры РФ
  const token = await getToken();

  const temperature = typeof body.temperature === "number" ? body.temperature : 0.6;
  const max_tokens = Math.min(body.max_tokens || 1024, 8192);
  const uploaded = [];
  let hadImages = false;

  // Anthropic-стиль -> GigaChat, с загрузкой изображений
  const messages = [];
  if (body.system) messages.push({ role: "system", content: String(body.system) });
  for (const m of (body.messages || [])) {
    const role = m.role === "assistant" ? "assistant" : "user";
    if (typeof m.content === "string") { messages.push({ role, content: m.content }); continue; }
    if (Array.isArray(m.content)) {
      const texts = [];
      const atts = [];
      for (const c of m.content) {
        if (c && c.type === "text" && c.text) texts.push(c.text);
        else if (c && c.type === "image" && c.source && c.source.type === "base64" && c.source.data) {
          try { const id = await uploadImage(token, c.source.media_type || "image/jpeg", c.source.data); uploaded.push(id); atts.push(id); hadImages = true; } catch (e) {}
        }
      }
      const msg = { role, content: texts.join("\n\n") || "Проанализируй вложенные изображения." };
      if (atts.length) msg.attachments = atts;
      messages.push(msg);
      continue;
    }
    messages.push({ role, content: String(m.content ?? "") });
  }

  try {
    // Основной вызов: с фото — на vision-модели
    let res = await chat(token, hadImages ? MODEL_VISION : MODEL_TEXT, messages, temperature, max_tokens);
    // Откат 1: фото не сработали — тем же контентом без вложений на текстовой модели
    if ((!res.ok || !res.text) && hadImages) {
      const textOnly = messages.map(({ attachments, ...r }) => r);
      res = await chat(token, MODEL_TEXT, textOnly, temperature, max_tokens);
    }
    return { content: res.text ? [{ type: "text", text: res.text }] : [] };
  } finally {
    if (uploaded.length) await Promise.allSettled(uploaded.map(id => deleteFile(token, id)));
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    res.status(200).json(await gigachat(body));
  } catch (e) {
    res.status(200).json({ content: [] }); // мягкий откат -> запасной ответ
  }
}
