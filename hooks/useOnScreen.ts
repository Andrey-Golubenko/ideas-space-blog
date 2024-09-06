import { useEffect, useState, type MutableRefObject } from 'react'

export const useOnScreen = <T extends Element>(
  containerRef: MutableRefObject<T | null>,
  rootMargin: string = '0px'
): boolean => {
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIsOnScreen(entry.isIntersecting)
      },
      { rootMargin }
    )

    const currentRef = containerRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      observer.unobserve(currentRef as Element)
    }
  }, [])

  return isOnScreen
}
