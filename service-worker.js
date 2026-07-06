// Slow Glow — service worker (network-first, чтобы новые версии не залипали)
const CACHE = "slowglow-v7";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE).catch(() => {})));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// network-first для всего: онлайн всегда свежая сборка, кэш — только если сети нет
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined))
      )
  );
});

// ── Пуши: «Тебе письмо ✦» ────────────────────────────────────────────────────
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data && e.data.text() }; }
  const title = d.title || "Slow Glow ✦";
  const body = d.body || "Тебе письмо на сегодня — шаг, идея и вопрос ✦";
  e.waitUntil(self.registration.showNotification(title, {
    body, icon: "./icon-192-v2.png", badge: "./icon-192-v2.png", data: { url: (d.url || "./") }
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((ws) => {
    for (const w of ws) { if ("focus" in w) return w.focus(); }
    return clients.openWindow(url);
  }));
});
