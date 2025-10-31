// Bump versi ini tiap rilis agar cache lama dibersihkan
const STATIC_CACHE = "static-v1";
const PRECACHE_URLS = ["/offline"];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(STATIC_CACHE).then((c) => c.addAll(PRECACHE_URLS)));
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((k) => (k !== STATIC_CACHE ? caches.delete(k) : null)))
        )
    );
    self.clients.claim();
});

// Navigasi: network-first, fallback ke /offline
// Asset Next (_next/static/*) & ikon: cache-first
self.addEventListener("fetch", (event) => {
    const req = event.request;
    const url = new URL(req.url);

    if (req.mode === "navigate") {
        event.respondWith(fetch(req).catch(() => caches.match("/offline")));
        return;
    }

    if (
        url.origin === self.location.origin &&
        (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/"))
    ) {
        event.respondWith(
            caches.match(req).then((cached) => {
                if (cached) return cached;
                return fetch(req).then((res) => {
                    const clone = res.clone();
                    caches.open(STATIC_CACHE).then((c) => c.put(req, clone));
                    return res;
                });
            })
        );
    }
});
