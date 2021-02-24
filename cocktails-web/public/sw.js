const API_URL = process.env.API_URL;
const CACHE_NAME = 'cocktails-cache-v1';

function cache(request, response) {
   if (response.type === 'error' || response.type === 'opaque') {
      return Promise.resolve(); // do not put in cache network errors
   }

   return caches
      .open(CACHE_NAME)
      .then((cache) => cache.put(request, response.clone()));
}

function update(request) {
   return fetch(request.url).then((response) =>
      cache(request, response).then(() => response)
   );
}

function refresh(response) {
   return response.json().then((data) => {
      self.clients.matchAll().then((clients) => {
         clients.forEach((client) => {
            client.postMessage(
               JSON.stringify({
                  type: response.url,
                  data,
               })
            );
         });
      });
      return data.data;
   });
}

self.addEventListener('install', function (event) {
   const urlsToCache = [`${API_URL}/cocktails`];

   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         return cache.addAll(urlsToCache);
      })
   );
});

self.addEventListener('fetch', function (event) {
   if (
      event.request.url.includes(API_URL) &&
      !event.request.url.includes('get-key')
   ) {
      event.respondWith(caches.match(event.request));
      event.waitUntil(update(event.request).then(refresh));
   }
});
