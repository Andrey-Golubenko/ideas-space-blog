import { headers } from 'next/headers'

import { UserRole } from '@prisma/client'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import DesktopNavMenu from '~/components/navigation/DesktopNavMenu'
import MobileNavMenu from '~/components/navigation/MobileNavMenu'

const Navigation = async () => {
  const user = await getCurrentUser()

  const headersList = headers()
  const deviceType = headersList.get('x-device-type')
  const isMobileDevice = deviceType === 'mobile'
  const isAdmin = user?.role === UserRole.ADMIN

  return (
    <div className="flex w-full rounded-b-lg bg-[hsl(var(--layout-background))] py-2 shadow-[0_0_10px_rgba(252,252,252,.3)_inset]">
      {isMobileDevice ? (
        <MobileNavMenu
          isMobile={isMobileDevice}
          user={user}
          isAdmin={isAdmin}
        />
      ) : (
        <DesktopNavMenu
          isMobile={isMobileDevice}
          isLoggedIn={!!user}
          isAdmin={isAdmin}
        />
      )}
    </div>
  )
}

export default Navigation
