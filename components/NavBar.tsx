'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserButton from '~/components/auth/UserButton'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

const NavBar = () => {
  const pathname = usePathname()

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-around gap-x-2 gap-y-3 rounded-xl bg-secondary p-4 shadow-sm xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
      <div className="flex flex-wrap justify-around gap-2">
        <Button
          className="w-[88px]"
          asChild
          variant={pathname === PATHS.profile ? 'default' : 'outline'}
        >
          <Link href={PATHS.profile}>Profile</Link>
        </Button>

        <Button
          className="w-[88px]"
          asChild
          variant={pathname === PATHS.admin ? 'default' : 'outline'}
        >
          <Link href="/admin">Admin</Link>
        </Button>

        <Button
          className="w-[88px]"
          asChild
          variant={pathname === PATHS.settings ? 'default' : 'outline'}
        >
          <Link href={PATHS.settings}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  )
}

export default NavBar
