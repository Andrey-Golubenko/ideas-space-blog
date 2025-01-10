'use server'

import { type UploadApiResponse } from 'cloudinary/types'
import cloudinary from '~/libs/cloudinary/cloudinary.config'
import { type TActionReturn } from '~/types'

export const uploadImageToCloudinary = async (
  formData: FormData,
  storageFolder: string
) => {
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

export const deleteImagesFromCloudinary = async (
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
    return {
      error: `Failed to delete image: ${imageName}. Try again a little bit later.`
    }
  }
}
