import { PUBLIC_ROUTES } from '~/utils/constants/routes'

export const isPublicRoute = (pathname: string): boolean => {
  const urlSlug = /\/\d+$/
  const urlWithSlug = urlSlug.test(pathname)

  if (urlWithSlug) {
    return PUBLIC_ROUTES.some((route) => {
      return pathname.startsWith(route) && urlWithSlug
    })
  }

  return PUBLIC_ROUTES.includes(pathname)
}
