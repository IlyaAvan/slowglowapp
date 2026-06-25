/* Slow Glow · service worker
   ВАЖНО: при каждом релизе поднимай номер версии ниже (v1 → v2 → v3…).
   Это всё, что нужно, чтобы у всех пользователей подтянулось обновление. */
const VERSION = 'v1';
const CACHE = 'slow-glow-' + VERSION;

/* Оболочка приложения, которую кладём в кэш сразу.
   При желании добавь сюда пути к собранным JS/CSS и иконкам. */
const ASSETS = ['/', '/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (e) => {
  // НЕ вызываем skipWaiting здесь — новый SW «ждёт», пока пользователь
  // не нажмёт «Обновить» в баннере (тихое, аккуратное обновление).
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// получив команду со страницы — мгновенно активируемся
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.pathname.startsWith('/api/')) return; // запросы к API (GigaChat) не кэшируем

  // навигация: сначала сеть (свежий HTML), нет сети → из кэша (офлайн)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return r; })
        .catch(() => caches.match(req).then((m) => m || caches.match('/index.html')))
    );
    return;
  }

  // статика: отдать из кэша сразу, в фоне обновить (stale-while-revalidate)
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req).then((r) => {
        if (r && r.status === 200 && r.type === 'basic') {
          const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp));
        }
        return r;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
