'use server'

import { db } from '~/libs/db'
import { UserRole } from '@prisma/client'
import { getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
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

    return { success: 'The user was successfully deleted!' }
  } catch {
    return null
  }
}
