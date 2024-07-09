'use client'

import { SessionDataProvider } from '~/libs/custom-providers/SessionDataProvider'

const Providers = ({ children }: React.PropsWithChildren) => {
  return <SessionDataProvider>{children}</SessionDataProvider>
}

export default Providers
