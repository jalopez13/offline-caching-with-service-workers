const expectedCaches = ['static-v1'];

self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
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
      .then(res => {
        // make copy/clone of response
        const resClone = res.clone();

        // open cache
        caches
          .open(expectedCaches[0])
          .then(cache => {
            cache.put(e.request, resClone);
          });

        return res;
      })
      .catch(err => cache.match(e.request).then(res => res))
  )
});