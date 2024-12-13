import { usePathname } from 'next/navigation'

import { PATHS } from '~/utils/constants'

const useActive = () => {
  const pathName = usePathname()

  const isActive = (href: string) => {
    if (href === PATHS.home) {
      return pathName === href
    }

    return pathName.startsWith(href) && pathName !== PATHS.home
  }

  return isActive
}

export default useActive
