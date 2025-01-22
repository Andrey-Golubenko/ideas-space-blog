import { useEffect, useState, type MutableRefObject } from 'react'

/**
 * useOnScreen - A React hook to detect if an element is currently visible in the viewport.
 *
 * This hook uses the Intersection Observer API to track when an element enters or leaves
 * the viewport and updates its state accordingly.
 *
 * @template T - The type of the element being observed (extends `Element`).
 * @param {MutableRefObject<T | null>} containerRef - A `ref` object pointing to the DOM element to be observed.
 * @param {string} [rootMargin='0px'] - An optional margin around the root, similar to the `rootMargin` option
 * for the Intersection Observer API. Accepts values like `'-50px 0px'` or `'10%'`.
 *
 * @returns {boolean} - `true` if the element is currently visible in the viewport, otherwise `false`.
 *
 * @example
 * import { useRef } from 'react';
 * import { useOnScreen } from '~/hooks/useOnScreen';
 *
 * const MyComponent = () => {
 *   const ref = useRef<HTMLDivElement | null>(null);
 *   const isVisible = useOnScreen(ref, '-50px');
 *
 *   return (
 *     <div>
 *       <div style={{ height: '100vh' }}>Scroll down to see the box</div>
 *       <div
 *         ref={ref}
 *         style={{ height: 200, backgroundColor: isVisible ? 'green' : 'red' }}
 *       >
 *         {isVisible ? 'I am on screen!' : 'I am off screen!'}
 *       </div>
 *     </div>
 *   );
 * };
 */
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
