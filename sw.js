// Service worker with pre-caching and cache versioning
const CACHE_VERSION = 'v2';
const CACHE_NAME = `ops-cache-${CACHE_VERSION}`;
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/global.css',
  '/css/adaptablescreens.css',
  '/css/chatbot.css',
  '/js/main.js',
  '/js/langthem.js',
  '/services/business.html',
  '/services/contactcenter.html',
  '/services/itsupport.html',
  '/services/professionals.html',
  '/modals/businessoperations.html',
  '/modals/contactcenter.html',
  '/modals/itsupport.html',
  '/modals/professionals.html',
  '/fabs/contact.html',
  '/fabs/join.html',
  '/bot/chatbot.html',
  '/bot/chatbot-template.html'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.filter(name => name.startsWith('ops-cache-') && name !== CACHE_NAME)
             .map(name => caches.delete(name))
      );
    })
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
