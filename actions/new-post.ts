'use server'

import { revalidatePath } from 'next/cache'

import { db } from '~/libs/db'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { getUserById } from '~/services/user'
import { fetchUncategorizedCategory } from '~/services/categories'
import { ManagePostSchema } from '~/schemas'
import { PATHS } from '~/utils/constants'
import { type TManagePostForm, type TActionReturn } from '~/types'

export const newPost = async (
  values: Omit<TManagePostForm, 'files'>
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

  const { title, content, imageUrls, published, categories } =
    validatedFields.data

  const uncategorizedCategory = await fetchUncategorizedCategory()

  const postCategoryIds = categories?.length
    ? (categories as string[])
    : [uncategorizedCategory?.id]

  try {
    await db.post.create({
      data: {
        title,
        content,
        imageUrls,
        published,
        authorId: dbUser?.id,
        categories: {
          create: postCategoryIds?.map((catId) => {
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

    revalidatePath(PATHS.blog)
    revalidatePath(PATHS.adminPosts)

    return { success: 'New post has been successfully created!' }
  } catch {
    return { error: 'Failed to create a new post!' }
  }
}
