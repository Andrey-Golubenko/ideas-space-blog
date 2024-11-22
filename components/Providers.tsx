'use client'

import { SessionProvider } from 'next-auth/react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ParallaxProvider } from 'react-scroll-parallax'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <ParallaxProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ParallaxProvider>
    </SessionProvider>
  )
}

export default Providers
