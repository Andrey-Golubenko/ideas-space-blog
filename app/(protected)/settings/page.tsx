import { type Metadata } from 'next'

import SettingsPageView from '~/views/SettingsPageView'

export const metadata: Metadata = {
  title: 'Ideas space : Users settings',
  description: "Changing user data, including changing the user's role"
}

const SettingsPage = () => {
  return (
    <div className="pb-10 pt-5 xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
      <SettingsPageView />
    </div>
  )
}

export default SettingsPage
