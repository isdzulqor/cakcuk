!function(){"use strict";const e=["/client/client.436c3023.js","/client/inject_styles.5607aec6.js","/client/index.1af9b0d7.js"].concat(["/service-worker-index.html","/css/grids-responsive-min.css","/css/menus-core-min.css","/css/menus-min.css","/css/pure-min.css","/favicon.ico","/global.css","/images/cakcuk_logo.svg","/images/github.svg","/images/twitter.svg"]),s=new Set(e);self.addEventListener("install",s=>{s.waitUntil(caches.open("cache1616733298841").then(s=>s.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const s of e)"cache1616733298841"!==s&&await caches.delete(s);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const t=new URL(e.request.url);t.protocol.startsWith("http")&&(t.hostname===self.location.hostname&&t.port!==self.location.port||(t.host===self.location.host&&s.has(t.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1616733298841").then(async s=>{try{const t=await fetch(e.request);return s.put(e.request,t.clone()),t}catch(t){const c=await s.match(e.request);if(c)return c;throw t}}))))})}();
