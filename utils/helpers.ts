import { PUBLIC_ROUTES } from '~/constants/routes'

export const isPublicRoute = (pathname: string): boolean => {
  const urlSlug = /\/\d+$/
  const urlWithSlug = urlSlug.test(pathname)

  if (urlWithSlug) {
    return PUBLIC_ROUTES.some(
      (route) => pathname.startsWith(route) && urlWithSlug
    )
  }

  return PUBLIC_ROUTES.includes(pathname)
}
