'use server'

import { revalidatePath } from 'next/cache'
import { db } from '~/libs/db'
import { UserRole } from '@prisma/client'

import { getSinglePost } from '~/services/posts/posts.server'
import { getUserById } from '~/services/user'
import { fetchUncategorizedCategory } from '~/services/categories'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { PATHS } from '~/utils/constants'
import { ManagePostSchema } from '~/schemas'
import { type TManagePostForm, type TActionReturn } from '~/types'

export const editPost = async (
  values: TManagePostForm,
  postId: string
): TActionReturn => {
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

  if (editablePost.authorId !== user.id || user.role !== UserRole.ADMIN) {
    return { error: 'You have no permission to edit this post!' }
  }

  const uncategorizedCategory = await fetchUncategorizedCategory()

  const { title, content, imageUrls, published, categories } =
    validatedFields.data

  const validCategories =
    categories?.length > 1
      ? (categories as string[]).filter((categoryId) => {
          return categoryId !== uncategorizedCategory?.id
        })
      : (categories as string[])

  const newCategories = categories?.length
    ? validCategories
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
          create: newCategories?.map((catId) => {
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

    revalidatePath(`${PATHS.blog}/${postId}`)
    revalidatePath(`${PATHS.adminPosts}`)
    revalidatePath(PATHS.home)
    revalidatePath(PATHS.blog)

    return { success: 'Post has been successfully edited!' }
  } catch {
    return { error: 'Failed to edit the post!' }
  }
}
