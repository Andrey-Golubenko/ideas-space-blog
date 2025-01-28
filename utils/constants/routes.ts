/* eslint-disable prettier/prettier */
import { PATHS } from '~/utils/constants'

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string []}
 */
export const PUBLIC_ROUTES = [
  PATHS.home,
  PATHS.blog,
  PATHS.posts,
  PATHS.categories,
  PATHS.logIn,
  PATHS.emailVerification,
  PATHS.commonError
]

/**
 * An array of routes that have additional segment because of which are NOT accessible to the public.
 * These routes require authentication.
 * @type {string []}
 */
export const PUBLIC_ROUTES_EXCEPTIONS = [PATHS.blogNewPost]

/**
 * An array of routes that can have additional segment.
 * These routes DON'T require authentication.
 * @type {string []}
 */
export const PUBLIC_ROUTES_WITH_DYNAMIC_SEGMENT = [
  PATHS.blog,
  PATHS.categories
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged-in ussers to '/settings'.
 * @type {string []}
 */
export const AUTH_ROUTES = [
  PATHS.logIn,
  PATHS.register,
  PATHS.resetPassword,
  PATHS.newPassword,
  PATHS.authError,

  // route for automatically generated (by next-auth library) login-form
  PATHS.libSignIn
]

/**
 * An array of routes that are used only with ADMIN role.
 * @type {string []}
 */
export const ADMIN_ROUTES = [
  PATHS.admin,
  PATHS.adminPosts,
  PATHS.adminUsers,
  PATHS.adminCategories,
  PATHS.adminEditCategory,
  PATHS.adminEditPost,
  PATHS.adminEditUsers,
  PATHS.adminNewPost,
  PATHS.adminNewCategory
]

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const API_AUTH_PREFIX = PATHS.authActionsPref

/**
 * The default redirect path after loggin in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = PATHS.settings
