// Service worker: cache dos arquivos do app para uso offline (estratégia network-first).
const CACHE = "tutb-v1";
const ARQUIVOS = ["./", "./index.html", "./app.css", "./app.js", "./manifest.webmanifest", "../shared/brand.css", "../shared/data.js", "../shared/emblem.svg"];

self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok && new URL(e.request.url).origin === location.origin) { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
