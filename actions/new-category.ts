'use server'

import { db } from '~/libs/db'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { getUserById } from '~/services/user'
import { UserRole } from '@prisma/client'
import { SingleCategorySchema } from '~/schemas'
import { TManageCategoryForm } from '~/types/types'

export const newCategory = async (
  values: Omit<TManageCategoryForm, 'file'>
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
    return { error: 'You do not have permission to do this!' }
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

    return { success: 'The category was successfully created!' }
  } catch (error) {
    return { error: 'Failed to create new category!' }
  }
}
