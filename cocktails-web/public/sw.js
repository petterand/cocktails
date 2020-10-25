// self.addEventListener('install', function (event) {
//    const CACHE_NAME = 'cocktails-cache-v1';
//    const urlsToCache = ['/main.js'];

//    event.waitUntil(caches.open(CACHE_NAME)).then((cache) => {
//       return cache.addAll(urlsToCache);
//    });
// });

// self.addEventListener('fetch', function (event) {
//    event.respondWith(
//       caches.match(event.request).then(function (response) {
//          if (response) {
//             return response;
//          }
//          return fetch(event.request);
//       })
//    );
// });
