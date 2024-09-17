import { useState, useEffect } from 'react'

import { SCREEN_MD, SCREEN_SM } from '~/utils/constants/constants'

export const useTablet = (): boolean => {
  const [isTablet, setIsTablet] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= SCREEN_SM && width <= SCREEN_MD) {
        setIsTablet(true)
      } else {
        setIsTablet(false)
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

  return isTablet
}
