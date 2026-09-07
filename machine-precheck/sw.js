const CACHE='machine-precheck-prototype-v18';
const SHELL=['./index.html','./app.css?v=16','./demo.css?v=18','./app.js?v=18','./demo.js?v=18','./manifest.webmanifest','./v8-sprite-60f.webp?v=16'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('machine-precheck-prototype-')&&k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));return;}event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));});
