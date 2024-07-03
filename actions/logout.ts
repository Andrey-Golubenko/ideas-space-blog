'use server'

import { signOut } from '~/libs/auth/auth'

export const logOut = async () => {
  await signOut()
}
