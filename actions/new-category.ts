'use server'

import { revalidatePath } from 'next/cache'

import { db } from '~/libs/db'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { getUserById } from '~/services/user'
import { UserRole } from '@prisma/client'
import { SingleCategorySchema } from '~/schemas'
import { PATHS } from '~/utils/constants'
import { type TManageCategoryForm, type TActionReturn } from '~/types'

export const newCategory = async (
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

  const { name, slug, description, imageUrl } = validatedFields.data

  try {
    await db.categories.create({
      data: {
        name,
        slug,
        description,
        imageUrl
      }
    })

    revalidatePath(PATHS.categories)
    revalidatePath(PATHS.adminCategories)

    return { success: 'The category was successfully created!' }
  } catch (error) {
    return { error: 'Failed to create new category!' }
  }
}
