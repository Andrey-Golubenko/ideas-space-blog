'use server'

import { type UploadApiResponse } from 'cloudinary/types'
import cloudinary from '~/libs/cloudinary/cloudinary.config'

export const uploadImageToCloudinary = async (formData: FormData) => {
  try {
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      throw new Error('No file provided!')
    }

    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'blog-nextjs' },
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
