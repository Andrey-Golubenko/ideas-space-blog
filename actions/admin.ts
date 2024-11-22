'use server'

import { UserRole } from '@prisma/client'
import { getUserRole } from '~/utils/helpers/server.helpers'
import { type TActionReturn } from '~/types'

export const admin = async (): TActionReturn => {
  const userRole = await getUserRole()

  if (userRole === UserRole.ADMIN) {
    return { success: 'Allowed Server Action!' }
  }

  return { error: 'Forbidden Server Action!' }
}
