import {
  LayoutDashboard,
  UsersRound,
  WalletCards,
  Layers
} from 'lucide-react'

import { PATHS } from '~/utils/constants'
import { TAdminSidebarItem } from '~/types'

export const adminDashboard: TAdminSidebarItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: PATHS.admin
  },
  {
    title: 'Users',
    icon: UsersRound,
    path: PATHS.adminUsers
  },
  {
    title: 'Posts',
    icon: WalletCards,
    path: PATHS.adminPosts
  },
  {
    title: 'Categories',
    icon: Layers,
    path: PATHS.adminCategories
  }
]
