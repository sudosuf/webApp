// sw.js
self.addEventListener('install', event => {
  console.log('[SW]: install');
  event.waitUntil(
    caches.open('static-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
         '/script.js',
         '/img/icon_192.jpeg',
         '/img/icon_128.jpeg',
         '/img/icon_64.jpeg',
         '/img/icon.jpeg',
         '/img/city_1.webp',
         '/img/city_2.webp',
         '/img/city_3.webp',
         '/img/city_5.webp',
         '/img/city_6.webp',
         '/img/city_7.webp',
         '/img/cloudy.webp',
         '/img/suny.png'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[SW]: activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key != 'static-v1') {
          console.log('[SW]: Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});