// public/service-worker.js

try {
  importScripts('/cache-version.js')
} catch (error) {
  console.warn('Failed to load cache version, using fallback')
  self.__CACHE_VERSION = 'v1'
}

// Static paths
const STATIC_PATHS = Object.values({
  content: ['/blog/new-post'],
  admin: [
    '/admin/admin-posts/new-post',
    '/admin/admin-categories/new-category'
  ],
  legal: ['/impressum', '/privacy-policy'],
  auth: [
    '/auth',
    '/auth/register',
    '/auth/reset-password',
    '/auth/new-password',
    '/auth/error'
  ],
  pwaAssets: [
    '/icons/manifest-icon-192.maskable.png',
    '/icons/manifest-icon-512.maskable.png',
    '/icons/manifest-icon-192.png',
    '/icons/manifest-icon-512.png'
  ],
  fallbacks: ['/images/image-placeholder.svg']
}).flat()

// Paths that are updated frequently
const DYNAMIC_PATHS_PREFIXES = Object.values({
  main: ['/'],
  content: ['/blog', '/categories'],
  user: ['/profile', '/settings'],
  admin: ['/admin'],
  system: ['/not-found', '/error'],
  auth: ['/api/auth', '/auth/email-verification']
}).flat()

// API endpoints
const API_ENDPOINTS = [
  '/api/posts',
  '/api/categories',
  '/api/truncated-categories'
]

// Static resources (CSS, JS, images, etc.)
const STATIC_RESOURCES_EXTENSIONS = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.svg',
  '.ico',
  '.woff',
  '.woff2'
]

// Using the cache version from the imported file
const CACHE_VERSION = self.__CACHE_VERSION || 'v1'

// Cache names with versions
const CACHE_NAMES = {
  static: `static-cache-${CACHE_VERSION}`,
  dynamic: `dynamic-cache-${CACHE_VERSION}`,
  api: `api-cache-${CACHE_VERSION}`
}

// The constant for the cache update interval (12 hours)
const CACHE_UPDATE_INTERVAL = 12 * 60 * 60 * 1000

// Constants for cache constraints
const CACHE_LIMITS = {
  images: {
    maxEntries: 50,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  },
  static: {
    maxEntries: 100,
    maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
  },
  dynamic: {
    maxEntries: 30,
    maxAgeSeconds: 24 * 60 * 60 // 1 day
  }
}

// Installing service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const staticCache = await caches.open(CACHE_NAMES.static)

        // Cache files one by one to identify which files fail
        for (const path of STATIC_PATHS) {
          try {
            await staticCache.add(path)
            console.log(`Successfully cached: ${path}`)
          } catch (error) {
            console.warn(`Failed to cache: ${path}`, error)
          }
        }

        // Force service worker to activate immediately
        await self.skipWaiting()

        console.log('Static resources caching completed')
      } catch (error) {
        console.error('Error when caching static resources:', error)
      }
    })()
  )
})

// Service worker activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        await self.clients.claim()

        // We get all the existing caches
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
              console.log(`Deleted old cache: ${cacheName}`)
            }
          })
        )

        console.log('Service Worker activated and controlling all clients')

        // Initializing new caches
        await periodicStaticCacheUpdate()

        // Setting the update intervals
        setInterval(periodicStaticCacheUpdate, CACHE_UPDATE_INTERVAL)
        setInterval(
          () => cleanupCache(CACHE_NAMES.dynamic, CACHE_LIMITS.dynamic),
          CACHE_UPDATE_INTERVAL
        )

        console.log('Cache update intervals set')
      } catch (error) {
        console.error('Error during activation:', error)
      }
    })()
  )
})

// Request processing
self.addEventListener('fetch', (event) => {
  event.respondWith(handleFetch(event))
})

/**
 * Processing requests with different caching strategies
 */
async function handleFetch(event) {
  const url = new URL(event.request.url)

  try {
    // Checking whether the request is navigational
    if (event.request.mode === 'navigate') {
      try {
        // Trying to get a response from the network
        const networkResponse = await fetch(event.request)

        // For 404 or successful responses, we return as is
        if (networkResponse.ok || networkResponse.status === 404) {
          return networkResponse
        }

        // For other errors, we try the cache
        const cache = await caches.open(CACHE_NAMES.static)
        const cachedResponse = await cache.match(event.request)

        if (cachedResponse) {
          return cachedResponse
        }

        // If not in the cache, we return a network error
        return networkResponse
      } catch (error) {
        console.error('Navigation fetch failed:', error)

        // Trying to get it from the cache in case of a network error
        const cache = await caches.open(CACHE_NAMES.static)
        const cachedResponse =
          (await cache.match(event.request)) ||
          (await cache.match('/not-found'))

        if (cachedResponse) {
          return cachedResponse
        }

        return Response.error()
      }
    }

    // Checking whether the request is a GET request
    if (event.request.method !== 'GET') {
      return fetch(event.request)
    }

    try {
      // For navigation queries
      if (event.request.mode === 'navigate') {
        try {
          // Trying to get data from the network
          const response = await fetch(event.request)
          if (response.ok) return response
        } catch (error) {
          console.log('Navigation fetch failed:', error)
        }

        // If the network is unavailable, we try to get data from the cache.
        const cache = await caches.open(CACHE_NAMES.static)
        const cachedResponse = await cache.match(event.request)

        if (cachedResponse) {
          // Returning the cached version of the page
          return cachedResponse
        }

        // If the page is not found in the cache, we return a network error.
        // Component 'OfflineNotification' - displays the notification
        return Response.error()
      }
      // Checking whether the request is an API request
      if (
        API_ENDPOINTS.some((endpoint) => url.pathname.includes(endpoint))
      ) {
        return await handleStaleWhileRevalidate(event.request)
      }

      // Defining the type of resource for choosing a caching strategy
      if (isStaticResource(url.pathname)) {
        return await handleCacheFirst(event.request)
      }

      if (isDynamicContent(url.pathname)) {
        return await handleNetworkFirst(event.request)
      }

      return await handleNetworkFirst(event.request)
    } catch (error) {
      console.error('Error in fetch handler:', error)
      return Response.error()
    }
  } catch (error) {
    console.error('Error in fetch handler:', error)
    return Response.error()
  }
}

