import { useEffect } from 'react'

type CleaningFunction = (obj: Record<never, never>) => void

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
