/* eslint-disable prettier/prettier */
import { PATHS } from '~/constants/constants'

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string []}
 */
export const PUBLIC_ROUTES = [
  PATHS.home, 
  PATHS.blog,
  PATHS.posts,
  PATHS.about,
  PATHS.constacts,
  PATHS.team,
  PATHS.signIn
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logges in ussers to '/settings'. 
 * @type {string []}
 */
export const AUTH_ROUTES = [
  PATHS.logIn,
  PATHS.register,

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
