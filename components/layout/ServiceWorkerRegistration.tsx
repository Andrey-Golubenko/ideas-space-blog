'use client'

import { useEffect } from 'react'

function ServiceWorkerRegistration() {
  useEffect(() => {
    const registerSW = async () => {
      try {
        if ('serviceWorker' in navigator) {
          if (!navigator.onLine) {
            console.log('Browser is offline, skipping SW registration')
            return
          }

          const registrations =
            await navigator.serviceWorker.getRegistrations()

          const activeServiceWorker = registrations.find(
            (registration) => registration.active
          )

          if (activeServiceWorker && !navigator.onLine) {
            console.log(
              'Active SW exists and browser is offline, skipping registration'
            )
            return
          }

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
            'ServiceWorker registration successful with scope:',
            registration.scope
          )
        }
      } catch (error) {
        console.error('ServiceWorker registration failed:', error)
      }
    }

    registerSW()

    const handleOnline = () => {
      console.log('Browser is online, re-registering SW')
      registerSW()
    }

    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  return null
}

export default ServiceWorkerRegistration
