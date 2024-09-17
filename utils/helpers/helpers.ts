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
  const fieldsValues = Object.entries(values)

  const preparedValues:
    | Record<string, unknown>
    | Record<string, 'ADMIN' | 'USER'> = fieldsValues.reduce(
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

export const urlToFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const mimeType = blob.type

    return { success: new File([blob], filename, { type: mimeType }) }
  } catch (error) {
    return { error: `Failed to load image: ${(error as Error).message}` }
  }
}

export const getImageNameFromUrl = (url: string) => {
  return url?.split('/').pop()?.split('.')?.shift()
}

export const getImageNames = (imageUrls: string[]) => {
  const existingImageNames =
    imageUrls?.map((url) => {
      return getImageNameFromUrl(url)
    }) || []

  return existingImageNames
}
