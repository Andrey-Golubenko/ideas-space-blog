// Main file service-worker.js

// Importing the cache version file that is generated during the build
try {
  importScripts('/cache-version.js')
} catch (error) {
  console.warn('Failed to load cache version, using fallback')
  self.__CACHE_VERSION = 'v1'
}

/***
 * Importing service worker modules
 * IMPORTANT: the order of import matters because of the dependencies between the modules
 * */
importScripts(
  '/sw-modules/cache-config.js', // Cache configuration (must be the first one)
  '/sw-modules/helper-functions.js', // Helper functions
  '/sw-modules/maintenance.js', // Cache maintenance functions
  '/sw-modules/cache-strategies.js' // Caching Strategies
)

// Service worker event handlers
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const staticCache = await caches.open(CACHE_NAMES.static)

        // Cache files one at a time to determine which files could not be cached
        for (const path of STATIC_PATHS) {
          try {
            await staticCache.add(path)
            console.log(`[Service Worker] Successfully cached: ${path}`)
          } catch (error) {
            console.warn(
              `[Service Worker] Failed to cache: ${path}`,
              error
            )
          }
        }

        // Force activation of service worker immediately
        await self.skipWaiting()

        console.log('[Service Worker] Static resources caching completed')
      } catch (error) {
        console.error(
          '[Service Worker] Error when caching static resources:',
          error
        )
      }
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        // Taking control of all clients
        await self.clients.claim()

        // Get all existing caches
        const cacheNames = await caches.keys()

        // Deleting old versions of caches
        await Promise.all(
          cacheNames.map(async (cacheName) => {
            const isOldStaticCache =
              cacheName.startsWith('static-cache-') &&
              cacheName !== CACHE_NAMES.static
            const isOldDynamicCache =
              cacheName.startsWith('dynamic-cache-') &&
              cacheName !== CACHE_NAMES.dynamic
            const isOldApiCache =
              cacheName.startsWith('api-cache-') &&
              cacheName !== CACHE_NAMES.api

            if (isOldStaticCache || isOldDynamicCache || isOldApiCache) {
              await caches.delete(cacheName)
              console.log(
                `[Service Worker] Deleted old cache: ${cacheName}`
              )
            }
          })
        )

        console.log(
          '[Service Worker] Service Worker activated and controlling all clients'
        )

        // Initializing new caches
        await periodicStaticCacheUpdate()

        // Setting the update intervals
        setInterval(periodicStaticCacheUpdate, CACHE_UPDATE_INTERVAL)
        setInterval(
          () => cleanupCache(CACHE_NAMES.dynamic, CACHE_LIMITS.dynamic),
          CACHE_UPDATE_INTERVAL
        )

        console.log('[Service Worker] Cache update intervals set')
      } catch (error) {
        console.error('[Service Worker] Error during activation:', error)
      }
    })()
  )
})

// Request processing
self.addEventListener('fetch', (event) => {
  event.respondWith(handleFetch(event))
})
