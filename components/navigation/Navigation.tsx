import { headers } from 'next/headers'

import { getCurrentUser } from '~/utils/helpers/server.helpers'
import DesktopNavMenu from '~/components/navigation/DesktopNavMenu'
import MobileNavMenu from '~/components/navigation/MobileNavMenu'

const Navigation = async () => {
  const user = await getCurrentUser()

  const headersList = headers()
  const deviceType = headersList.get('x-device-type')
  const isMobile = deviceType === 'mobile'
  // const isMobile = true

  return (
    <div className="flex w-full">
      {isMobile ? (
        <MobileNavMenu
          isLoggedIn={!!user}
          isMobile={isMobile}
        />
      ) : (
        <DesktopNavMenu
          isLoggedIn={!!user}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}

export default Navigation
