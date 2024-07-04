import { INavLink } from '~/types/types'

export const PATHS = {
  home: '/',
  blog: '/blog',
  posts: '/api/posts',
  about: '/about',
  constacts: '/about/contacts',
  team: '/about/team',
  profile: '/profile',
  settings: '/settings',
  admin: '/admin',

  signIn: '/auth',
  logIn: '/auth/login',
  register: '/auth/register',
  emailVerification: '/auth/email-verification',
  resetPassword: '/auth/reset-password',
  newPassword: '/auth/new-password',
  error: '/auth/error',

  authActionsPref: '/api/auth',

  apiAdmin: '/api/admin',

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

export const ONE_HOUR = new Date(new Date().getTime() + 3600 * 1000)

export const FIFTEEN_MINUTES = new Date(new Date().getTime() + 900 * 1000)
