'use server'

import { type UploadApiResponse } from 'cloudinary/types'
import cloudinary from '~/libs/cloudinary/cloudinary.config'
import { type TActionReturn } from '~/types'

/**
 * Function to upload an image to the cloud-based service (Cloudinary).
 * @param formData - A FormData object containing the file to be uploaded.
 * @param storageFolder - The name of the folder on Cloudinary where the image will be stored.
 * @returns Promise<{ url: string } | { error: string }> - A promise that resolves to an object containing the URL of the uploaded image or an error message in case of failure.
 */
export const uploadImageToCld = async (
  formData: FormData,
  storageFolder: string
): Promise<{ url: string } | { error: string }> => {
  try {
    const file = formData.get('file')
    const fileName = (file as File)?.name.split('.').shift()

    if (!file || !(file instanceof File)) {
      throw new Error('No file provided!')
    }

    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: storageFolder,
          public_id: fileName,
          use_filename: true
        },
        (error, result) => {
          if (error) {
            reject(new Error(error.message))
          }

          if (result) {
            resolve(result)
          }
        }
      )

      uploadStream.end(fileBuffer)
    })

    return { url: (uploadResult as UploadApiResponse).secure_url }
  } catch (error) {
    return {
      error: `Failed to upload image: ${(error as Error).message}`
    }
  }
}

/**
 * Function to delete an image from the cloud-based service (Cloudinary).
 * @param imageName - The name of the image to be deleted.
 * @param storageFolder - The name of the folder on Cloudinary where the image is stored.
 * @returns TActionReturn - An object containing a success message if the deletion was successful or an error message in case of failure.
 */
export const deleteImagesFromCld = async (
  imageName: string,
  storageFolder: string
): TActionReturn => {
  try {
    const deleteResult = await cloudinary.uploader.destroy(
      `${storageFolder}/${imageName}`,
      {
        invalidate: true,
        resource_type: 'image'
      }
    )

    if (deleteResult.result !== 'ok') {
      return {
        error: `Failed to delete image: ${imageName}. Try again a little bit later.`
      }
    }

    return { success: `Image was successfully deleted: ${imageName}` }
  } catch (error) {
    console.error('Error when deleting image:', error)

    return {
      error: `Failed to delete image: ${imageName}. Try again a little bit later.`
    }
  }
}

/**
 * Function to delete a folder from the cloud-based service (Cloudinary).
 * @param pathToFolder - The path to the folder to be deleted on Cloudinary.
 * @returns TActionReturn - An object containing a success message if the folder was successfully deleted or an error message in case of failure.
 */
export const deletePostFolderInCld = async (
  pathToFolder: string
): TActionReturn => {
  try {
    await cloudinary.api.delete_folder(pathToFolder)

    return { success: `Folder for posts images was successfully deleted` }
  } catch (error) {
    console.error('Error when deleting post-folder:', error)

    return {
      error: `Failed to delete folder for posts images. Try again later.`
    }
  }
}
