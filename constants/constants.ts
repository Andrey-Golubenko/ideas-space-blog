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

  libSignIn: '/api/auth/signin'
}

export const NAV_LINKS: INavLink[] = [
  { label: 'Home', href: PATHS.home },
  { label: 'Blog', href: PATHS.blog },
  { label: 'About', href: PATHS.about }
]
