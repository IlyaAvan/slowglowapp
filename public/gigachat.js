/* ═══════════════════════════════════════════════════════════════════
   /api/gigachat — прокси к GigaChat, который УМЕЕТ ПОКАЗЫВАТЬ ФОТО.

   Почему так: GigaChat не принимает картинки внутри сообщения.
   Каждое фото сначала загружается в хранилище (POST /files), а в чат
   передаются только идентификаторы файлов (поле attachments).
   Этот файл делает это сам — приложение менять не нужно.

   Установка:
   1) Положи файл как  api/gigachat.js  (поверх старого)
   2) В переменные окружения проекта добавь:
        GIGACHAT_AUTH_KEY = <ключ авторизации из личного кабинета, длинная строка Base64>
      Необязательно:
        GIGACHAT_SCOPE = GIGACHAT_API_PERS   (для физлиц; для юрлиц GIGACHAT_API_CORP)
        GIGACHAT_MODEL = GigaChat-Pro        (модель со зрением)
   3) Сделай редеплой.

   Приложение шлёт тело в формате Anthropic — на выходе получает тот же формат:
   { content: [ { type: "text", text: "…" } ] }
   ═══════════════════════════════════════════════════════════════════ */

import { Agent, setGlobalDispatcher } from "undici";
import { randomUUID } from "crypto";

/* Серверы Сбера отдают сертификат российского УЦ, которого нет в списке доверенных
   у Node на большинстве хостингов. Без этой строки любой запрос падает с ошибкой
   сертификата. Мы обращаемся только к домену Сбера, но знай: проверка отключена. */
setGlobalDispatcher(new Agent({ connect: { rejectUnauthorized: false } }));

const OAUTH_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const BASE = "https://gigachat.devices.sberbank.ru/api/v1";

export const config = { api: { bodyParser: { sizeLimit: "20mb" } } };

/* Токен живёт ~30 минут — держим его в памяти функции, чтобы не дёргать OAuth каждый раз */
let cached = { token: null, until: 0 };

async function getToken() {
  if (cached.token && Date.now() < cached.until - 60_000) return cached.token;

  const key = process.env.GIGACHAT_AUTH_KEY;
  if (!key) throw new Error("не задан GIGACHAT_AUTH_KEY");

  /* Ключ авторизации GigaChat — длинная строка Base64 (client_id:secret).
     Если он начинается с sk_ / sk-, это ключ ДРУГОГО сервиса, и Сбер его не примет. */
  if (/^sk[-_]/i.test(key.trim())) {
    throw new Error(
      "GIGACHAT_AUTH_KEY похож на ключ другого сервиса (начинается с 'sk_'). " +
      "Нужен ключ авторизации GigaChat из личного кабинета — длинная строка Base64 без префикса."
    );
  }

  const r = await fetch(OAUTH_URL, {
    method: "POST",
    headers: {
      Authorization: "Basic " + key,
      RqUID: randomUUID(),
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: "scope=" + (process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS"),
  });

  const t = await r.text();
  if (!r.ok) throw new Error("OAuth " + r.status + ": " + t.slice(0, 200));

  const j = JSON.parse(t);
  cached = { token: j.access_token, until: Number(j.expires_at) || Date.now() + 25 * 60_000 };
  return cached.token;
}

/* Загружаем одно фото в хранилище и возвращаем его id */
async function uploadImage(token, block, i) {
  const mime = (block.source && block.source.media_type) || "image/jpeg";
  const bytes = Buffer.from(block.source.data, "base64");
  const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";

  const form = new FormData();
  form.append("file", new Blob([bytes], { type: mime }), `pin_${i + 1}.${ext}`);
  form.append("purpose", "general");

  const r = await fetch(BASE + "/files", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    body: form,
  });

  const t = await r.text();
  if (!r.ok) throw new Error("загрузка фото " + (i + 1) + ": " + r.status + " " + t.slice(0, 160));
  const j = JSON.parse(t);
  if (!j.id) throw new Error("хранилище не вернуло id файла");
  return j.id;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Только POST" });

  const body = typeof req.body === "string" ? safeJson(req.body) : req.body;
  if (!body || !Array.isArray(body.messages)) {
    return res.status(400).json({ error: "Ожидается { max_tokens, system, messages }" });
  }

  try {
    const token = await getToken();

    /* Разбираем сообщения приложения: текст остаётся текстом,
       картинки уезжают в хранилище и превращаются в attachments. */
    const messages = [];
    if (body.system) messages.push({ role: "system", content: String(body.system) });

    for (const m of body.messages) {
      const parts = Array.isArray(m.content) ? m.content : [{ type: "text", text: String(m.content || "") }];
      const texts = [];
      const attachments = [];
      let shot = 0;

      for (const p of parts) {
        if (!p) continue;
        if (p.type === "text") {
          texts.push(p.text);
        } else if (p.type === "image" && p.source && p.source.type === "base64") {
          attachments.push(await uploadImage(token, p, shot++));
        } else if (p.type === "image_url" && p.image_url && /^data:/.test(p.image_url.url || "")) {
          const [head, data] = p.image_url.url.split(",");
          const media = (head.match(/data:([^;]+)/) || [])[1] || "image/jpeg";
          attachments.push(await uploadImage(token, { source: { media_type: media, data } }, shot++));
        }
      }

      const msg = { role: m.role === "assistant" ? "assistant" : "user", content: texts.join("\n") };
      if (attachments.length) msg.attachments = attachments;
      messages.push(msg);
    }

    const r = await fetch(BASE + "/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: process.env.GIGACHAT_MODEL || "GigaChat-Pro",
        messages,
        max_tokens: Math.min(Number(body.max_tokens) || 1500, 8000),
        temperature: 0.7,
      }),
    });

    const t = await r.text();
    if (!r.ok) {
      console.error("[gigachat] chat", r.status, t.slice(0, 400));
      return res.status(r.status).send(t);
    }

    const j = JSON.parse(t);
    const text = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || "";

    // Отдаём в формате Anthropic — приложение уже умеет его читать
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.setHeader("cache-control", "no-store");
    return res.status(200).json({ content: [{ type: "text", text }] });
  } catch (e) {
    console.error("[gigachat]", e);
    return res.status(502).json({ error: String((e && e.message) || e) });
  }
}

function safeJson(s) { try { return JSON.parse(s); } catch { return null; } }
