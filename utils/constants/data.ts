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
    title: 'Statistics',
    icon: LayoutDashboard,
    path: PATHS.adminStatistics
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
