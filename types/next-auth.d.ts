import type { DefaultSession } from 'next-auth'
import { UserDTO, UserRole } from '~/types/types'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role?: UserRole
  }
}

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
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
