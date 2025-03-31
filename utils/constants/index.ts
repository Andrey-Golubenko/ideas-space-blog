import {
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaInstagram
} from 'react-icons/fa'
import { ChevronRightIcon } from 'lucide-react'
import { type INavLink } from '~/types'

export const PATHS = {
  home: '/',

  blog: '/blog',
  post: (postSlug: string) => `/blog/${postSlug}`,
  blogNewPost: '/blog/new-post',
  editPost: (postId: string) => `/blog/${postId}/edit-post`,
  posts: '/api/posts',

  categories: '/categories',
  category: (categorySlug: string) => `/categories/${categorySlug}`,

  profile: '/profile',
  publicProfile: (userId: string) => `/profile/${userId}`,

  settings: '/settings',

  admin: '/admin',
  adminUsers: '/admin/admin-users',
  adminUser: (userId: string) => `/admin/admin-users/${userId}`,
  adminEditUser: (userId: string) =>
    `/admin/admin-users/${userId}/edit-user`,

  adminPosts: '/admin/admin-posts',
  adminPost: (postId: string) => `/admin/admin-posts/${postId}`,
  adminNewPost: '/admin/admin-posts/new-post',
  adminEditPost: (postId: string) =>
    `/admin/admin-posts/${postId}/edit-post`,

  adminCategories: '/admin/admin-categories',
  adminNewCategory: '/admin/admin-categories/new-category',
  adminEditCategory: '/admin/admin-categories/edit-category',

  logIn: '/auth',
  register: '/auth/register',
  emailVerification: '/auth/email-verification',
  resetPassword: '/auth/reset-password',
  newPassword: '/auth/new-password',

  notFound: '/not-found',

  commonError: '/error',
  authError: '/auth/error',

  impressum: '/impressum',
  privacyPolicy: '/privacy-policy',

  categoryPrefix: '/categories/',
  profilePrefix: '/profile/',
  adminRoutsPrefix: '/admin',
  authActionsPrefix: '/api/auth',

  libSession: '/api/auth/session',
  libSignIn: '/api/auth/signin'
} as const

export const STATIC_POST_LIST_PATHS = [
  PATHS.blog,
  PATHS.profile,
  PATHS.adminPosts
]

export const DYNAMIC_POST_LIST_PATH_PREFIXES = [
  PATHS.categoryPrefix, // For paths like /categories/[slug]
  PATHS.profilePrefix // For paths like /categories/[slug]
]

export const POST_LIST_PATH_PATTERNS = [
  /^\/categories\/[\w-]+$/, // Matches /categories/any-slug
  /^\/profile\/[\w-]+$/ // Corresponds to /profile/any-id
]

export const IMAGES_PATHS = {
  noImages: '/images/image-placeholder.svg',
  heroBanner: '/images/hero-banner.webp',
  heroBannerMobil: '/images/hero-banner-mobile.webp',
  errorBanner: '/images/error-banner.svg',
  notFoundBanner: '/images/not-found-banner.svg'
} as const

export const NAV_LINKS: INavLink[] = [
  { label: 'Home', href: PATHS.home },
  { label: 'Blog', href: PATHS.blog },
  { label: 'Categories', href: PATHS.categories }
] as const

export const PRIVATE_NAV_LINKS: INavLink[] = [
  { label: 'Profile', href: PATHS.profile },
  { label: 'Settings', href: PATHS.settings }
] as const

export const FOOTER_NAV_LINKS_LEGAL: INavLink[] = [
  {
    label: 'Impressum',
    icon: ChevronRightIcon,
    href: PATHS.impressum
  },
  {
    label: 'Privacy policy',
    icon: ChevronRightIcon,
    href: PATHS.privacyPolicy
  }
] as const

export const SOCIAL_NAV_LINKS: INavLink[] = [
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/' },
  { icon: FaFacebookF, href: 'https://www.facebook.com/' },
  { icon: FaYoutube, href: 'https://www.youtube.com/' },
  { icon: FaInstagram, href: 'https://www.instagram.com/' }
] as const

export const AUTH_ERRORS = {
  duplicateCred: 'OAuthAccountNotLinked'
} as const

export const ONE_HOUR = new Date(new Date().getTime() + 3600 * 1000)

export const FIFTEEN_MINUTES = new Date(new Date().getTime() + 900 * 1000)

export const FIVE_MINUTES = new Date(new Date().getTime() + 300 * 1000)

export const ACCEPTED_IMAGES_EXTENSIONS = [
  '.jpeg',
  '.jpg',
  '.png',
  '.heic',
  '.heif',
  '.webp'
] as const

export const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB

export const MAX_FILES_COUNT = 8 as const

export const CLOUDINARY_POSTS_IMAGES_FOLDER = 'blog-posts' as const

export const CLOUDINARY_CATEGORIES_IMAGES_FOLDER =
  'blog-categories' as const

export const SCREEN_SM = 480 as const

export const SCREEN_MD = 768 as const

export const SCREEN_LG = 976 as const

export const SLUG_MODEL = /^[a-z-]+$/

export const DEFAULT_CATEGORY = {
  name: 'Uncategorized',
  slug: 'uncategorized',
  description: 'Default category for uncategorized posts.'
} as const

export const AUTH_OPTIONS = [
  { value: 'github', label: 'GitHub provider' },
  { value: 'google', label: 'Google provider' },
  { value: 'local', label: 'Local provider' }
]

export const POST_STATUS_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' }
]

// Count of items per page for different lists with pagination
export const DEFAULT_POSTS_PER_PAGE = 9 as const
export const PROFILE_POSTS_PER_PAGE = 3 as const
export const SINGLE_CAT_POSTS_PER_PAGE = 4 as const
export const DEFAULT_TABLE_ITEMS_PER_PAGE = 10 as const

export const DEFAULT_CATEGORIES_PER_PAGE = 12 as const

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
