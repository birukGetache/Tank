this.addEventListener("install", (event) => {
    const cacheName = "appV1";
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                '/',                 // Base route
                '/favicon.ico',      // Favicon
                '/create',           // Create page
                '/settings',         // Settings page          // Cache main chunk
                '/_next/static/development/_buildManifest.js', // Cache build manifest
                '/_next/static/development/_ssgManifest.js',  // Cache SSG manifest
                '/styles/globals.css'
            ]);
        })
    );
});


this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            if (resp) {
                return resp;
            } else {
                // Fallback to network request
                return fetch(event.request).catch(() => {
                    // Return a default response (e.g., a message indicating offline)
                    return new Response('Offline', { status: 404 });
                });
            }
        })
    );
});

