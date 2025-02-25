import * as bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { LogInSchema } from '~/schemas'
import { getUserByEmail } from '~/services/user'

export default {
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LogInSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user || !user!.password) return null

          const passwordMatch = await bcrypt.compare(
            password,
            user.password
          )

          if (passwordMatch) return user
        }

        return null
      }
    })
  ]
} satisfies NextAuthConfig
