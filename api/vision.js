/* ═══════════════════════════════════════════════════════════════════
   /api/vision — прокси к любому OpenAI-совместимому шлюзу (VseLLM, GenAPI,
   BotHub, ProxyAPI и т.п.). Модель со зрением видит фотографии.

   Приложение шлёт тело в формате Anthropic (image + base64). Прокси
   переводит его в формат OpenAI (image_url + data-URI), отправляет на шлюз
   и возвращает ответ обратно в формате Anthropic:
       { content: [ { type: "text", text: "…" } ] }

   Установка:
   1) Положить файл как  api/vision.js
   2) Переменные окружения в Vercel:
        VISION_API_KEY   — ключ шлюза (sk-…)
        VISION_BASE_URL  — адрес API, напр. https://api.vsellm.ru/v1
        VISION_MODEL     — модель со зрением, напр. gpt-4.1
      Отметить Production + Preview + Development.
   3) В index.html:  window.SG_AI_ENDPOINT = "/api/vision";
   4) Redeploy.
   ═══════════════════════════════════════════════════════════════════ */

export const maxDuration = 60;

/* ── ЗАЩИТА ПРОКСИ ─────────────────────────────────────────────────
   Прокси открыт в интернет, поэтому защищаем три вещи:
   1) чужие сайты не могут дёргать его от своего имени (origin-замок);
   2) общий поток запросов ограничен, чтобы всплеск не выжег баланс;
   3) размер тела ограничен, чтобы не слали гигантские картинки.
   Память живёт в пределах тёплого инстанса — этого достаточно как
   недорогая подушка; строгий лимит появится вместе с аккаунтами. */

// Кто имеет право обращаться к прокси. Пустой ALLOW = разрешить свой же домен.
const ALLOWED_HOSTS = [
  "slow-glow.ru", "www.slow-glow.ru",
  "slowglowapp-mi5v.vercel.app",
  "localhost", "127.0.0.1",
];
function originAllowed(req) {
  const o = req.headers.origin || req.headers.referer || "";
  if (!o) return true; // прямые серверные вызовы без Origin (например, тесты) не блокируем жёстко
  try {
    const h = new URL(o).hostname;
    return ALLOWED_HOSTS.some((a) => h === a || h.endsWith("." + a) || h.endsWith(".vercel.app"));
  } catch { return false; }
}

// Общий потолок: не больше N запросов в минуту со всех пользователей вместе.
const RATE_MAX = 40;         // запросов в минуту суммарно
const RATE_WINDOW = 60_000;  // окно 1 минута
let hits = [];
function rateOk() {
  const now = Date.now();
  hits = hits.filter((t) => now - t < RATE_WINDOW);
  if (hits.length >= RATE_MAX) return false;
  hits.push(now);
  return true;
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks = [];
  let total = 0;
  for await (const c of req) {
    total += c.length;
    if (total > 8 * 1024 * 1024) throw new Error("тело запроса слишком большое"); // 8 МБ потолок
    chunks.push(c);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

/* Anthropic-блок → OpenAI-часть сообщения */
function toOpenAIParts(content) {
  const parts = Array.isArray(content) ? content : [{ type: "text", text: String(content || "") }];
  const out = [];
  for (const p of parts) {
    if (!p) continue;
    if (p.type === "text") {
      out.push({ type: "text", text: p.text });
    } else if (p.type === "image" && p.source && p.source.type === "base64") {
      const uri = "data:" + (p.source.media_type || "image/jpeg") + ";base64," + p.source.data;
      out.push({ type: "image_url", image_url: { url: uri } });
    } else if (p.type === "image_url" && p.image_url) {
      out.push({ type: "image_url", image_url: p.image_url });
    }
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Только POST" });

  // Щит 1: только со своих доменов
  if (!originAllowed(req)) {
    return res.status(403).json({ error: "Доступ разрешён только из приложения Slow Glow." });
  }
  // Щит 2: общий потолок частоты — защита баланса от всплеска
  if (!rateOk()) {
    return res.status(429).json({ error: "Слишком много запросов сейчас. Подожди минуту и попробуй снова." });
  }

  const key = process.env.VISION_API_KEY;
  const base = (process.env.VISION_BASE_URL || "").replace(/\/+$/, "");
  const model = process.env.VISION_MODEL || "gpt-4.1";
  if (!key)  return res.status(500).json({ error: "не задан VISION_API_KEY" });
  if (!base) return res.status(500).json({ error: "не задан VISION_BASE_URL (например https://api.vsellm.ru/v1)" });

  let body;
  try { body = await readBody(req); }
  catch (e) { return res.status(400).json({ error: "не удалось прочитать запрос: " + String(e.message) }); }
  if (!body || !Array.isArray(body.messages)) {
    return res.status(400).json({ error: "ожидается { max_tokens, system, messages }" });
  }

  /* Собираем сообщения в формате OpenAI */
  const messages = [];
  if (body.system) messages.push({ role: "system", content: String(body.system) });
  for (const m of body.messages) {
    messages.push({
      role: m.role === "assistant" ? "assistant" : "user",
      content: toOpenAIParts(m.content),
    });
  }

  try {
    const r = await fetch(base + "/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: Math.min(Number(body.max_tokens) || 1500, 8000),
        temperature: Number.isFinite(Number(body.temperature)) ? Number(body.temperature) : 0.7,
      }),
    });

    const t = await r.text();
    if (!r.ok) {
      console.error("[vision]", model, r.status, t.slice(0, 400));
      return res.status(r.status).json({ error: "Шлюз (" + model + "): " + r.status + " " + t.slice(0, 220) });
    }

    let j;
    try { j = JSON.parse(t); }
    catch { return res.status(502).json({ error: "шлюз вернул не JSON: " + t.slice(0, 200) }); }

    const msg = j.choices && j.choices[0] && j.choices[0].message;
    const text = !msg ? "" :
      (typeof msg.content === "string" ? msg.content
        : Array.isArray(msg.content) ? msg.content.map((c) => c.text || "").join("")
        : "");

    res.setHeader("content-type", "application/json; charset=utf-8");
    res.setHeader("cache-control", "no-store");
    return res.status(200).json({ content: [{ type: "text", text: text.trim() }], model });
  } catch (e) {
    console.error("[vision]", e);
    return res.status(502).json({ error: "не удалось связаться со шлюзом: " + String((e && e.message) || e) });
  }
}
