import { type Dispatch, type SetStateAction } from 'react'

import {
  uploadImageToCld,
  deleteImagesFromCld
} from '~/services/images/images.server'
import { getImageNameFromUrl } from '~/utils/helpers'

/**
 * Function for saving images on a cloud-based service (Cloudinary).
 * @param files - An array of files to save on Cloudinary.
 * @param storageFolder - The name of the folder where images will be saved on Cloudinary.
 * @param setError - A function to handle errors during the process of saving images on Cloudinary.
 * @returns Promise<string[] | null> - A promise that resolves to an array of URLs for the saved images or null in case of an error.
 */
export const saveImagesToCld = async (
  files: File[],
  storageFolder: string,
  setError: Dispatch<SetStateAction<string | undefined>>
): Promise<string[] | null> => {
  const imageUrls: string[] = []

  try {
    const uploadPromises = files.map((file: File) => {
      const formData = new FormData()

      formData.append('file', file, file.name)

      return uploadImageToCld(formData, storageFolder)
    })

    const uploadResults = await Promise.all(uploadPromises)

    uploadResults.forEach((result) => {
      if ('error' in result) {
        throw new Error(result?.error)
      }

      imageUrls.push(result.url!)
    })

    return imageUrls
  } catch (error) {
    setError((error as Error)?.message)

    return null
  }
}

/**
 * Function for deleting images on a cloud-based service (Cloudinary).
 * @param imageUrls - An array of URLs of images to delete.
 * @param storageFolder - The name of the folder on Cloudinary where the images are stored.
 * @param setComplDelOpen - (Optional) A function to open a modal window to confirm or decline the complete deletion of a post if some images were not deleted successfully.
 */
export const destroyImagesInCld = async (
  imageUrls: string[],
  storageFolder: string,
  setComplDelOpen?: (value: boolean) => void
) => {
  try {
    const imageDeleteResultsPromises = imageUrls.map((url) => {
      const imageName = getImageNameFromUrl(url)

      return deleteImagesFromCld(imageName!, storageFolder)
    })

    const imageDeleteResults = await Promise.all(
      imageDeleteResultsPromises
    )

    const deletedWithErrors = imageDeleteResults.filter((result) => {
      return result?.error
    })

    if (deletedWithErrors.length && setComplDelOpen) {
      setComplDelOpen(true)
      imageDeleteResults.forEach((result) => {
        if (result?.error) {
          throw new Error(result?.error)
        }
      })
    }
  } catch (error) {
    console.error('Error when deleting images:', error)
    throw error
  }
}
