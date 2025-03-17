'use server'

import { revalidatePath } from 'next/cache'

import { db } from '~/libs/db'
import { UserRole } from '@prisma/client'
import { getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { SingleCategorySchema } from '~/schemas'
import { PATHS } from '~/utils/constants'
import { type TManageCategoryForm, type TActionReturn } from '~/types'

export const editCategory = async (
  values: Omit<TManageCategoryForm, 'file'>
): TActionReturn => {
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

  const { id, name, slug, description, imageUrl } = validatedFields.data

  try {
    await db.categories.update({
      where: {
        id
      },
      data: {
        name,
        slug,
        description,
        imageUrl
      }
    })

    revalidatePath(PATHS.categories)
    revalidatePath(PATHS.adminCategories)

    return { success: 'The category was successfully updated!' }
  } catch (error) {
    return { error: 'Failed to update category!' }
  }
}
