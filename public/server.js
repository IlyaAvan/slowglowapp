// Slow Glow — единый сервер для российского хостинга (Timeweb, VPS, Yandex Cloud и т.п.).
// Отдаёт собранное приложение из папки dist/ И обрабатывает запросы ИИ на /api/gigachat
// в одном процессе. Без внешних зависимостей — только встроенные модули Node.
//
// Запуск:
//   npm install          (один раз)
//   npm run build        (собирает dist/)
//   npm start            (запускает этот сервер; порт из PORT или 3000)
//
// ИИ (GigaChat): ключ вписан ниже по умолчанию; можно переопределить переменными
// окружения GIGACHAT_AUTH_KEY, GIGACHAT_MODEL, GIGACHAT_VISION_MODEL, GIGACHAT_SCOPE.
// Поддерживаются ФОТО: изображения из запроса загружаются в хранилище GigaChat и
// цепляются через attachments (нужно для анализатора пинов, «сохранений», стилиста).

import http from "node:http";
import { stat, mkdir, readFile, writeFile } from "node:fs/promises";
import webpush from "web-push";
import { createReadStream } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DIST = path.resolve("dist");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".gif": "image/gif", ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
};

// ── GigaChat (Сбер) ──────────────────────────────────────────────────────────
// ВАЖНО: ключ задаётся ТОЛЬКО через переменную окружения GIGACHAT_AUTH_KEY
// (в панели хостинга или перед запуском: GIGACHAT_AUTH_KEY=... npm start).
// В коде ключа больше нет — так он не утечёт вместе с исходниками.
const AUTH_KEY = process.env.GIGACHAT_AUTH_KEY || "";
const SCOPE = process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS";
const MODEL_TEXT = process.env.GIGACHAT_MODEL || "GigaChat";
const MODEL_VISION = process.env.GIGACHAT_VISION_MODEL || "GigaChat-Max";
const OAUTH = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const API = "https://gigachat.devices.sberbank.ru/api/v1";
const EXT = { "image/png":"png","image/webp":"webp","image/gif":"gif","image/jpeg":"jpg","image/jpg":"jpg" };
let _tok = null;

async function gigaToken() {
  if (_tok && _tok.exp > Date.now() + 60000) return _tok.token;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // сертификат НУЦ Минцифры РФ
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

async function gigaUpload(token, mime, b64) {
  const bin = Buffer.from(b64, "base64");
  if (bin.length > 14 * 1024 * 1024) throw new Error("image too large");
  const fd = new FormData();
  fd.append("file", new Blob([bin], { type: mime }), "image." + (EXT[mime] || "jpg"));
  fd.append("purpose", "general");
  const r = await fetch(API + "/files", {
    method: "POST",
    headers: { "Authorization": "Bearer " + token, "Accept": "application/json" },
    body: fd,
  });
  const d = await r.json();
  if (!d || !d.id) throw new Error("gigachat: upload failed");
  return d.id;
}

async function gigaDelete(token, id) {
  try { await fetch(API + "/files/" + id + "/delete", { method: "POST", headers: { "Authorization": "Bearer " + token, "Accept": "application/json" } }); } catch (e) {}
}

async function gigaChatCall(token, model, messages, temperature, max_tokens) {
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
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const token = await gigaToken();

  const temperature = typeof body.temperature === "number" ? body.temperature : 0.6;
  const max_tokens = Math.min(body.max_tokens || 1024, 8192);
  const uploaded = [];
  let hadImages = false;

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
          try { const id = await gigaUpload(token, c.source.media_type || "image/jpeg", c.source.data); uploaded.push(id); atts.push(id); hadImages = true; } catch (e) {}
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
    let res = await gigaChatCall(token, hadImages ? MODEL_VISION : MODEL_TEXT, messages, temperature, max_tokens);
    if ((!res.ok || !res.text) && hadImages) {
      const textOnly = messages.map(({ attachments, ...r }) => r);
      res = await gigaChatCall(token, MODEL_TEXT, textOnly, temperature, max_tokens);
    }
    return { content: res.text ? [{ type: "text", text: res.text }] : [] };
  } finally {
    if (uploaded.length) await Promise.allSettled(uploaded.map(id => gigaDelete(token, id)));
  }
}

// ── Пуши «Тебе письмо ✦» ─────────────────────────────────────────────────────
// VAPID-ключи создаются сами при первом запуске и хранятся в ./data/vapid.json.
// Подписки — в ./data/push-subs.json. Час рассылки: SG_PUSH_HOUR (по умолчанию 9,
// по времени сервера). Клиент включает напоминание кнопкой в «Конверте дня».
const DATA_DIR = path.resolve("data");
let VAPID = null;
let SUBS = [];
let PUSH_STATE = { lastSent: "" };

