const APP_PREFIX = 'budget';
const VERSION = APP_PREFIX + VERSION;
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [

  '../manifest.json',
  './index.html',
  './css/styles.css',
  './index.js',
  './idb.js',
  '/',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
  './icons/192x192.png',
  './icons/icon-512x512.png',
];

self.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log('installing cache : ' + CACHE_NAME);
			return cache.addAll(FILES_TO_CACHE);
		})
	);
    self.skipWaitings();
})

self.addEventListener('fetch', function(e) {
    if (evt.request.url.includes('/api/')) {
        evt.respondWith(
          caches
            .open(DATA_CACHE_NAME)
            .then(cache => {
              return fetch(evt.request)
                .then(response => {
                  // 
                  if (response.status === 200) {
                    cache.put(evt.request.url, response.clone());
                  }
      
                  return response;
                })
                .catch(err => {
                  // 
                  return cache.match(evt.request);
                });
            })
            .catch(err => console.log(err))
        );
      
        return;
      }

      evt.respondWith(
        fetch(evt.request).catch(function() {
          return caches.match(evt.request).then(function(response) {
            if (response) {
              return response;
            } else if (evt.request.headers.get('accept').includes('text/html')) {
              //
              return caches.match('/');
            }
          });
        })
      );


});
