import { usePathname } from 'next/navigation'

const useActive = () => {
  const pathName = usePathname()

  const isActive = (href: string) => {
    return pathName === href
  }

  return isActive
}

export default useActive
