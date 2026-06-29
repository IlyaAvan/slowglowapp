// Slow Glow — единый сервер для российского хостинга (Timeweb, VPS, Yandex Cloud и т.п.).
// Отдаёт собранное приложение из папки dist/ И обрабатывает запросы ИИ на /api/gigachat
// в одном процессе. Без внешних зависимостей — только встроенные модули Node.
//
// Запуск:
//   npm install          (один раз)
//   npm run build        (собирает dist/)
//   npm start            (запускает этот сервер; порт берётся из переменной PORT или 3000)
//
// ИИ (GigaChat): ключ уже вписан ниже как значение по умолчанию; можно переопределить
// переменной окружения GIGACHAT_AUTH_KEY. Также опционально GIGACHAT_MODEL и GIGACHAT_SCOPE.

import http from "node:http";
import { stat } from "node:fs/promises";
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
const GIGACHAT_AUTH_KEY = process.env.GIGACHAT_AUTH_KEY || "MDE5ZWZlOTMtMzViZC03NzYyLTgxNGEtOWNjMDM0OGJjZWI3OjY0MTExZGFjLWNiMTUtNGYxMC1hY2UyLTVmMjRlNjQ4MWE3MA==";
const GIGACHAT_SCOPE = process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS";
const GIGACHAT_MODEL = process.env.GIGACHAT_MODEL || "GigaChat";
let _tok = null; // кэш access_token

async function gigaToken() {
  if (_tok && _tok.exp > Date.now() + 60000) return _tok.token;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // сертификат НУЦ Минцифры РФ
  const r = await fetch("https://ngw.devices.sberbank.ru:9443/api/v2/oauth", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + GIGACHAT_AUTH_KEY,
      "RqUID": crypto.randomUUID(),
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body: "scope=" + encodeURIComponent(GIGACHAT_SCOPE),
  });
  const d = await r.json();
  if (!d || !d.access_token) throw new Error("gigachat: no access_token");
  _tok = { token: d.access_token, exp: Date.now() + 25 * 60 * 1000 };
  return _tok.token;
}

async function gigachat(body) {
  if (!GIGACHAT_AUTH_KEY) return { content: [] };
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const msgs = [];
  if (body.system) msgs.push({ role: "system", content: String(body.system) });
  for (const m of (body.messages || [])) {
    const content = typeof m.content === "string"
      ? m.content
      : (Array.isArray(m.content) ? m.content.map(c => (c && c.text) || "").join("") : "");
    msgs.push({ role: m.role === "assistant" ? "assistant" : "user", content });
  }
  const token = await gigaToken();
  const r = await fetch("https://gigachat.devices.sberbank.ru/api/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      model: GIGACHAT_MODEL,
      messages: msgs,
      temperature: typeof body.temperature === "number" ? body.temperature : 0.6,
      max_tokens: Math.min(body.max_tokens || 1024, 8192),
    }),
  });
  const d = await r.json();
  const text = d && d.choices && d.choices[0] && d.choices[0].message ? (d.choices[0].message.content || "") : "";
  return { content: text ? [{ type: "text", text }] : [] };
}

// ── HTTP-сервер ──────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // API: ИИ
  if (req.method === "POST" && (req.url === "/api/gigachat" || req.url.startsWith("/api/gigachat?"))) {
    let raw = "";
    req.on("data", c => { raw += c; if (raw.length > 2e6) req.destroy(); });
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
  // Статика из dist/ с откатом на index.html (SPA)
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

server.listen(PORT, () => console.log("Slow Glow слушает порт " + PORT));
