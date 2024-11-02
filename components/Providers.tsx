'use client'

import { SessionProvider } from 'next-auth/react'
import { ParallaxProvider } from 'react-scroll-parallax'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <ParallaxProvider>{children}</ParallaxProvider>
    </SessionProvider>
  )
}

export default Providers
