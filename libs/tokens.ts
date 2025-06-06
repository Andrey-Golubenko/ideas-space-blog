import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { db } from '~/libs/db'
import { getVerificationTokenByEmail } from '~/services/auth/verification-token'
import { getPasswordResetTokenByEmail } from '~/services/auth/password-reset-token'
import { getTwoFactorTokenByEmail } from '~/services/auth/two-factor-token'
import { FIFTEEN_MINUTES, ONE_HOUR } from '~/utils/constants'

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = FIFTEEN_MINUTES

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id }
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return twoFactorToken
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = ONE_HOUR

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = FIFTEEN_MINUTES

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return passwordResetToken
}
