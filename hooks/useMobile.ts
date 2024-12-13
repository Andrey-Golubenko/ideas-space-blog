import { useState, useEffect } from 'react'

export const useIsMobile = (): {
  isMobile: boolean
  isSmallScreen: boolean
} => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 860)
      setIsSmallScreen(width < 854)
    }

    // Checking the screen width at the first render
    handleResize()

    // Adding a listener for the window resizing event
    window.addEventListener('resize', handleResize)

    // Removing the listener when unmounting the component
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { isMobile, isSmallScreen }
}
