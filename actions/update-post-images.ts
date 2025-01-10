'use server'

import { revalidatePath } from 'next/cache'

import { db } from '~/libs/db'
import { UserRole } from '@prisma/client'
import { getUserById } from '~/services/user'
import { getSinglePost } from '~/services/posts/posts.server'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { PATHS } from '~/utils/constants'
import { type TActionReturn } from '~/types'

export const updatePostImages = async (
  postId: string,
  imageUrlsToRemove: string[]
): TActionReturn => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user?.id)

  if (!dbUser) {
    return { error: 'Unauthorized!' }
  }

  if (!postId) {
    return {
      error: 'Images of the post you are trying to update do not exist'
    }
  }

  const editablePost = await getSinglePost(postId)

  if (!editablePost) {
    return {
      error: 'Images of the post you are trying to update do not exist'
    }
  }

  if (editablePost.authorId !== user.id && user.role !== UserRole.ADMIN) {
    return {
      error: 'You have no permission to update images of the post!'
    }
  }

  try {
    const updatedImageUrls = editablePost?.imageUrls?.filter((url) => {
      return !imageUrlsToRemove.includes(url)
    })

    await db.post.update({
      where: {
        id: postId
      },
      data: {
        imageUrls: {
          set: updatedImageUrls || []
        }
      }
    })

    revalidatePath(`${PATHS.blog}/${postId}`)
    revalidatePath(`${PATHS.adminPosts}`)

    return { success: 'Images successfully updated!' }
  } catch (error) {
    console.error('Error updating images:', error)
    return { error: 'Failed to update images of the post!' }
  }
}
