import { PUBLIC_ROUTES } from '~/utils/constants/routes'

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => {
    // If the route contains a dynamic part
    if (route.includes('[') && route.includes(']')) {
      // The route is converted to a regular expression
      const regex = new RegExp(`^${route.replace(/\[.*?\]/g, '[^/]+')}$`)
      return regex.test(pathname)
    }
    return route === pathname
  })
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
