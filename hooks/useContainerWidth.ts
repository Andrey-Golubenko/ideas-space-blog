import { useState, useEffect, type RefObject } from 'react'

export const useContainerWidth = (
  containerRef?: RefObject<HTMLElement>
) => {
  const [isMediumWidth, setIsMediumWidth] = useState<boolean>(false)

  useEffect(() => {
    if (!containerRef?.current) return

    const updateSize = () => {
      const { offsetWidth: width } = containerRef.current!

      setIsMediumWidth(width < 768)
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

  return { isMediumWidth }
}
