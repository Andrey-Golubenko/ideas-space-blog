'use server'

import { db } from '~/libs/db'
import { getSinglePost } from '~/services/posts'
import { getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

export const deletePost = async (postId: string) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user?.id)

  if (!dbUser) {
    return { error: 'Unauthjrized!' }
  }

  const post = await getSinglePost(postId)

  if (!post) {
    return { error: 'There are no posts for deleting!' }
  }

  try {
    await db.post.delete({
      where: { id: postId }
    })

    return { success: 'The post was successfully deleted!' }
  } catch {
    return null
  }
}
