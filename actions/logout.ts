'use server'

import { signOut } from '~/libs/auth/auth'
import { PATHS } from '~/utils/constants'

export const logOut = async () => {
  await signOut({ redirectTo: PATHS.logIn })
}
