const PRE='app-'+self.registration.scope;const C=PRE+'-v1';
const P=new URL(self.location).searchParams.get('p');
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>P?c.add(P):0).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith(PRE)&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r})
  .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||(P?caches.match(P):undefined))))});
