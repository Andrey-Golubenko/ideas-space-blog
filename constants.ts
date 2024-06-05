import { INavLink } from './types/types'

export const PATHS = {
  home: '/',
  blog: '/blog',
  about: '/about',
  profile: '/profile',
  signIn: '/auth',
  logIn: '/auth/login',
  libSignIn: '/api/auth/signin',
  register: '/auth/register'
}

export const NAV_LINKS: INavLink[] = [
  { label: 'Home', href: PATHS.home },
  { label: 'Blog', href: PATHS.blog },
  { label: 'About', href: PATHS.about }
]
