'use server'

import { revalidatePath } from 'next/cache'

import { UserRole } from '@prisma/client'
import { db } from '~/libs/db'
import { getSinglePost } from '~/services/posts/posts.server'
import { getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { PATHS } from '~/utils/constants'
import { type TActionReturn } from '~/types'

export const deletePost = async (postId: string): TActionReturn => {
  const user = await getCurrentUser()
  const isAdmin = user?.role === UserRole.ADMIN

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user?.id)

  if (!dbUser) {
    return { error: 'Unauthorized!' }
  }

  const post = await getSinglePost(postId)

  if (!post) {
    return { error: 'There are no posts for deleting!' }
  }

  if (post.authorId !== user.id && !isAdmin) {
    return { error: 'You have no permission to delete this post!' }
  }

  try {
    await db.post.delete({
      where: { id: postId }
    })

    revalidatePath(PATHS.home)
    revalidatePath(PATHS.blog)
    revalidatePath(PATHS.adminPosts)

    return { success: 'The post was successfully deleted!' }
  } catch {
    return null
  }
}
