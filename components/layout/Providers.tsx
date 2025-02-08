'use client'

import { SessionProvider } from 'next-auth/react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { TooltipProvider } from '~/components/ui/tooltip'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <ParallaxProvider>
        <TooltipProvider delayDuration={0}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </TooltipProvider>
      </ParallaxProvider>
    </SessionProvider>
  )
}

export default Providers
