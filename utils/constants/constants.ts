import { INavLink } from '~/types/types'

export const PATHS = {
  home: '/',
  blog: '/blog',
  posts: '/api/posts',
  about: '/about',
  constacts: '/about/contacts',
  team: '/about/team',
  signIn: '/auth',
  authActionsPref: '/api/auth',
  logIn: '/auth/login',
  register: '/auth/register',
  profile: '/profile',
  settings: '/settings',
  error: '/auth/error',

  libSignIn: '/api/auth/signin'
}

export const NAV_LINKS: INavLink[] = [
  { label: 'Home', href: PATHS.home },
  { label: 'Blog', href: PATHS.blog },
  { label: 'About', href: PATHS.about }
]

export const PRIVATE_NAV_LINKS: INavLink[] = [
  { label: 'Profile', href: PATHS.profile },
  { label: 'Settings', href: PATHS.settings }
]

export const AUTH_ERRORS = {
  duplicateCred: 'OAuthAccountNotLinked'
}

export const ONE_HOUR_EXPIRE = new Date(new Date().getTime() + 3600 * 1000)
