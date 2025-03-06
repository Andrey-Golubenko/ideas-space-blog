import { useState, useEffect, useCallback } from 'react'

const useNetwork = (): { isOffline: boolean; onClose: () => void } => {
  const [isOffline, setNetworkStatus] = useState(false)

  const onClose = useCallback(() => {
    setNetworkStatus(false)
  }, [setNetworkStatus])

  const handleNetworkChange = useCallback(() => {
    if (!navigator.onLine) {
      setNetworkStatus(true)
    } else {
      setNetworkStatus(false)
    }
  }, [])

  useEffect(() => {
    handleNetworkChange()
    window.addEventListener('offline', handleNetworkChange)
    window.addEventListener('online', handleNetworkChange)

    return (): void => {
      window.removeEventListener('offline', handleNetworkChange)
      window.removeEventListener('online', handleNetworkChange)
    }
  }, [handleNetworkChange])

  return { isOffline, onClose }
}

export default useNetwork
