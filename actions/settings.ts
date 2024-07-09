'use server'

import * as z from 'zod'
import * as bcrypt from 'bcryptjs'

import { db } from '~/libs/db'
import { sendVerificationEmail } from '~/libs/mail'
import { generateVerificationToken } from '~/libs/tokens'
import { SettingsSchema } from '~/schemas'
import { getUserByEmail, getUserById } from '~/services/user'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized!' }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: 'Unauthorized!' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email is already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: 'Verification email sent!' }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )

    if (!passwordMatch) {
      return { error: 'Incorrect password!' }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)

    values.password = hashedPassword
    values.newPassword = undefined
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values
    }
  })

  return { success: 'Settings updated!' }
}
