/***
 * The Cache Maintenance Functions module
 * Contains functions for periodically updating and clearing the cache
 * */

/**
 * A function for periodically updating the static cache
 * @returns {Promise<void>}
 */
async function periodicStaticCacheUpdate() {
  try {
    const cache = await caches.open(CACHE_NAMES.static)
    logCacheInfo('Starting periodic update of static cache...')

    for (const path of STATIC_PATHS) {
      try {
        await cache.add(path)
        logCacheInfo(`Updated cache for: ${path}`)
      } catch (error) {
        logCacheInfo(`Failed to update cache for: ${path}`, 'warn')
      }
    }

    logCacheInfo('Static cache update completed')
  } catch (error) {
    logCacheInfo(`Error during static cache update: ${error}`, 'error')
  }
}

/**
 * A function for checking and clearing the cache
 * @param {string} cacheName - Cache Name
 * @param {Object} limits - Cache Limitations
 * @returns {Promise<void>}
 */
async function cleanupCache(cacheName, limits) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  const now = Date.now()

  try {
    // Clearing by number of records
    if (keys.length > limits.maxEntries) {
      logCacheInfo(
        `Cache ${cacheName} exceeded entry limit. Cleaning up...`
      )
      const deleteCount = keys.length - limits.maxEntries
      const keysToDelete = keys.slice(0, deleteCount)

      await Promise.all(keysToDelete.map((key) => cache.delete(key)))
    }

    // Clearing records by age
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
            logCacheInfo(`Removed expired cache entry: ${request.url}`)
          }
        }
      })
    )

    logCacheInfo(`Cache cleanup completed for ${cacheName}`)
  } catch (error) {
    logCacheInfo(
      `Error during cache cleanup for ${cacheName}: ${error}`,
      'error'
    )
  }
}