async function pushInit() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    try { VAPID = JSON.parse(await readFile(path.join(DATA_DIR, "vapid.json"), "utf8")); } catch (_) {}
    if (!VAPID || !VAPID.publicKey) {
      VAPID = webpush.generateVAPIDKeys();
      await writeFile(path.join(DATA_DIR, "vapid.json"), JSON.stringify(VAPID, null, 2));
      console.log("Созданы VAPID-ключи для пушей → data/vapid.json");
    }
    webpush.setVapidDetails("mailto:hello@slow-glow.app", VAPID.publicKey, VAPID.privateKey);
    try { SUBS = JSON.parse(await readFile(path.join(DATA_DIR, "push-subs.json"), "utf8")); } catch (_) { SUBS = []; }
    try { PUSH_STATE = JSON.parse(await readFile(path.join(DATA_DIR, "push-state.json"), "utf8")); } catch (_) {}
    setInterval(pushTick, 60 * 1000);
    console.log("Пуши готовы · подписок: " + SUBS.length);
  } catch (e) { console.log("Пуши не инициализировались:", e.message); }
}
async function saveSubs() { try { await writeFile(path.join(DATA_DIR, "push-subs.json"), JSON.stringify(SUBS)); } catch (_) {} }
async function pushTick() {
  try {
    const now = new Date();
    const hour = Number(process.env.SG_PUSH_HOUR || 9);
    const today = now.toISOString().slice(0, 10);
    if (now.getHours() !== hour || PUSH_STATE.lastSent === today || !SUBS.length) return;
    PUSH_STATE.lastSent = today;
    await writeFile(path.join(DATA_DIR, "push-state.json"), JSON.stringify(PUSH_STATE));
    const payload = JSON.stringify({ title: "Slow Glow ✦", body: "Тебе письмо на сегодня — шаг, идея и вопрос ✦", url: "/" });
    const dead = [];
    await Promise.allSettled(SUBS.map(sub =>
      webpush.sendNotification(sub, payload).catch(err => { if (err && (err.statusCode === 404 || err.statusCode === 410)) dead.push(sub.endpoint); })
    ));
    if (dead.length) { SUBS = SUBS.filter(s => !dead.includes(s.endpoint)); await saveSubs(); }
    console.log("Утреннее письмо отправлено · " + SUBS.length + " подписок");
  } catch (e) {}
}

// ── Защита ИИ-эндпоинта: до 20 запросов в минуту с одного IP + проверка Origin ──
const _hits = new Map();
function aiAllowed(req) {
  const org = req.headers.origin || "";
  const host = req.headers.host || "";
  const extra = process.env.SG_ALLOWED_ORIGIN || "";
  if (org && !(org.includes(host) || (extra && org.includes(extra)))) return false;
  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "?").split(",")[0].trim();
  const now = Date.now();
  const arr = (_hits.get(ip) || []).filter(t => now - t < 60000);
  if (arr.length >= 20) { _hits.set(ip, arr); return false; }
  arr.push(now); _hits.set(ip, arr);
  if (_hits.size > 5000) _hits.clear();
  return true;
}

// ── HTTP-сервер ──────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/push/pubkey") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ key: VAPID ? VAPID.publicKey : "" }));
    return;
  }
  if (req.method === "POST" && req.url === "/api/push/subscribe") {
    let raw = "";
    req.on("data", c => { raw += c; if (raw.length > 1e5) req.destroy(); });
    req.on("end", async () => {
      try {
        const sub = JSON.parse(raw || "{}");
        if (sub && sub.endpoint) {
          if (!SUBS.some(x => x.endpoint === sub.endpoint)) { SUBS.push(sub); await saveSubs(); }
          res.writeHead(200, { "Content-Type": "application/json" }); res.end('{"ok":true}'); return;
        }
      } catch (_) {}
      res.writeHead(400, { "Content-Type": "application/json" }); res.end('{"ok":false}');
    });
    return;
  }
  if (req.method === "POST" && (req.url === "/api/gigachat" || req.url.startsWith("/api/gigachat?"))) {
    if (!aiAllowed(req)) { res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" }); res.end('{"content":[]}'); return; }
    let raw = "";
    req.on("data", c => { raw += c; if (raw.length > 3e7) req.destroy(); }); // до ~30 МБ (фото в base64)
    req.on("end", async () => {
      try {
        const out = await gigachat(JSON.parse(raw || "{}"));
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(out));
      } catch (e) {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ content: [] }));
      }
    });
    return;
  }
  serveStatic(req, res);
});

async function serveStatic(req, res) {
  try {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/" || urlPath === "") urlPath = "/index.html";
    let filePath = path.join(DIST, urlPath);
    if (!filePath.startsWith(DIST)) { res.writeHead(403); res.end("forbidden"); return; }
    let s = null;
    try { s = await stat(filePath); } catch (_) { s = null; }
    if (!s || s.isDirectory()) filePath = path.join(DIST, "index.html"); // SPA fallback
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    createReadStream(filePath).on("error", () => { res.writeHead(404); res.end("not found"); }).pipe(res);
  } catch (e) {
    res.writeHead(500); res.end("server error");
  }
}

pushInit();
server.listen(PORT, () => console.log("Slow Glow слушает порт " + PORT));
