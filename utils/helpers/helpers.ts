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

export const emptyStringToUndefined = (
  values: Record<string, unknown>
): Record<string, unknown> | Record<string, 'ADMIN' | 'USER'> => {
  const valuesFields = Object.entries(values)

  const preparedValues:
    | Record<string, unknown>
    | Record<string, 'ADMIN' | 'USER'> = valuesFields.reduce(
    (
      acc: Record<string, unknown> | Record<string, 'ADMIN' | 'USER'>,
      [key, value]
    ) => {
      if (value === '') {
        acc[key] = undefined
      } else {
        acc[key] = value
      }

      return acc
    },
    {}
  )

  return preparedValues
}
