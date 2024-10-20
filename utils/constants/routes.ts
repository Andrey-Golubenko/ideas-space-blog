/* eslint-disable prettier/prettier */
import { PATHS } from '~/utils/constants/constants'

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
  PATHS.about,
  PATHS.constacts,
  PATHS.team,
  PATHS.signIn,
  PATHS.emailVerification
]

/**
 * An array of routes that have additional segment because of which are NOT accessible to the public.
 * These routes require authentication.
 * @type {string []}
 */
export const PUBLIC_ROUTES_EXCEPTIONS = [PATHS.newPost]

/**
 * An array of routes that can have additional segment.
 * @type {string []}
 */
export const PUBLIC_ROUTES_WITH_DYNAMIC_SEGMENT = [PATHS.blog]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in ussers to '/settings'.
 * @type {string []}
 */
export const AUTH_ROUTES = [
  PATHS.logIn,
  PATHS.register,
  PATHS.resetPassword,
  PATHS.newPassword,
  PATHS.error,

  // route for automatically generated (by next-auth library) login-form
  PATHS.libSignIn
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
