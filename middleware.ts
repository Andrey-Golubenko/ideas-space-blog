import NextAuth from 'next-auth'

import authConfig from '~/libs/auth/auth.config'
import {
  AUTH_ROUTES,
  API_AUTH_PREFIX,
  DEFAULT_LOGIN_REDIRECT
} from '~/utils/constants/routes'
import { PATHS } from '~/utils/constants/constants'
import { isPublicRoute } from '~/utils/helpers/helpers'

const { auth } = NextAuth(authConfig)

// Our Middleware
export default auth((request) => {
  const { nextUrl } = request
  const { pathname } = nextUrl
  const isLoggedIn = !!request?.auth

  const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  if (isApiAuthRoute) {
    return undefined
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return undefined
  }

  if (!isLoggedIn && !isPublicRoute(pathname)) {
    let callbackUrl = pathname

    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`${PATHS.logIn}?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  return undefined
})

// And Invoke Middleware for all routes and path
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
