/**
 * The auxiliary functions module
 * Contains utility functions for service worker
 * */

/**
 * Checks whether the resource is static
 * @param {string} pathname - The path to the resource
 * @returns {boolean} - true, if the resource is static
 */
function isStaticResource(pathname) {
  return (
    STATIC_RESOURCES_EXTENSIONS.some((ext) => pathname.endsWith(ext)) ||
    STATIC_PATHS.includes(pathname)
  )
}

/**
 * Checks whether the content is dynamic
 * @param {string} pathname - The path to the resource
 * @returns {boolean} - true, if the content is dynamic
 */
function isDynamicContent(pathname) {
  return DYNAMIC_PATHS_PREFIXES.some(
    (prefix) =>
      pathname === prefix ||
      pathname === `${prefix}/` ||
      pathname.startsWith(`${prefix}/`)
  )
}

/**
 * Checks whether the request is an API request
 * @param {string} pathname - The path to the resource
 * @returns {boolean value} - true, if it is associated with the API
 */
function isApiRequest(pathname) {
  return API_ENDPOINTS.some((endpoint) => pathname.includes(endpoint))
}

/**
 *  Logs information about the cache
 * @param {string} message - A logging message
 * @param {string} [level='log'] - Logging level (log, warn, error)
 */
function logCacheInfo(message, level = 'log') {
  const prefix = `[SW:${CACHE_VERSION}]`

  switch (level) {
    case 'warn':
      console.warn(`${prefix} ${message}`)
      break
    case 'error':
      console.error(`${prefix} ${message}`)
      break
    default:
      console.log(`${prefix} ${message}`)
  }
}
