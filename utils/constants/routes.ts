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
  PATHS.commonError,
  PATHS.impressum,
  PATHS.privacyPolicy,
  PATHS.notFound
]

/**
 * An array of routes that have additional segment because of which are NOT accessible to the public.
 * These routes require authentication.
 * @type {string []}
 */
export const PUBLIC_ROUTES_EXCEPTIONS = [PATHS.blogNewPost, PATHS.profile]

/**
 * An array of routes that can have additional segment.
 * These routes DON'T require authentication.
 * @type {string []}
 */
export const ROUTES_WITH_DYNAMIC_SEGMENT = [
  PATHS.blog,
  PATHS.categories,
  PATHS.profilePrefix
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged-in users to '/settings'.
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
 * The prefix for routes that are used only with ADMIN role.
 * Routes that start with this prefix are used only with ADMIN role.
 * @type {string}
 */
export const ADMIN_ROUTS_PREFIX = PATHS.adminRoutsPrefix

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const API_AUTH_PREFIX = PATHS.authActionsPrefix

/**
 * The default redirect path after login in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = PATHS.settings
