/* ==========================================================================
   EasyTool Service Worker (PWA Engine)
   Offline Caching, Instant Load & Native App Lifecycle
   ========================================================================== */

const CACHE_NAME = 'easytool-v6.0';
const CORE_ASSETS = [
  './',
  './index.html',
  './tools.html',
  './about.html',
  './privacy.html',
  './style.css?v=6.0',
  './tools.css?v=6.0',
  './app.js?v=6.0',
  './icon.svg',
  './manifest.json'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('EasyTool SW pre-cache partial notice:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network-first with Cache fallback for updated utilities
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Skip external CDN/API requests to avoid cors issues
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});
