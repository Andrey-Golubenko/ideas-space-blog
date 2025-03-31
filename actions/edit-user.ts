'use server'

import * as bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'

import { UserRole } from '@prisma/client'
import { db } from '~/libs/db'
import { sendVerificationEmail } from '~/libs/mail'
import { generateVerificationToken } from '~/libs/tokens'
import { getUserByEmail, getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import { PATHS } from '~/utils/constants'
import { type TManageUserForm, type TActionReturn } from '~/types'

export const editUser = async (values: TManageUserForm): TActionReturn => {
  const user = await getCurrentUser()
  const isAdmin = user?.role === UserRole.ADMIN

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: 'Unauthorized!' }
  }

  if (!isAdmin && user?.id !== values?.id) {
    return { error: 'You do not have a permission to edit this content!' }
  }

  if (user.isOAuth && !isAdmin) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values?.email && values?.email !== user?.email && !isAdmin) {
    const existingUser = await getUserByEmail(values?.email)

    if (existingUser && existingUser?.id !== user?.id) {
      return { error: 'Email is already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: 'Verification email sent!' }
  }

  if (values?.password && values?.newPassword && dbUser?.password) {
    const passwordMatch = await bcrypt.compare(
      values?.password,
      dbUser?.password
    )

    if (!passwordMatch) {
      return { error: 'Incorrect password!' }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)

    values.password = hashedPassword
    values.newPassword = undefined
  }

  try {
    await db.user.update({
      where: { id: values?.id },
      data: {
        ...values
      }
    })

    revalidatePath(PATHS.adminUsers)

    return { success: 'The user was successfully updated!' }
  } catch (error) {
    return { error: 'Failed to update user!' }
  }
}
