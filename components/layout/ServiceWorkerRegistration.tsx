'use client'

import { useEffect } from 'react'

function ServiceWorkerRegistration() {
  useEffect(() => {
    const registerSW = async () => {
      try {
        if ('serviceWorker' in navigator) {
          console.log(
            '[Service Worker] ServiceWorker registration starting...'
          )

          // Unregister any existing service workers first
          const registrations =
            await navigator.serviceWorker.getRegistrations()
          await Promise.all(
            Array.from(registrations).map((registration) =>
              registration.unregister()
            )
          )

          const registration = await navigator.serviceWorker.register(
            '/service-worker.js',
            {
              scope: '/'
            }
          )

          console.log(
            '[Service Worker] ServiceWorker registration successful with scope:',
            registration.scope
          )
        } else {
          console.log('[Service Worker] Service workers are not supported')
        }
      } catch (error) {
        console.error(
          '[Service Worker] ServiceWorker registration failed:',
          error
        )
      }
    }

    registerSW()
  }, [])

  return null
}

export default ServiceWorkerRegistration
