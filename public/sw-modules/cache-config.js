/**
 * The cache configuration module
 * Contains all the constants and configurations for caching
 * */

/**
 * Using the cache version from the imported file cache-version.js
 * This version is generated automatically when building in next.config.js
 * */
const CACHE_VERSION = self.__CACHE_VERSION || 'v1'

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
  '.eot',
  '.ttf',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.avif',
  '.webp',
  '.svg',
  '.ico',
  '.woff',
  '.woff2'
]

// Names of version caches
const CACHE_NAMES = {
  static: `static-cache-${CACHE_VERSION}`,
  dynamic: `dynamic-cache-${CACHE_VERSION}`,
  api: `api-cache-${CACHE_VERSION}`
}

// Constant for the cache update interval (12 hours)
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
