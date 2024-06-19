import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from '~/libs/db'
import authConfig from '~/libs/auth/auth.config'
import { getUserById } from '~/services/user'
import { UserRole } from '@prisma/client'
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
    /**
     * An exapmle for signIn-callback - 
     * 
     * async signIn({ user }) {
      const existingUser = await getUserById(user.id as string)

      if (!existingUser || !existingUser.emailVerified) {
        return false
      }

      return true
    },
     */

    async session({ token, session }) {
      if (token.sub && session.user) {
        /**
         * (session.user as AdapterUser &
            User & { customField: string | unknown }
            ).customField = token.customField
         */

        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({ token }) {
      /** How to add an additional field to 'session.user':
       * we can do it by adding this field to 'token'
       *
       * like this -  token.customField = 'test'
       *
       * and then, add this field to 'session.user', as it shown above in - async session({ token, session }) {}
       */
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },

  ...authConfig
})

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Google,
//     Credentials({
//       credentials: {
//         email: { label: 'Email', type: 'email', required: true },
//         password: { label: 'Password', type: 'password', required: true }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null

//         const currentUser = mockUsers.find(
//           (user) => credentials?.email === user?.email
//         )

//         if (
//           currentUser &&
//           currentUser?.password === credentials?.password
//         ) {
//           const { password, ...userWithoutPass } = currentUser

//           return userWithoutPass
//         }
//         return null
//       }
//     })
//   ],
//   secret: process.env.AUTH_SECRET,
//   pages: { signIn: PATHS.logIn }
// })
