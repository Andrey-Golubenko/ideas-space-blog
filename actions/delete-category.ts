'use server'

import { revalidatePath } from 'next/cache'

import { UserRole } from '@prisma/client'
import { db } from '~/libs/db'
import {
  fetchCategoryPostsIds,
  fetchSingleCategoryById,
  fetchUncategorizedCategory
} from '~/services/categories/categories.server'
import { getUserById } from '~/services/user'
import { updatePostsCategories } from '~/actions/update-posts-categories'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { DEFAULT_CATEGORY, PATHS } from '~/utils/constants'
import { type TActionReturn } from '~/types'

export const deleteCategory = async (
  categoryId: string
): TActionReturn => {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: 'Unauthorized!' }
    }

    const dbUser = await getUserById(user?.id)

    if (!dbUser) {
      return { error: 'Unauthorized!' }
    }

    const category = await fetchSingleCategoryById(categoryId)

    if (!category) {
      return { error: 'There are no category for deleting!' }
    }

    if (user?.role !== UserRole.ADMIN) {
      return { error: 'You have no permission to delete this category!' }
    }

    const uncategorizedCategory = await fetchUncategorizedCategory()

    if (uncategorizedCategory?.id === categoryId) {
      return {
        error: `Can not delete '${DEFAULT_CATEGORY.name}' category!`
      }
    }

    if (!uncategorizedCategory) {
      return {
        error: `There is no '${DEFAULT_CATEGORY.name}' category to link post with!`
      }
    }

    const categoryPostsIds = await fetchCategoryPostsIds(categoryId)

    if (categoryPostsIds?.length) {
      const postsCategoriesUpdating = await updatePostsCategories({
        categoryPostsIds,
        categoryId,
        uncategorizedCategoryId: uncategorizedCategory?.id
      })

      if (postsCategoriesUpdating?.error) {
        return {
          error:
            'Failed to update post categories before deleting category!'
        }
      }
    }

    await db.categories.delete({
      where: { id: categoryId }
    })

    revalidatePath(PATHS.categories)
    revalidatePath(PATHS.adminCategories)

    return { success: 'The category was successfully deleted!' }
  } catch (error) {
    console.error('Error while deleting category:', error)

    return { error: 'Failed to delete category!' }
  }
}
