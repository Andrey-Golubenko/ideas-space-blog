// eslint-disable-next-line import/no-cycle
import { type INavLink } from '~/types'

export const PATHS = {
  home: '/',
  blog: '/blog',
  blogNewPost: '/blog/new-post',
  editPost: '/edit-post',
  posts: '/api/posts',
  categories: '/categories',
  profile: '/profile',
  settings: '/settings',
  admin: '/admin',
  adminUsers: '/admin/admin-users',
  adminEditUsers: '/admin/admin-users/edit-user-',
  adminPosts: '/admin/admin-posts',
  adminNewPost: '/admin/admin-posts/new-post',
  adminEditPost: '/admin/admin-posts/edit-post-',
  adminCategories: '/admin/admin-categories',
  adminEditCategory: '/admin/admin-categories/edit-category',
  adminNewCategory: '/admin/admin-categories/new-category',

  logIn: '/auth',
  register: '/auth/register',
  emailVerification: '/auth/email-verification',
  resetPassword: '/auth/reset-password',
  newPassword: '/auth/new-password',

  commonError: '/error',
  authError: '/auth/error',

  authActionsPref: '/api/auth',

  apiAdmin: '/api/admin',

  libSession: '/api/auth/session',
  libSignIn: '/api/auth/signin'
}

export const IMAGES_PATHS = {
  logo: '/images/logo.svg',
  noImages: '/images/image-placeholder.svg',
  heroBanner: '/images/hero-banner.webp',
  errorBanner: '/images/error-banner.svg',
  notFoudBanner: '/images/not-found-banner.svg'
}

export const NAV_LINKS: INavLink[] = [
  { label: 'Home', href: PATHS.home },
  { label: 'Blog', href: PATHS.blog },
  { label: 'Categories', href: PATHS.categories }
]

export const PRIVATE_NAV_LINKS: INavLink[] = [
  { label: 'Profile', href: PATHS.profile },
  { label: 'Admin', href: PATHS.admin },
  { label: 'Settings', href: PATHS.settings }
]

export const AUTH_ERRORS = {
  duplicateCred: 'OAuthAccountNotLinked'
}

export const ONE_HOUR = new Date(new Date().getTime() + 3600 * 1000)

export const FIFTEEN_MINUTES = new Date(new Date().getTime() + 900 * 1000)

export const FIVE_MINUTES = new Date(new Date().getTime() + 300 * 1000)

export const ECCEPTED_IMAGES_EXTENTIONS = [
  '.jpeg',
  '.jpg',
  '.png',
  '.heic',
  '.heif',
  '.webp'
]

export const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB

export const MAX_FILES_COUNT = 8

export const CLOUDINARY_POSTS_IMAGES_FOLDER = 'blog-posts'

export const CLOUDINARY_CATEGORIES_IMAGES_FOLDER = 'blog-categories'

export const SCREEN_SM = 480

export const SCREEN_MD = 768

export const SCREEN_LG = 976

export const SLUG_MODEL = /^[a-z-]+$/

export const DEFAULT_CATEGORY = {
  name: 'Uncategorized',
  slug: 'uncategorized',
  description: 'Default category for uncategorized posts.'
}

export const AUTH_OPTIONS = [
  { value: 'github', label: 'GitHub provider' },
  { value: 'google', label: 'Google provider' },
  { value: 'local', label: 'Local provider' }
]

export const PUBLISHED_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' }
]

export const POSTS_PER_PAGE = 9
export const ITEMS_PER_PAGE_DEFAULT_LIMIT = 10

// TODO: For storage as an example
enum InitCategoriesName {
  Finance,
  Travel,
  Home_and_Garden,
  Cooking,
  Sports_and_Health,
  Uncategorized,
  Nature,
  Technology,
  Technic,
  Economy
}
