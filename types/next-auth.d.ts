import { type DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import { UserRole } from '@prisma/client'

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
    sessionId?: string
  }
}

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    sessionId: string
    user: UserDTO & DefaultSession['user']
    /**
     * By default, TypeScript merges new interface properties and overwrites existing ones.
     * In this case, the default session user properties will be overwritten,
     * with the new ones defined above. To keep the default session user properties,
     * you need to add them back into the newly declared interface.
     */
  }
}

// Make the getCsrfToken accessible outside of next-auth package
declare module 'next-auth/react' {
  function getCsrfToken(): Promise<string>
}
