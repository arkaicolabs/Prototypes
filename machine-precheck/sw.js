const CACHE='machine-precheck-prototype-v15';
const SHELL=['./index.html','./app.css?v=15','./app.js?v=15','./manifest.webmanifest','./v8-sprite-60f.webp?v=15'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).catch(()=>{}));});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',event=>{if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));return;}event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));});