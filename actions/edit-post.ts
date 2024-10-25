'use server'

import { db } from '~/libs/db'

import { getSinglePost } from '~/services/posts/posts.server'
import { getUserById } from '~/services/user'
import { fetchUncategorizedCategory } from '~/services/categories'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { ManagePostSchema } from '~/schemas'
import { type TManagePostForm } from '~/types/types'

export const editPost = async (
  values: TManagePostForm,
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

  if (!postId) {
    return { error: 'The post you are trying to edit does not exist' }
  }

  const editablePost = await getSinglePost(postId)

  if (!editablePost) {
    return { error: 'The post you are trying to edit does not exist' }
  }

  if (editablePost.authorId !== user.id) {
    return { error: 'You have no permission to edit this post!' }
  }

  const uncategorizedCategory = await fetchUncategorizedCategory()

  const { title, content, imageUrls, published, categories } =
    validatedFields.data

  const newCategories = categories?.length
    ? categories
    : [uncategorizedCategory?.id]

  try {
    await db.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        imageUrls,
        published,
        categories: {
          deleteMany: {
            postId
          },
          create: (newCategories as string[])?.map((catId) => {
            return {
              category: {
                connect: { id: catId }
              }
            }
          })
        }
      },
      include: {
        categories: true
      }
    })

    return { success: 'Post has been successfully edited!' }
  } catch {
    return { error: 'Failed to edit the post!' }
  }
}
