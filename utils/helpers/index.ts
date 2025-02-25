import {
  PUBLIC_ROUTES,
  PUBLIC_ROUTES_EXCEPTIONS,
  ROUTES_WITH_DYNAMIC_SEGMENT
} from '~/utils/constants/routes'
import { type TDeserializedPost } from '~/types'

/**
 * isPublicRoute - function which checks if a given pathname corresponds to a public route.
 *
 * This function Determines whether the given route is public.
 *
 * The function evaluates if the provided pathname should be considered a public route
 * based on the following criteria:
 *
 * 1. If the pathname exactly matches one of the routes in `PUBLIC_ROUTES_EXCEPTIONS`,
 *    it is considered non-public (returns `false`).
 * 2. If the pathname exactly matches one of the routes in `PUBLIC_ROUTES`,
 *    it is considered public (returns `true`).
 * 3. If the pathname includes the substring `/api/`, it is considered public.
 * 4. If the pathname starts with any of the prefixes defined in `ROUTES_WITH_DYNAMIC_SEGMENT`,
 *    it is considered public.
 * 5. If none of the above conditions are met, the route is considered non-public.
 *
 * @param {string} pathname - The route path to check.
 * @returns {boolean} Returns `true` if the route is public, otherwise returns `false`.
 *
 * @example
 * Assuming:
 * PUBLIC_ROUTES = ['/blog']
 * PUBLIC_ROUTES_EXCEPTIONS = ['/blog/new-post']
 * ROUTES_WITH_DYNAMIC_SEGMENT = ['/blog', '/profile/']
 *
 * isPublicRoute('/blog');            // Returns true.
 * isPublicRoute('/blog/new-post');     // Returns false.
 * isPublicRoute('/api/posts');         // Returns true.
 * isPublicRoute('/profile/some-user'); // Returns true.
 */
export const isPublicRoute = (pathname: string): boolean => {
  // If the route exactly matches an exception, it is NOT public.
  if (
    PUBLIC_ROUTES_EXCEPTIONS.includes(
      pathname as (typeof PUBLIC_ROUTES_EXCEPTIONS)[number]
    )
  ) {
    return false
  }

  // If the route exactly matches a public route, it is public.
  if (PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number])) {
    return true
  }

  // If it's an API route, consider it public.
  if (pathname.includes('/api/')) {
    return true
  }

  // If the route starts with any of the dynamic segment prefixes, consider it public.
  const isDynamicRoute = ROUTES_WITH_DYNAMIC_SEGMENT.some((route) =>
    pathname.startsWith(route)
  )
  return isDynamicRoute
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
