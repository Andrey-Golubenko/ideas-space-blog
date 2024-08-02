'use server'

import * as z from 'zod'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { CreatePostSchema } from '~/schemas'
import { getUserById } from '~/services/user'
import { db } from '~/libs/db'

export const newPost = async (
  values: z.infer<typeof CreatePostSchema>
) => {
  const validatedFields = CreatePostSchema.safeParse(values)

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

  const { title, content } = validatedFields.data

  try {
    await db.post.create({
      data: {
        title,
        content,
        authorId: dbUser?.id
      }
    })
  } catch {
    throw new Error('Somthing went wrong!')
  }

  return { success: 'Post has been successfully created!' }
}
