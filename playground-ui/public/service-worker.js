!function(){"use strict";const e=["client/client.0a856345.js","client/index.3bfc3855.js"].concat(["service-worker-index.html","css/grids-responsive-min.css","css/menus-core-min.css","css/menus-min.css","css/pure-min.css","favicon.ico","global.css","images/github.svg","images/twitter.svg"]),t=new Set(e);self.addEventListener("install",t=>{t.waitUntil(caches.open("cache1593759455474").then(t=>t.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1593759455474"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const s=new URL(e.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&t.has(s.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1593759455474").then(async t=>{try{const s=await fetch(e.request);return t.put(e.request,s.clone()),s}catch(s){const c=await t.match(e.request);if(c)return c;throw s}}))))})}();
