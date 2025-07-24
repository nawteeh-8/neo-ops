// Service worker with offline fallback
const CACHE_NAME = 'ops-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const { origin } = new URL(event.request.url);
  if (origin !== location.origin) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          return cached || caches.match('/offline.html');
        });
      })
  );
});
