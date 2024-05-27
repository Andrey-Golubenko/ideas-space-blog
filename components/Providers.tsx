'use client'

import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: React.PropsWithChildren) => (
  <SessionProvider>{children}</SessionProvider>
)

export default Providers
