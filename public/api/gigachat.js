// Vercel serverless function -> /api/gigachat
// ─────────────────────────────────────────────────────────────────────────────
// Прокси между приложением Slow Glow и GigaChat (Сбер).
//
// Приложение шлёт запрос в формате Anthropic:
//   { model, max_tokens, system, messages:[{ role, content }] }
//   где content — строка ИЛИ массив блоков:
//     { type:"text", text }               — текст
//     { type:"image", source:{ type:"base64", media_type, data } } — фото пина
//
// Приложение ждёт ответ строго в форме Anthropic:
//   { content: [ { type:"text", text:"…" } ] }
//   (везде парсится как: (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join(""))
//
// Поэтому здесь мы: авторизуемся в GigaChat, при необходимости загружаем фото в
// хранилище GigaChat и цепляем их через attachments, зовём chat/completions,
// а ответ переупаковываем обратно в форму Anthropic. App.jsx менять НЕ нужно.
//
// ── Как включить ИИ ──────────────────────────────────────────────────────────
//   Vercel → Project → Settings → Environment Variables → добавь:
//     GIGACHAT_AUTH_KEY   = твой Authorization Key (base64 из личного кабинета)
//     GIGACHAT_SCOPE      = GIGACHAT_API_PERS   (физлицо; B2B/CORP — для юрлиц)   [необязательно]
//     GIGACHAT_MODEL      = GigaChat-Max        (Max/Pro умеют «видеть» фото)     [необязательно]
//     GIGACHAT_CA_PEM     = сертификат НУЦ Минцифры (PEM или base64 от PEM)        [необязательно, см. ниже]
//   → Redeploy.
//   Без ключа функция вернёт { content: [] } и приложение возьмёт запасные ответы.
//
// ── Про сертификат (важно) ───────────────────────────────────────────────────
//   Домены GigaChat подписаны корневым сертификатом НУЦ Минцифры, которого нет
//   в доверенном хранилище Vercel/Node. Варианты:
//     • Безопасно: скачай «Russian Trusted Root CA» (госуслуги) и положи его PEM
//       в переменную GIGACHAT_CA_PEM (можно как есть, можно base64). Проверка TLS
//       останется включённой.
//     • Без переменной: функция отключит проверку TLS (rejectUnauthorized:false),
//       чтобы всё заработало сразу. Это удобно для старта, но менее безопасно —
//       по возможности добавь GIGACHAT_CA_PEM и включи проверку обратно.
// ─────────────────────────────────────────────────────────────────────────────

import https from "node:https";
import { randomUUID } from "node:crypto";

export const config = { maxDuration: 60 };

const OAUTH_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const API_BASE  = "https://gigachat.devices.sberbank.ru/api/v1";

/* ── TLS: используем сертификат Минцифры, если он задан, иначе отключаем проверку ── */
function readCaPem() {
  const v = process.env.GIGACHAT_CA_PEM;
  if (!v) return null;
  if (v.includes("BEGIN CERTIFICATE")) return v;
  try { return Buffer.from(v, "base64").toString("utf8"); } catch (e) { return null; }
}
function tlsOpts() {
  const ca = readCaPem();
  return ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false };
}

/* ── Низкоуровневый HTTPS-запрос через node:https (полный контроль над TLS) ── */
function httpsRequest(urlStr, { method = "GET", headers = {}, body = null } = {}) {
  const u = new URL(urlStr);
  const opts = {
    method,
    hostname: u.hostname,
    port: u.port || 443,
    path: u.pathname + u.search,
    headers: { ...headers },
    ...tlsOpts(),
  };
  return new Promise((resolve, reject) => {
    const r = https.request(opts, (resp) => {
      const chunks = [];
      resp.on("data", (c) => chunks.push(c));
      resp.on("end", () => {
        const buf = Buffer.concat(chunks);
        const text = buf.toString("utf8");
        let json = null;
        try { json = JSON.parse(text); } catch (e) {}
        resolve({ status: resp.statusCode, buf, text, json });
      });
    });
    r.on("error", reject);
    if (body) r.write(body);
    r.end();
  });
}

/* ── Токен доступа (живёт 30 мин; кэшируем на «тёплых» инстансах) ── */
let _token = null;
let _tokenExp = 0;
async function getToken() {
  const key = process.env.GIGACHAT_AUTH_KEY || process.env.GIGACHAT_CREDENTIALS;
  if (!key) return null;
  const now = Date.now();
  if (_token && now < _tokenExp - 60000) return _token;

  const scope = process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS";
  const res = await httpsRequest(OAUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
      "RqUID": randomUUID(),
      "Authorization": "Basic " + key,
    },
    body: "scope=" + encodeURIComponent(scope),
  });
  if (res.status !== 200 || !res.json || !res.json.access_token) {
    throw new Error("oauth " + res.status + " " + (res.text || "").slice(0, 200));
  }
  _token = res.json.access_token;
  _tokenExp = now + 25 * 60 * 1000; // запас относительно 30-минутного TTL
  return _token;
}

