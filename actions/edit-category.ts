'use server'

import { db } from '~/libs/db'
import { UserRole } from '@prisma/client'
import { getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { SingleCategorySchema } from '~/schemas'
import { TManageCategoryForm } from '~/types/types'

export const editCategory = async (
  values: Omit<TManageCategoryForm, 'file'>,
  categoryId: string
) => {
  const validatedFields = SingleCategorySchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  if (user.role !== UserRole.ADMIN) {
    return {
      error: 'You do not have a permission to create new category!'
    }
  }

  const dbUser = await getUserById(user?.id)

  if (!dbUser) {
    return { error: 'Unauthorized!' }
  }

  const { name, slug, description, imageUrl } = validatedFields.data

  try {
    await db.categories.update({
      where: {
        id: categoryId
      },
      data: {
        name,
        slug,
        description,
        imageUrl
      }
    })

    return { success: 'The category was successfully updated!' }
  } catch (error) {
    return { error: 'Failed to update category!' }
  }
}
