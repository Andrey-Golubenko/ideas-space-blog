import { INavLink } from './types'

export const PATHS = {
  home: '/',
  blog: '/blog',
  about: '/about',
  profile: '/profile',
  signIn: '/auth',
  customSignIn: '/auth/login',
  logIn: '/auth/login',
  autoSignIn: '/api/auth/signin'
}

export const NAV_LINKS: INavLink[] = [
  { label: 'Home', href: PATHS.home },
  { label: 'Blog', href: PATHS.blog },
  { label: 'About', href: PATHS.about }
]
