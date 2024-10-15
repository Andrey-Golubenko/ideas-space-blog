'use server'

import * as z from 'zod'

import { db } from '~/libs/db'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { getUserById } from '~/services/user'
import { Categories } from '@prisma/client'
import { ManagePostSchema } from '~/schemas'
import { TManagePostForm } from '~/types/types'

export const newPost = async (
  values: Omit<TManagePostForm, 'categories' | 'files'> & {
    categories: Categories[]
  }
) => {
  const validatedFields = ManagePostSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user?.id)

  if (!dbUser) {
    return { error: 'Unauthorized!' }
  }

  const { title, content, imageUrls, published, categories } =
    validatedFields.data

  const categoryIds = categories?.map((category) => {
    return (category as Categories)?.id
  })

  try {
    await db.post.create({
      data: {
        title,
        content,
        imageUrls,
        published,
        authorId: dbUser?.id,
        categories: {
          create: categoryIds?.map((catId) => {
            return {
              category: {
                connect: { id: catId }
              }
            }
          })
        }
      }
    })

    return { success: 'Post has been successfully created!' }
  } catch {
    return { error: 'Something went wrong!' }
  }
}
