'use server'

import { auth } from '~/libs/auth/auth'

export const getCurrentUser = async () => {
  const session = await auth()
  const currentUser = session?.user

  return currentUser
}
