import { useState, useEffect } from 'react'

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 860) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    // Checking the screen width at the first render
    handleResize()

    // Adding a listener for the window resizing event
    window.addEventListener('resize', handleResize)

    // Removing the listener when unmounting the component
    return () => {
      return window.removeEventListener('resize', handleResize)
    }
  }, [])

  return !!isMobile
}