/* ── Загрузка одного изображения в хранилище GigaChat → возвращает file id ── */
const EXT = { "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/jpeg": "jpg", "image/jpg": "jpg" };
async function uploadImage(token, mime, b64) {
  const bin = Buffer.from(b64, "base64");
  if (bin.length > 14 * 1024 * 1024) throw new Error("image too large"); // лимит GigaChat — 15 МБ
  const ext = EXT[mime] || "jpg";
  const boundary = "----sg" + randomUUID().replace(/-/g, "");
  const pre = Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="file"; filename="image.${ext}"\r\n` +
    `Content-Type: ${mime}\r\n\r\n`, "utf8");
  const post = Buffer.from(
    `\r\n--${boundary}\r\n` +
    `Content-Disposition: form-data; name="purpose"\r\n\r\n` +
    `general\r\n` +
    `--${boundary}--\r\n`, "utf8");
  const bodyBuf = Buffer.concat([pre, bin, post]);

  const res = await httpsRequest(`${API_BASE}/files`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Accept": "application/json",
      "Content-Type": "multipart/form-data; boundary=" + boundary,
      "Content-Length": bodyBuf.length,
    },
    body: bodyBuf,
  });
  if (res.status !== 200 || !res.json || !res.json.id) {
    throw new Error("upload " + res.status + " " + (res.text || "").slice(0, 200));
  }
  return res.json.id;
}

/* ── Удаление загруженного файла (чтобы не копить мусор в хранилище) ── */
async function deleteFile(token, id) {
  try {
    await httpsRequest(`${API_BASE}/files/${id}/delete`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + token, "Accept": "application/json" },
    });
  } catch (e) {}
}

/* ── Вызов чата ── */
async function chatCompletion(token, payload) {
  return httpsRequest(`${API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

/* ── Чтение тела запроса (совместимо с разными режимами Vercel) ── */
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}
async function parseBody(req) {
  let b = req.body;
  if (b == null) {
    const raw = await readRawBody(req);
    b = raw ? JSON.parse(raw) : {};
  } else if (typeof b === "string") {
    b = JSON.parse(b);
  }
  return b || {};
}

/* ── Перевод Anthropic-сообщений в формат GigaChat (+ загрузка фото) ── */
async function buildMessages(token, body, uploadedIds) {
  const out = [];
  if (body.system) out.push({ role: "system", content: String(body.system) });

  for (const m of (body.messages || [])) {
    if (typeof m.content === "string") {
      out.push({ role: m.role, content: m.content });
      continue;
    }
    if (Array.isArray(m.content)) {
      const textParts = [];
      const atts = [];
      for (const block of m.content) {
        if (block && block.type === "text" && block.text) {
          textParts.push(block.text);
        } else if (block && block.type === "image" && block.source && block.source.type === "base64" && block.source.data) {
          const id = await uploadImage(token, block.source.media_type || "image/jpeg", block.source.data);
          uploadedIds.push(id);
          atts.push(id);
        }
      }
      const msg = {
        role: m.role,
        content: textParts.join("\n\n") || "Проанализируй вложенные изображения.",
      };
      if (atts.length) msg.attachments = atts;
      out.push(msg);
      continue;
    }
    // на всякий случай
    out.push({ role: m.role, content: String(m.content ?? "") });
  }
  return out;
}

const stripAttachments = (msgs) => msgs.map(({ attachments, ...rest }) => rest);
const answerFrom = (resp) =>
  (resp && resp.status === 200 && resp.json && resp.json.choices && resp.json.choices[0] &&
   resp.json.choices[0].message && resp.json.choices[0].message.content) || "";

/* ── Обработчик ── */
export default async function handler(req, res) {
  // Мягкий CORS (на случай, если endpoint переопределят через window.SG_AI_ENDPOINT)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  let token = null;
  const uploadedIds = [];
  try {
    token = await getToken();
    if (!token) { res.status(200).json({ content: [] }); return; } // нет ключа → запасные ответы

    const body = await parseBody(req);
    const model = process.env.GIGACHAT_MODEL || "GigaChat-Max";
    const temperature = Number(process.env.GIGACHAT_TEMPERATURE || "0.7");
    const max_tokens = body.max_tokens || 1024;

    const messages = await buildMessages(token, body, uploadedIds);
    const hadImages = messages.some((m) => m.attachments && m.attachments.length);

    // Основной вызов
    let resp = await chatCompletion(token, { model, messages, temperature, max_tokens });

    // Фолбэк 1: если с фото не получилось — пробуем тем же моделем, но без вложений (текст-онли)
    if (resp.status !== 200 && hadImages) {
      resp = await chatCompletion(token, { model, messages: stripAttachments(messages), temperature, max_tokens });
    }
    // Фолбэк 2: если модель недоступна на тарифе — базовый GigaChat, текст-онли
    if (resp.status !== 200 && model !== "GigaChat") {
      resp = await chatCompletion(token, { model: "GigaChat", messages: stripAttachments(messages), temperature, max_tokens });
    }

    const answer = answerFrom(resp);
    res.status(200).json(answer ? { content: [{ type: "text", text: answer }] } : { content: [] });
  } catch (e) {
    // Любая ошибка → пустой ответ, приложение покажет запасной контент
    res.status(200).json({ content: [] });
  } finally {
    if (token && uploadedIds.length) {
      await Promise.allSettled(uploadedIds.map((id) => deleteFile(token, id)));
    }
  }
}
