import { useState, useEffect } from 'react'
import { SCREEN_LG, SCREEN_MD } from '~/utils/constants'

/**
 * useScreen - A custom React hook for determining the current screen width
 * and adapting to mobile and tablet breakpoints.
 *
 * @returns {Object} An object representing the current screen state:
 * - `isMobile` (`boolean`): `true` if the screen width is less than `SCREEN_MD`.
 * - `isTablet` (`boolean`): `true` if the screen width is between `SCREEN_MD` and `SCREEN_LG`.
 */
export const useScreen = (): {
  isMobile: boolean
  isTablet: boolean
} => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < SCREEN_MD)
      setIsTablet(SCREEN_MD < width && width < SCREEN_LG)
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

  return { isMobile, isTablet }
}
