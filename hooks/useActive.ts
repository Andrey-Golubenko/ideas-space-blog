import { usePathname } from 'next/navigation'

const useActive = () => {
  const pathName = usePathname()

  const isActive = (href: string) => pathName === href

  return isActive
}

export default useActive
