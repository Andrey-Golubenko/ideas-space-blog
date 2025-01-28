import { headers } from 'next/headers'

import { UserRole } from '@prisma/client'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import DesktopNavMenu from '~/components/navigation/DesktopNavMenu'
import MobileNavMenu from '~/components/navigation/MobileNavMenu'

const Navigation = async () => {
  const user = await getCurrentUser()

  const headersList = headers()
  const deviceType = headersList.get('x-device-type')
  const isMobile = deviceType === 'mobile'
  const isAdmin = user?.role === UserRole.ADMIN

  return (
    <div className="flex w-full rounded-b-lg bg-[rgb(44,47,58)] py-2 shadow-[0_0_10px_rgba(252,252,252,.3)_inset]">
      {isMobile ? (
        <MobileNavMenu
          isMobile={isMobile}
          user={user}
          isAdmin={isAdmin}
        />
      ) : (
        <DesktopNavMenu
          isMobile={isMobile}
          isLoggedIn={!!user}
          isAdmin={isAdmin}
        />
      )}
    </div>
  )
}

export default Navigation
