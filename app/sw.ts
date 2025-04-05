import { defaultCache } from '@serwist/next/worker'
import {
  ExpirationPlugin,
  NetworkFirst,
  type PrecacheEntry,
  type SerwistGlobalConfig
} from 'serwist'
import { Serwist } from 'serwist'

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const serwist = new Serwist({
  // eslint-disable-next-line no-underscore-dangle
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ url: { pathname } }) =>
        pathname.startsWith('/api/posts') ||
        pathname.startsWith('/api/categories'),
      handler: new NetworkFirst({
        cacheName: 'api-dynamic-cache',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 5,
            maxAgeSeconds: 60 * 60 // 1 hour
          })
        ]
      })
    },
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) =>
        request.headers.get('RSC') === '1' &&
        request.headers.get('Next-Router-Prefetch') === '1' &&
        sameOrigin &&
        !pathname.startsWith('/api/'),
      handler: new NetworkFirst({
        cacheName: 'rsc-prefetch',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
          })
        ]
      })
    },
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) =>
        request.headers.get('RSC') === '1' &&
        sameOrigin &&
        !pathname.startsWith('/api/'),
      handler: new NetworkFirst({
        cacheName: 'rsc',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
          })
        ]
      })
    },
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) =>
        request.headers.get('Content-Type')?.includes('text/html') &&
        sameOrigin &&
        !pathname.startsWith('/api/'),
      handler: new NetworkFirst({
        cacheName: 'html',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
          })
        ]
      })
    }
  ],
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document'
        }
      }
    ]
  },
  disableDevLogs: true
})

const urlsToPrecache = [
  '/api/posts?limit=9&offset=0',
  '/api/categories?limit=12&offset=0'
]

self.addEventListener('install', (event) => {
  const requestPromises = Promise.all(
    urlsToPrecache.map((entry) => {
      return serwist.handleRequest({ request: new Request(entry), event })
    })
  )
  event.waitUntil(requestPromises)
})

serwist.addEventListeners()