/**
 * Cache First strategy - first we check the cache, then the network
 */
async function handleCacheFirst(request) {
  const cache = await caches.open(CACHE_NAMES.static)

  // Defining the resource type
  const isImage =
    request.destination === 'image' ||
    request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)

  const limits = isImage ? CACHE_LIMITS.images : CACHE_LIMITS.static

  try {
    // Check and clean the cache before adding new entries
    await cleanupCache(CACHE_NAMES.static, limits)

    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse && networkResponse.status === 200) {
      const clonedResponse = networkResponse.clone()
      await cache.put(request, clonedResponse)
    }

    return networkResponse
  } catch (error) {
    if (isImage) {
      return await cache.match('/images/image-placeholder.svg')
    }
    throw error
  }
}

/**
 * Network First strategy - first we try to get from the network, then from the cache
 */
async function handleNetworkFirst(request) {
  const cache = await caches.open(CACHE_NAMES.dynamic)

  try {
    // Checking and clearing the cache
    await cleanupCache(CACHE_NAMES.dynamic, CACHE_LIMITS.dynamic)

    const networkResponse = await fetch(request)
    if (networkResponse && networkResponse.status === 200) {
      const clonedResponse = networkResponse.clone()
      await cache.put(request, clonedResponse)
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

/**
 * The Stale While Revalidate strategy is to return the cache and update it
 */
async function handleStaleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAMES.api)

  // Getting a cached response
  const cachedResponse = await cache.match(request)

  // Running a request to the network regardless of whether there is a cached response
  const fetchPromise = fetch(request)
    .then(async (networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        // Updating the cache with fresh data
        const clonedResponse = networkResponse.clone()
        await cache.put(request, clonedResponse)
      }
      return networkResponse
    })
    .catch((error) => {
      console.error("Couldn't get data from the network:", error)
      // We don't throw an error, as we return a cached response anyway
    })

  // Returning a cached response or waiting for a network response if there is no cache
  return cachedResponse || fetchPromise
}

/**
 * Checks whether the resource is static.
 */
function isStaticResource(pathname) {
  return (
    STATIC_RESOURCES_EXTENSIONS.some((ext) => pathname.endsWith(ext)) ||
    STATIC_PATHS.includes(pathname)
  )
}

/**
 * Checks whether the content is dynamic
 */
function isDynamicContent(pathname) {
  return DYNAMIC_PATHS_PREFIXES.some(
    (prefix) =>
      pathname === prefix ||
      pathname === `${prefix}/` ||
      pathname.startsWith(`${prefix}/`)
  )
}

// A function for periodically updating the static cache
async function periodicStaticCacheUpdate() {
  try {
    const cache = await caches.open(CACHE_NAMES.static)
    console.log('Starting periodic update of static cache...')

    for (const path of STATIC_PATHS) {
      try {
        await cache.add(path)
        console.log(`Updated cache for: ${path}`)
      } catch (error) {
        console.warn(`Failed to update cache for: ${path}`, error)
      }
    }

    console.log('Static cache update completed')
  } catch (error) {
    console.error('Error during static cache update:', error)
  }
}

// A function for checking and clearing the cache
async function cleanupCache(cacheName, limits) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  const now = Date.now()

  try {
    // Clearing by number of records
    if (keys.length > limits.maxEntries) {
      console.log(
        `Cache ${cacheName} exceeded entry limit. Cleaning up...`
      )
      const deleteCount = keys.length - limits.maxEntries
      const keysToDelete = keys.slice(0, deleteCount)

      await Promise.all(keysToDelete.map((key) => cache.delete(key)))
    }

    // Clearing by age of records
    await Promise.all(
      keys.map(async (request) => {
        const response = await cache.match(request)

        if (!response) return

        const dateHeader = response.headers.get('date')

        if (dateHeader) {
          const cacheDate = new Date(dateHeader).getTime()
          const age = now - cacheDate

          if (age > limits.maxAgeSeconds * 1000) {
            await cache.delete(request)
            console.log(`Removed expired cache entry: ${request.url}`)
          }
        }
      })
    )

    console.log(`Cache cleanup completed for ${cacheName}`)
  } catch (error) {
    console.error(`Error during cache cleanup for ${cacheName}:`, error)
  }
}
