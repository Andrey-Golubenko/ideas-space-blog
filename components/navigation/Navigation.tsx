import { auth, signOut } from '~/libs/auth/auth'
import Link from 'next/link'
import { PATHS } from '~/utils/constants/constants'
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
