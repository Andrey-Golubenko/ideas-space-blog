import { useState, useEffect, type RefObject } from 'react'

/**
 * useContainerWidth - A custom hook to determine the width of a container and classify it into predefined size categories.
 *
 * @param {RefObject<HTMLElement>} [containerRef] - A React reference to the container element whose width is being observed.
 *
 * @returns {Object} An object containing:
 * - `isContainerAtOrBelowMobile` (`boolean`): Indicates whether the container's width is 768px or less.
 * - `isContainerBelowMobile` (`boolean`): Indicates whether the container's width is less that 768px.
 * - `isContainerMedium` (`boolean`): Indicates whether the container's width is 896px or more.
 *
 * This hook uses a `ResizeObserver` to monitor changes to the container's width and updates the state accordingly. It cleans up the observer on unmount.
 */
export const useContainerWidth = (
  containerRef?: RefObject<HTMLElement>
): {
  isContainerAtOrBelowMobile: boolean
  isContainerBelowMobile: boolean
  isContainerMedium: boolean
} => {
  const [isContainerBelowMobile, setIsContainerBelowMobile] =
    useState<boolean>(false)

  const [isContainerAtOrBelowMobile, setIsContainerAtOrBelowMobile] =
    useState<boolean>(false)

  const [isContainerMedium, setIsContainerMedium] =
    useState<boolean>(false)

  useEffect(() => {
    if (!containerRef?.current) return

    let timeoutId: NodeJS.Timeout | null = null

    const updateSize = () => {
      if (!containerRef?.current) return
      const width = containerRef.current.offsetWidth

      setIsContainerBelowMobile((prev) => {
        return prev !== width < 768 ? width < 768 : prev
      })
      setIsContainerAtOrBelowMobile((prev) => {
        return prev !== width <= 768 ? width <= 768 : prev
      })
      setIsContainerMedium((prev) => {
        return prev !== width >= 896 ? width >= 896 : prev
      })
    }

    const observer = new ResizeObserver(() => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(updateSize, 100)
    })

    observer.observe(containerRef.current)
    updateSize()

    // eslint-disable-next-line consistent-return
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [containerRef])

  return {
    isContainerAtOrBelowMobile,
    isContainerBelowMobile,
    isContainerMedium
  }
}
