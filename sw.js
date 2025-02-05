//Install
self.addEventListener('install',event => {
    console.log('Service Worker Installed');
    event.waitUntil(
        caches.open('mi-cache-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/Oferta educativa.html',
                '/plan.html',
                '/Contactanos.html',
                '/Ubicacion.html',
                '/estilos.css',
                '/ofertaE.css',
                '/plan.css',
                '/manifest.json',
                '/imagenes/1.jpg',
                '/imagenes/2.jpg',
                '/imagenes/3.jpg',
                '/imagenes/4.jpg',
                '/imagenes/5.jpg',
                '/imagenes/actitud.jpg',
                '/imagenes/beca.jpg',
                '/imagenes/benemerita.png',
                '/imagenes/conocimiento.png',
                '/imagenes/escudo.png',
                '/imagenes/escuelasuperior.png',
                '/imagenes/graduacion.png',
                '/imagenes/icon.png',
                '/imagenes/icono1.png',
                '/imagenes/icono2.png',
                '/imagenes/inicio_cap.png',
                '/imagenes/itson.png',
                '/imagenes/logo_unam.png',
                '/imagenes/mujer-removebg-preview.png',
                '/imagenes/multitalentoso.png',
                '/imagenes/papeleria.png',
                '/imagenes/par_students-removebg-preview.png',
                '/imagenes/plan_cap.png',
                '/imagenes/planeta-tierra.png',
                '/imagenes/profesional.png',
                '/imagenes/public-service.png',
                '/imagenes/Software.png',
                '/imagenes/tla.png',
                '/imagenes/unam.png'
            ]);
        })
    );
});

//active
self.addEventListener('activate', event => {
    console.log('Service Worker: Activado');
    const cacheWhilelist = ['mi-cache-v1'];
    event.wailUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhilelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
})

//fetch
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetch', event.resquest.url);
    event.respondWith(
        caches.match(event.resquest)
        .then(response => {
            return response || fetch(event.resquest);
        }).catch(() => caches.match('/offline.html'))
    );
});