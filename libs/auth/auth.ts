import NextAuth from 'next-auth'
import { v4 as uuidv4 } from 'uuid'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from '~/libs/db'
import authConfig from '~/libs/auth/auth.config'
import { getUserById } from '~/services/user'
import { getTwoFactorConfirmationByUserId } from '~/services/twoFactorConfirmation'
import { getAccountByUserId } from '~/services/account'
import { PATHS } from '~/utils/constants'

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: PATHS.logIn,
    error: PATHS.authError
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id as string)

      // Prevent signIn without Email verification
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation =
          await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }

      return true
    },

    async session({ token, session }) {
      if (token.sessionId) {
        session.sessionId = token.sessionId
      }

      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      }

      if (session.user) {
        session.user.name = token.name as string | null
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth
      }

      return session
    },

    async jwt({ token, account }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      if (account) {
        token.sessionId = uuidv4()
      }

      token.isOAuth = Boolean(existingAccount)
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },

  ...authConfig
})
