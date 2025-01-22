import { useEffect } from 'react'

type CleaningFunction = (obj: Record<never, never>) => void

/**
 * useCleaningItem - A custom hook to execute a cleanup function when the page is about to be unloaded or hidden.
 *
 * @param {CleaningFunction} cleaningFunction - A function that performs cleanup tasks. It takes an empty object as its argument.
 *
 * This hook listens for the `pagehide` and `beforeunload` events on the `window` object and triggers the provided cleanup function during these events.
 * It ensures the event listeners are properly removed when the component is unmounted.
 */
export const useCleaningItem = (cleaningFunction: CleaningFunction) => {
  useEffect(() => {
    const handleCleanup = () => {
      cleaningFunction({})
    }

    window.addEventListener('pagehide', handleCleanup)
    window.addEventListener('beforeunload', handleCleanup)

    return () => {
      window.removeEventListener('pagehide', handleCleanup)
      window.removeEventListener('beforeunload', handleCleanup)
    }
  }, [cleaningFunction])
}
