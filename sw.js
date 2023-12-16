// Choose a cache name
const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v1";

// List the files to precache
const assets = [
  "/index.html",
  "/manifest.json",
  "/sw.js",
  "/src/css/main.css",
  "/src/css/reset.css",
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
  "/src/images/frog.svg",
  "/src/images/lilypad.svg",
  "/src/images/noun-link.svg",
  "/src/js/contentLang.js",
  "/src/js/displayPadding.js",
  "/src/js/positionInset.js",
  "/src/js/pwa.js",
  "/src/js/scrollAnim.js",
];


// install event
self.addEventListener("install", (evt) => {
    console.log("service worker installed");
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log("caching shell assets");
        cache.addAll(assets);
      })
    );
  });
  
  // activate event
  self.addEventListener("activate", (evt) => {
    console.log("service worker activated");
    evt.waitUntil(
      caches.keys().then((keys) => {
        //console.log(keys);
        return Promise.all(
          keys
            .filter((key) => key !== staticCacheName)
            .map((key) => caches.delete(key))
        );
      })
    );
  });
  
  // fetch event
  self.addEventListener("fetch", (evt) => {
    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http.
    if (!(evt.request.url.indexOf("http") === 0)) return; // skip the request. if request is not made with http protocol
  
    evt.respondWith(
      caches
        .match(evt.request)
        .then(
          (cacheRes) =>
            cacheRes ||
            fetch(evt.request).then((fetchRes) =>
              caches.open(dynamicCacheName).then((cache) => {
                cache.put(evt.request.url, fetchRes.clone());
                // check cached items size
                limitCacheSize(dynamicCacheName, 75);
                return fetchRes;
              })
            )
        )
        .catch(() => caches.match("/fallback.html"))
    );
  });
  
  // cache size limit function
  const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
      cache.keys().then((keys) => {
        if (keys.length > size) {
          cache.delete(keys[0]).then(limitCacheSize(name, size));
        }
      });
    });
  };

// sw.js
/* 
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
  }) */