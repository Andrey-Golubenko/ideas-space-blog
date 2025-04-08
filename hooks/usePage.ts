import { usePathname } from 'next/navigation'
import { PATHS } from '~/utils/constants'

interface IUsePageReturn {
  isAdminPage: boolean
  isCategoriesPage: boolean
  isProfilePage: boolean
  isSubProfilePage: boolean
}

export const usePage = (): IUsePageReturn => {
  const pathname = usePathname()

  const isAdminPage: boolean = pathname.includes(PATHS.adminRoutsPrefix)

  const isCategoriesPage: boolean = pathname.includes(PATHS.categories)

  const isProfilePage: boolean = pathname === PATHS.profile

  const isSubProfilePage: boolean = pathname.includes(PATHS.profilePrefix)

  return { isAdminPage, isCategoriesPage, isProfilePage, isSubProfilePage }
}
