const APP_PREFIX = 'budget';
const VERSION = APP_PREFIX + VERSION;
const CACHE_NAME = APP_PREFIX + VERSION

const FILES_TO_CACHE = [
    "./models/transaction.js",
    "./css/styles.css",
    "./js/idb.js",
    "./js/index.js",
    "./public/index.html",
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
     )
})