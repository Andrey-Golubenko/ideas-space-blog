import {
  PUBLIC_ROUTES,
  PUBLIC_ROUTES_EXCEPTIONS,
  PUBLIC_ROUTES_WITH_DYNAMIC_SEGMENT
} from '~/utils/constants/routes'
import { type TDeserializedPost } from '~/types'

/**
 * isPublicRoute - Function which checks if a given pathname corresponds to a public route.
 *
 * This function evaluates the provided `pathname` against predefined constants and determines
 * whether the route is public based on exact matches, dynamic segments, or API routes.
 *
 * @param {string} pathname - The pathname to check.
 * @returns {boolean} - `true` if the pathname matches a public route, otherwise `false`.
 */
export const isPublicRoute = (pathname: string): boolean => {
  const isDynamicRoute =
    PUBLIC_ROUTES_WITH_DYNAMIC_SEGMENT.some((route) => {
      return pathname.startsWith(route)
    }) &&
    PUBLIC_ROUTES_EXCEPTIONS.some((route) => {
      return pathname !== route
    })

  const isApiRoute = pathname.includes('/api/')

  const isPublic: boolean =
    PUBLIC_ROUTES.includes(pathname) || isDynamicRoute || isApiRoute

  return isPublic
}

/**
 * emptyStringToUndefined - Function which converts empty string values in an object to `undefined`.
 *
 * This function iterates over an object's values, replacing any empty string (`""`) with `undefined`.
 * The function preserves non-empty values as they are.
 *
 * @param {Record<string, unknown>} values - The object to process.
 * @returns {Record<string, unknown>} - The processed object with empty strings converted to `undefined`.
 */
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

/**
 * toUpperCaseFirstChar - Function which capitalizes the first character of a string.
 *
 * This function checks if the input string is defined and then returns the string with the first
 * character converted to uppercase. If the string is empty or undefined, it returns an empty string.
 *
 * @param {string} [string] - The string to process.
 * @returns {string} - The string with the first character capitalized, or an empty string if the input is undefined.
 */
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

/**
 * urlToFile - Function which converts an image URL to a File object.
 *
 * This function fetches the image from the provided URL and creates a `File` object with the specified
 * filename. If the fetch operation fails, it returns an error message.
 *
 * @param {string} url - The URL of the image to fetch.
 * @param {string} filename - The desired filename for the file.
 * @returns {Promise<{success: File} | {error: string}>} - A promise that resolves to either a `File` object or an error message.
 */
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

/**
 * getImageNameFromUrl - Function which extracts the image name (without extension) from a URL.
 *
 * This function splits the URL by `/` and `.` to retrieve the base name of the image file.
 *
 * @param {string} url - The URL to extract the image name from.
 * @returns {string | undefined} - The name of the image without its extension, or `undefined` if the URL is malformed.
 */
export const getImageNameFromUrl = (url: string) => {
  return url?.split('/').pop()?.split('.')?.shift()
}

/**
 * getImageNames - Function which retrieves the names (without extensions) of multiple images from a list of URLs.
 *
 * This function maps over an array of image URLs and returns an array of image names (without extensions).
 *
 * @param {string[]} imageUrls - An array of image URLs.
 * @returns {string[]} - An array of image names (without extensions).
 */
export const getImageNames = (imageUrls: string[]) => {
  const existingImageNames =
    imageUrls?.map((url) => {
      return getImageNameFromUrl(url)
    }) || []

  return existingImageNames
}

/**
 * isEmptyOrUnpublished - Function which checks if a list of posts is either empty or contains unpublished posts.
 *
 * This function checks if the provided list of posts is either empty or contains posts with a `published` value of `false`.
 * It also handles the case when the input is a string.
 *
 * @param {Post[] | TDeserializedPost[] | string} posts - The posts to check.
 * @returns {boolean} - `true` if the posts list is empty or contains unpublished posts, otherwise `false`.
 */
export const isEmptyOrUnpublished = (
  posts: TDeserializedPost[] | string | null
): boolean => {
  const noItems = typeof posts === 'string'

  const oneUnpublished = Array.isArray(posts)
    ? !!posts?.filter((post) => {
        return !post.published
      })?.length
    : false

  const isNotExist = posts === null

  return oneUnpublished || noItems || isNotExist
}

/**
 * Checks if the given post object exists and is not empty.
 *
 * @param {object | null} [obj] - The object to check.
 * @returns {boolean} `true` if the object exists and is not empty, otherwise `false`.
 */
export const checkIfPostExist = (obj?: object | null): boolean => {
  const isPostExist: boolean = !!obj && Object.keys(obj).length > 0

  return isPostExist
}
