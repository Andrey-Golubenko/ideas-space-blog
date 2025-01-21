import { useState, useEffect } from 'react'
import { SCREEN_LG, SCREEN_MD } from '~/utils/constants'

export const useIsMobile = (): {
  isMobile: boolean
  isSmallScreen: boolean
  isTablet: boolean
} => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      // setIsMobile(width < 860)
      setIsMobile(width < SCREEN_MD)
      setIsTablet(SCREEN_MD < width && width < SCREEN_LG)
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

  return { isMobile, isSmallScreen, isTablet }
}
