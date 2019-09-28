const expectedCaches = ['static-v1'];

const cachedAssets = [
  'index.html',
  'about.html',
  'main.js'
];

self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches
      .open(expectedCaches[0])
      .then(cache => cache.addAll(cachedAssets))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activate');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log(`${expectedCaches[0]} now ready to handle fetches!`);
    })
  );
});

self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetch');

  e.respondWith(
    fetch(e.request)
      .catch(() => cache.match(e.request))
  )
});