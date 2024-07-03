import NavMenu from '~/components/navigation/NavMenu'
import { getCurrentUser } from '~/utils/helpers/server.helpers'
import PrivateNavMenu from './PrivateNavMenu'

const Navigation = async () => {
  const user = await getCurrentUser()

  return (
    <>
      <NavMenu isLoggedIn={!!user} />
      {user && <PrivateNavMenu />}
    </>
  )
}

export default Navigation
