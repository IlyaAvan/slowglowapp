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

import { randomUUID } from "crypto";

/* Серверы Сбера отдают сертификат российского УЦ, которого нет в списке доверенных
   у Node. Без этой строки запрос падает с ошибкой сертификата. Осознанное
   послабление: обращаемся только к домену Сбера. Пакет undici не нужен. */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/* По умолчанию Vercel обрывает функцию через 10 секунд. Загрузка шести фото
   в хранилище GigaChat и сам разбор в это не укладываются. */
export const maxDuration = 60;

const OAUTH_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const BASE = "https://gigachat.devices.sberbank.ru/api/v1";

/* Тело может прийти разобранным, строкой или потоком — читаем все варианты */
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* Загружаем одно фото в хранилище и возвращаем его id.
   429 = либо слишком часто, либо кончились токены. На «слишком часто»
   помогает пауза, поэтому пробуем до трёх раз с нарастающей задержкой. */
async function uploadImage(token, block, i) {
  const mime = (block.source && block.source.media_type) || "image/jpeg";
  const bytes = Buffer.from(block.source.data, "base64");
  const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";

  let last = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) await sleep(700 * attempt);            // 0.7с, затем 1.4с

    const form = new FormData();
    form.append("file", new Blob([bytes], { type: mime }), `pin_${i + 1}.${ext}`);
    form.append("purpose", "general");

    const r = await fetch(BASE + "/files", {
      method: "POST",
      headers: { Authorization: "Bearer " + token, Accept: "application/json" },
      body: form,
    });

    const t = await r.text();
    if (r.ok) {
      const j = JSON.parse(t);
      if (j.id) return j.id;
      throw new Error("хранилище не вернуло id файла");
    }

    last = r.status + " " + t.slice(0, 160);
    if (r.status !== 429 && r.status < 500) break;      // 400/401/413 повторять бессмысленно
  }

  if (/^429/.test(last)) {
    throw new Error(
      "GigaChat не принял фото " + (i + 1) + " (429). Чаще всего это значит, что на аккаунте " +
      "закончились токены: обработка одного изображения стоит до 1792 токенов. " +
      "Проверь остаток в личном кабинете GigaChat. Ответ Сбера: " + last
    );
  }
  throw new Error("загрузка фото " + (i + 1) + ": " + last);
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Только POST" });

  let body;
  try { body = await readBody(req); }
  catch (e) { return res.status(400).json({ error: "не удалось прочитать запрос: " + String(e.message) }); }
  if (!body || !Array.isArray(body.messages)) {
    return res.status(400).json({ error: "ожидается { max_tokens, system, messages }" });
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
      const shots = [];   // сначала собираем картинки, потом грузим пачками

      for (const p of parts) {
        if (!p) continue;
        if (p.type === "text") {
          texts.push(p.text);
        } else if (p.type === "image" && p.source && p.source.type === "base64") {
          shots.push(p);
        } else if (p.type === "image_url" && p.image_url && /^data:/.test(p.image_url.url || "")) {
          const [head, data] = p.image_url.url.split(",");
          const media = (head.match(/data:([^;]+)/) || [])[1] || "image/jpeg";
          shots.push({ source: { media_type: media, data } });
        }
      }

      /* Три загрузки одновременно: втрое быстрее последовательных,
         и при этом Сбер не отвечает 429 на шквал запросов. */
      const attachments = [];
      for (let i = 0; i < shots.length; i += 3) {
        const batch = shots.slice(i, i + 3);
        const ids = await Promise.all(batch.map((p, k) => uploadImage(token, p, i + k)));
        attachments.push(...ids);
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
      return res.status(r.status).json({ error: "GigaChat: " + r.status + " " + t.slice(0, 200) });
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
