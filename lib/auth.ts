import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { mockUsers } from '../mockData'
import { PATHS } from '../constants'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const currentUser = mockUsers.find(
          (user) => credentials?.email === user?.email
        )

        if (
          currentUser &&
          currentUser?.password === credentials?.password
        ) {
          const { password, ...userWithoutPass } = currentUser

          return userWithoutPass
        }
        return null
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  pages: { signIn: PATHS.customSignIn }
})
