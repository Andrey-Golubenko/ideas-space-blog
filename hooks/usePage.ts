import { usePathname } from 'next/navigation'
import { PATHS } from '~/utils/constants'

interface IusePageReturn {
  isAdminPage: boolean
  isCategoriesPage: boolean
  isProfilePage: boolean
}

export const usePage = (): IusePageReturn => {
  const pathname = usePathname()

  const isAdminPage: boolean = pathname.includes(PATHS.admin)

  const isCategoriesPage: boolean = pathname.includes(PATHS.categories)

  const isProfilePage = pathname.includes(PATHS.profile)

  return { isAdminPage, isCategoriesPage, isProfilePage }
}
