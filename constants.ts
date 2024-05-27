import { INavLink } from './types'

export const PATHS = {
  home: '/',
  blog: '/blog',
  about: '/about',
  signIn: '/api/auth/signin',
  customSignIn: '/signIn',
  profile: '/profile'
}

export const NAV_LINKS: INavLink[] = [
  { label: 'Home', href: PATHS.home },
  { label: 'Blog', href: PATHS.blog },
  { label: 'About', href: PATHS.about }
]
