'use server'

import { revalidatePath } from 'next/cache'

import { UserRole } from '@prisma/client'
import { db } from '~/libs/db'
import { getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { PATHS } from '~/utils/constants'
import { type TActionReturn } from '~/types'

export const deleteUser = async (userId: string): TActionReturn => {
  const user = await getCurrentUser()
  const isAdmin = user?.role === UserRole.ADMIN

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbCurrentUser = await getUserById(user.id)

  if (!dbCurrentUser) {
    return { error: 'Unauthorized!' }
  }

  const dbBeingDeletedUser = await getUserById(userId)

  if (!dbBeingDeletedUser) {
    return { error: 'There is no such a user to delete!' }
  }

  if (!isAdmin && user?.id !== userId) {
    return {
      error: 'You do not have a permission to delete this content!'
    }
  }

  try {
    await db.user.delete({
      where: {
        id: userId
      }
    })

    revalidatePath(PATHS.adminUsers)

    return { success: 'The user was successfully deleted!' }
  } catch {
    return null
  }
}
