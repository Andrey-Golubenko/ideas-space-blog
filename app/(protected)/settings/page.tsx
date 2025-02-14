import { type Metadata } from 'next'

import EditUserPageView from '~/views/EditUserPageView'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

export const metadata: Metadata = {
  title: 'Ideas space : Users settings',
  description: "Changing user data, including changing the user's role"
}

const SettingsPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <div className="pb-10 pt-5 @container xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
      <EditUserPageView
        label="⚙️ Settings"
        user={currentUser}
      />
    </div>
  )
}

export default SettingsPage
