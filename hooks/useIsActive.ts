import { usePathname } from 'next/navigation'

import { PATHS } from '~/utils/constants'

/**
 * useIsActive - A custom hook to determine if a given path is active based on the current pathname.
 *
 * @returns {Object} An object containing:
 * - `checkIsActive` (`function`): a function that checks if the provided `href` is the current active path.
 *
 * The `checkIsActive` function compares the `href` parameter with the current path (`pathName`) and returns `true` if the provided path is considered active.
 * It checks for an exact match for the home path and for a prefix match for other paths, ensuring that the home path is excluded from the prefix match.
 */
export const useIsActive = () => {
  const pathName = usePathname()

  const checkIsActive = (href: string) => {
    return pathName === href
  }

  return { checkIsActive }
}
