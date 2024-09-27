'use client'

import { ParallaxProvider } from 'react-scroll-parallax'
import { SessionDataProvider } from '~/libs/custom-providers/SessionDataProvider'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionDataProvider>
      <ParallaxProvider>{children}</ParallaxProvider>
    </SessionDataProvider>
  )
}

export default Providers
