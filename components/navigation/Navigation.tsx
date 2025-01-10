import { headers } from 'next/headers'

import { getCurrentUser } from '~/utils/helpers/server.helpers'
import DesktopNavMenu from '~/components/navigation/DesktopNavMenu'
import MobileNavMenu from '~/components/navigation/MobileNavMenu'

const Navigation = async () => {
  const user = await getCurrentUser()

  const headersList = headers()
  const deviceType = headersList.get('x-device-type')
  const isMobile = deviceType === 'mobile'

  return (
    <div className="flex w-full rounded-b-lg bg-[rgb(44,47,58)] py-2 shadow-[0_0_10px_rgba(252,252,252,.3)_inset]">
      {isMobile ? (
        <MobileNavMenu
          isMobile={isMobile}
          user={user}
        />
      ) : (
        <DesktopNavMenu
          isMobile={isMobile}
          isLoggedIn={!!user}
        />
      )}
    </div>
  )
}

export default Navigation
