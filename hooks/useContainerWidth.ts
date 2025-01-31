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

    const updateSize = () => {
      const width = containerRef?.current?.offsetWidth

      if (width) setIsContainerBelowMobile(width < 768)
      if (width) setIsContainerAtOrBelowMobile(width <= 768)
      if (width) setIsContainerMedium(width >= 896)
    }

    const observer = new ResizeObserver(() => {
      updateSize()
    })

    observer.observe(containerRef?.current)

    updateSize()

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect()
    }
  }, [containerRef])

  return {
    isContainerAtOrBelowMobile,
    isContainerBelowMobile,
    isContainerMedium
  }
}
