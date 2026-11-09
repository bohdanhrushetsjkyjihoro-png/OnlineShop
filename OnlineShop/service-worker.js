const CACHE_NAME = "onlineshop-cache-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./news.html",
  "./dist/output.css",
  "./styles.css",
  "./script.js",
  "./manifest.webmanifest",
  "./images/hero-banner.svg",
  "./images/icon.svg",
  "./images/product-1.svg",
  "./images/product-2.svg",
  "./images/product-3.svg",
  "./images/product-4.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL.map((path) => new URL(path, self.registration.scope))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("onlineshop-cache-") && key !== CACHE_NAME,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (
    request.method !== "GET" ||
    requestUrl.origin !== self.location.origin ||
    requestUrl.pathname.includes("/api/")
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const page = requestUrl.pathname.endsWith("/news.html")
          ? "./news.html"
          : "./index.html";
        return (
          (await cache.match(new URL(page, self.registration.scope))) ||
          Response.error()
        );
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request);
    }),
  );
});
