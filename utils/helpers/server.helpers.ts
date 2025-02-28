'use server'

import { auth } from '~/libs/auth/auth'

/**
 * getCurrentUser - Server function which retrieves the currently authenticated user.
 *
 * This function uses the `auth` library to fetch the current session and extracts the user information
 * from the session object. It returns the authenticated user's data or `undefined` if no user is logged in.
 *
 * @returns {Promise<object | undefined>} - A promise resolving to the current user object or `undefined` if no user is authenticated.
 */
export const getCurrentUser = async () => {
  const session = await auth()
  const currentUser = session?.user

  return currentUser
}

/**
 * getCurrentUserRole - Server function which retrieves the role of the currently authenticated user.
 *
 * This function uses the `auth` library to fetch the current session and extracts the user's role from
 * the session object. It returns the user's role or `undefined` if no role is associated with the session.
 *
 * @returns {Promise<string | undefined>} - A promise resolving to the user's role as a string or `undefined` if no role is available.
 */
export const getCurrentUserRole = async () => {
  const session = await auth()
  const userRole = session?.user?.role

  return userRole
}
