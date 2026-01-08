// Service Worker for Progressive Web App
// Shared template - customize for your app
//
// DEV vs PROD Behavior:
// - DEV (localhost): No caching, always network-first for fresh content during development
// - PROD: Full caching strategy with offline support
//
// To force unregister in dev console:
//   navigator.serviceWorker.getRegistrations().then(r => r.forEach(reg => reg.unregister()))
//   Then hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

// Detect development mode - service worker runs on localhost or has ?dev query param
const isDevelopment = self.location.hostname === "localhost" ||
                       self.location.hostname === "127.0.0.1" ||
                       self.location.search.includes("dev=true");

// Customize cache name for your app
const CACHE_NAME = isDevelopment ? "app-dev-v1" : "app-v1";
const OFFLINE_URL = "/offline.html";

// Assets to cache on install (only in production)
// Customize this list for your app's critical assets
const PRECACHE_ASSETS = isDevelopment ? [] : [
  "/",
  "/offline.html",
  "/manifest.webmanifest",
  "/icons/android/android-launchericon-192-192.png",
  "/icons/android/android-launchericon-512-512.png",
];

// Install event - precache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_ASSETS);
      // Force the waiting service worker to become the active service worker
      await self.skipWaiting();
    })(),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Enable navigation preload if available
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }

      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );

      // Claim clients to ensure the service worker takes control immediately
      await self.clients.claim();
    })(),
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // Try to use navigation preload if available
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Network first for navigation
          const networkResponse = await fetch(request);

          // Cache successful navigation responses (only in production)
          if (!isDevelopment && networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }

          return networkResponse;
        } catch (error) {
          // Network failed, try cache (skip in development)
          if (!isDevelopment) {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
              return cachedResponse;
            }
          }

          // Return offline page as fallback
          return caches.match(OFFLINE_URL);
        }
      })(),
    );
    return;
  }

  // Handle dynamic content routes - customize these patterns for your app
  // Example: if (url.pathname.startsWith("/newsletter/")) { ... }
  
  // Handle images - Cache first with network fallback
  if (
    request.destination === "image" ||
    /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // Return placeholder or fail gracefully
          return new Response("Image not available", { status: 404 });
        }
      })(),
    );
    return;
  }

  // Handle static assets (JS, CSS) - Cache first with network fallback (only in production)
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    /\.(js|css)$/i.test(url.pathname)
  ) {
    // In development, always use network
    if (isDevelopment) {
      event.respondWith(fetch(request));
      return;
    }

    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          return new Response("Asset not available", { status: 404 });
        }
      })(),
    );
    return;
  }

  // Handle API requests - Network only (no caching for dynamic data)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch (error) {
          return new Response(JSON.stringify({ error: "Network error" }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
          });
        }
      })(),
    );
    return;
  }

  // Default: Network first with cache fallback (only in production)
  // In development, always use network
  if (isDevelopment) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        const cachedResponse = await caches.match(request);
        return cachedResponse || new Response("Resource not available", { status: 404 });
      }
    })(),
  );
});

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
