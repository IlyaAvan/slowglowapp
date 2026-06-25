/* Slow Glow · регистрация service worker + аккуратный баннер «Вышло обновление».
   Подключается в index.html: <script src="/register-sw.js" defer></script> */
(function () {
  if (!('serviceWorker' in navigator)) return;

  var refreshing = false;
  // когда новый SW взял управление — один раз тихо перезагружаем страницу
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
      // обновление уже скачано и ждёт
      if (reg.waiting) showUpdate(reg.waiting);

      // появился новый SW — следим, когда он будет готов
      reg.addEventListener('updatefound', function () {
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', function () {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdate(nw); // есть свежая версия и приложение уже работало
          }
        });
      });

      // проверять обновления при возвращении на вкладку
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') reg.update();
      });
    }).catch(function (e) { console.warn('SW registration failed:', e); });
  });

  function showUpdate(worker) {
    if (document.getElementById('sg-update')) return;
    var bar = document.createElement('div');
    bar.id = 'sg-update';
    bar.innerHTML = '<span>Вышло обновление</span>' +
      '<button id="sg-update-btn" type="button">Обновить</button>';
    style(bar, {
      position: 'fixed', left: '50%', bottom: '20px', transform: 'translateX(-50%)',
      zIndex: '99999', display: 'flex', alignItems: 'center', gap: '12px',
      background: '#1A1A1A', color: '#FAF8F1', padding: '11px 14px 11px 18px',
      borderRadius: '999px', boxShadow: '0 12px 34px rgba(26,26,26,0.28)',
      font: '500 14px/1 Inter, -apple-system, sans-serif', maxWidth: '92%',
      opacity: '0', transition: 'opacity .3s ease, transform .3s ease'
    });
    var btn = bar.querySelector('#sg-update-btn');
    style(btn, {
      border: 'none', cursor: 'pointer', background: '#F6E7A6', color: '#1A1A1A',
      borderRadius: '999px', padding: '8px 15px', font: '600 13px/1 Inter, sans-serif'
    });
    btn.addEventListener('click', function () {
      worker.postMessage('SKIP_WAITING'); // активируем новый SW → controllerchange → reload
      bar.style.opacity = '0';
    });
    document.body.appendChild(bar);
    requestAnimationFrame(function () {
      bar.style.opacity = '1';
      bar.style.transform = 'translateX(-50%) translateY(0)';
    });
  }

  function style(el, s) { for (var k in s) el.style[k] = s[k]; }
})();
