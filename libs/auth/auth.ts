import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'

import { db } from '~/libs/db'
import authConfig from '~/libs/auth/auth.config'
import { getUserById } from '~/services/user'
import { getTwoFactorConfirmationByUserId } from '~/services/twoFactorConfirmation'
import { PATHS } from '~/utils/constants/constants'

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: PATHS.logIn,
    error: PATHS.error
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

      if (existingUser.isTwoFackorEnabled) {
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
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled =
          token.isTwoFcatorEnabled as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role
      token.isTwoFcatorEnabled = existingUser.isTwoFackorEnabled

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },

  ...authConfig
})
