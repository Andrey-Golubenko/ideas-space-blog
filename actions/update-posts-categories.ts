import { db } from '~/libs/db'
import { type TActionReturn } from '~/types'

interface IUpdatePostsCategoriesProps {
  categoryPostsIds: {
    postId: string
  }[]
  categoryId: string
  uncategorizedCategoryId: string
}

export const updatePostsCategories = async ({
  categoryPostsIds,
  categoryId,
  uncategorizedCategoryId
}: IUpdatePostsCategoriesProps): TActionReturn => {
  try {
    const updatePromises = categoryPostsIds.map(async (postCategory) => {
      const { postId } = postCategory

      const categoryCount = await db.postCategories.count({
        where: { postId }
      })

      if (categoryCount === 1) {
        return db.postCategories.update({
          where: {
            postId_categoryId: {
              postId,
              categoryId
            }
          },
          data: {
            categoryId: uncategorizedCategoryId
          }
        })
      }

      return undefined
    })

    await Promise.all(updatePromises)

    return { success: 'Posts categories were successfully updated!' }
  } catch (error) {
    console.error('Failed to update posts categories:', error)

    return { error: 'Failed to update posts categories!' }
  }
}
