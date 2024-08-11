import {
  PUBLIC_ROUTES,
  PUBLIC_ROUTES_EXCEPTIONS,
  PUBLIC_ROUTES_WITH_DYNAMIC_SEGMENT
} from '~/utils/constants/routes'

export const isPublicRoute = (pathname: string): boolean => {
  const isDynamicRoute =
    PUBLIC_ROUTES_WITH_DYNAMIC_SEGMENT.some((route) => {
      return pathname.startsWith(route)
    }) &&
    PUBLIC_ROUTES_EXCEPTIONS.some((route) => {
      return pathname !== route
    })

  const isPublic: boolean =
    PUBLIC_ROUTES.includes(pathname) || isDynamicRoute

  return isPublic
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

export const toUpperCaseFirstChar = (string?: string): string | '' => {
  if (string) {
    const processedString = string
      .charAt(0)
      .toUpperCase()
      .concat(string.slice(1))

    return processedString
  }

  return ''
}

export const titleFormatting = (string?: string): string | '' => {
  if (string) {
    const lowerCaseString = string.toLowerCase()

    const processedString = lowerCaseString
      .charAt(0)
      .toUpperCase()
      .concat(lowerCaseString.slice(1))

    return processedString
  }

  return ''
}
