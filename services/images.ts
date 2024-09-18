'use server'

import { type UploadApiResponse } from 'cloudinary/types'
import cloudinary from '~/libs/cloudinary/cloudinary.config'
import { CLOUDINARY_IMAGE_FOLDER } from '~/utils/constants/constants'

export const uploadImageToCloudinary = async (formData: FormData) => {
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
          folder: CLOUDINARY_IMAGE_FOLDER,
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
  imageName: string
): Promise<
  | {
      error: string
      success?: undefined
    }
  | {
      success: string
      error?: undefined
    }
> => {
  try {
    const deleteResult = await cloudinary.uploader.destroy(
      `${CLOUDINARY_IMAGE_FOLDER}/${imageName}`,
      {
        invalidate: true,
        resource_type: 'image'
      }
    )

    if (deleteResult.result !== 'ok') {
      return {
        error: `Failed to delete image: ${imageName}`
      }
    }

    return { success: 'Images was successfully deleted' }
  } catch (error) {
    return {
      error: `Failed to delete image: ${(error as Error).message}`
    }
  }
}
