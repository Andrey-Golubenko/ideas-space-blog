import { type Dispatch, type SetStateAction } from 'react'
import { toast } from 'sonner'

import {
  uploadImageToCloudinary,
  deleteImagesFromCloudinary
} from '~/services/images'
import { getImageNameFromUrl } from '~/utils/helpers'

export const saveImagesToCloudinary = async (
  files: File[],
  storageFolder: string,
  setError: Dispatch<SetStateAction<string | undefined>>
): Promise<string[] | null> => {
  const imageUrls: string[] = []

  try {
    const uploadPromises = files.map((file: File) => {
      const formData = new FormData()

      formData.append('file', file, file.name)

      return uploadImageToCloudinary(formData, storageFolder)
    })

    const uploadResults = await Promise.all(uploadPromises)

    uploadResults.forEach((result) => {
      if (result?.error) {
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

export const destroyImagesInCloudinary = async (
  imageUrls: string[],
  storageFolder: string
) => {
  try {
    const imageDeleteResultsPromises = imageUrls.map((url) => {
      const imageName = getImageNameFromUrl(url)

      return deleteImagesFromCloudinary(imageName!, storageFolder)
    })

    const imageDeleteResults = await Promise.all(
      imageDeleteResultsPromises
    )

    imageDeleteResults.forEach((result) => {
      if (result?.error) {
        toast.error(result?.error, {
          richColors: true,
          closeButton: true
        })

        throw new Error(result?.error)
      }
    })
  } catch (error) {
    console.error('Error when deleting images:', error)
    throw error
  }
}
