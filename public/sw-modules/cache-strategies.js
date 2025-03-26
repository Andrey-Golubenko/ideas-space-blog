/**
 * The Caching Strategies module
 * Contains various caching strategies for different types of requests
 * */

/**
 * Processing requests with different caching strategies
 * @param {Fetch Event} event - The fetch event
 * @returns {Promise<Response>} - Response to a request
 */
async function handleFetch(event) {
  const url = new URL(event.request.url)

  try {
    // Checking whether the request is navigational
    if (event.request.mode === 'navigate') {
      try {
        // Trying to get a response from the Network
        const networkResponse = await fetch(event.request)

        // For 404 or successful responses, return it as it is
        if (networkResponse.ok || networkResponse.status === 404) {
          return networkResponse
        }

        // For other errors, we try the cache
        const cache = await caches.open(CACHE_NAMES.static)
        const cachedResponse = await cache.match(event.request)

        if (cachedResponse) {
          return cachedResponse
        }

        // If not in the cache, we return the network response
        return networkResponse
      } catch (error) {
        logCacheInfo(`Navigation fetch failed: ${error}`, 'error')

        // Trying to get from the cache in case of a network error
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

    // Checking whether the request is an API request
    if (isApiRequest(url.pathname)) {
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
    logCacheInfo(`Error in fetch handler: ${error}`, 'error')
    return Response.error()
  }
}

/**
 * Cache First strategy - first check the cache, then the network
 * @param {Request} request - Request
 * @returns {Promise<Response>} - Response to a request
 */
async function handleCacheFirst(request) {
  const cache = await caches.open(CACHE_NAMES.static)

  // Defining the resource type
  const isImage =
    request.destination === 'image' ||
    request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)

  const limits = isImage ? CACHE_LIMITS.images : CACHE_LIMITS.static

  try {
    // Checking and clearing the cache before adding new entries
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
 * Network First strategy - first try to get a data from the network, then from the cache
 * @param {Request} request - Request
 * @returns {Promise<Response>} - Response to a request
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
 * Stale While Revalidate strategy - we return the cache and update it
 * @param {Request} request - Request
 * @returns {Promise<Response>} - Response to a request
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
      logCacheInfo(`Couldn't get data from the network: ${error}`, 'error')
      // We don't throw an error, as we return a cached response anyway
    })

  // Returning a cached response or waiting for a network response if there is no cache
  return cachedResponse || fetchPromise
}
