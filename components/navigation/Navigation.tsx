import { auth } from '~/libs/auth/auth'
import NavMenu from '~/components/navigation/NavMenu'
import PrivateNavMenu from './PrivateNavMenu'

const Navigation = async () => {
  const session = await auth()

  return (
    <>
      <NavMenu isLoggedIn={!!session?.user} />
      {session?.user && <PrivateNavMenu />}
    </>
  )
}

export default Navigation
