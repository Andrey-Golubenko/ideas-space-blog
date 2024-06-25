import { v4 as uuidv4 } from 'uuid'
import { db } from '~/libs/db'
import { getVerificationTokenByEmail } from '~/services/verificationToken'
import { ONE_HOUR_EXPIRE } from '~/utils/constants/constants'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = ONE_HOUR_EXPIRE

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
