'use server'

import * as z from 'zod'
import { db } from '~/libs/db'

import { ManagePostSchema } from '~/schemas'
import { getSinglePost } from '~/services/posts/posts.server'
import { getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

export const editPost = async (
  values: z.infer<typeof ManagePostSchema>,
  postId: string
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

  const editablePost = await getSinglePost(postId)

  if (!editablePost) {
    return { error: 'The post you are trying to edit does not exist' }
  }

  if (editablePost.authorId !== user.id) {
    return { error: 'You have no permission to edit this post!' }
  }

  const { title, content, published } = validatedFields.data

  try {
    await db.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        published
      }
    })

    return { success: 'Post has been successfully edited!' }
  } catch {
    return { error: 'Something went wrong!' }
  }
}
