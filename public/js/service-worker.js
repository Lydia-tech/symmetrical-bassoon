const APP_PREFIX = 'budget';
const VERSION = APP_PREFIX + VERSION;
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [

  './manifest.json',
  './index.html',
  './css/style.css',
  './index/index.js',
  './js/idb.js',
  '/',
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

self.addEventListener('fetch', function(evt) {
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
