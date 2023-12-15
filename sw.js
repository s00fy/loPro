/* // Choose a cache name
const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v1";

// List the files to precache
const assets = [
  "/index.html",
  "/src/css/main.css",
  "/src/css/reset.css",
  "/src/js/content.js",
  "/src/js/displayPadding.js",
  "/src/js/exemple.js",
  "/src/fonts/Outfit-VariableFont_wght.ttf",
  "/src/fonts/YounxgSerif-Regular.ttf",
  "/src/icons/icon-48x48.png",
  "/src/icons/icon-72x72.png",
  "/src/icons/icon-96x96.png",
  "/src/icons/icon-128x128.png",
  "/src/icons/icon-144x144.png",
  "/src/icons/icon-152x152.png",
  "/src/icons/icon-192x192.png",
  "/src/icons/icon-384x384.png",
  "/src/icons/icon-512x512.png",
];

 */
// sw.js

const cacheFirst = async({request, fallbackUrl}) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    try {
        const responseFromNetwork = await fetch(request);
        const cache = await caches.open("cache");
        await cache.put(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch(error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }
    
     return new Response("Network error", {
      status: 408,
      headers: {"Content-Type": "text/plain"}
     })
     }
    }
    
    self.addEventListener("fetch", (event) => {
     event.respondWith(
     cacheFirst({
      request: event.request,
      fallbackUrl: "fallback.html"
     })
    )
});

self.addEventListener("push", (event) => {
    console.log("push event", event);
    const data = event.data;
    event.waitUntil(self.registration.showNotification("Hello world", data));
  })