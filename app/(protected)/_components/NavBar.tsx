'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserButton from '~/components/auth/UserButton'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

const NavBar = () => {
  const pathname = usePathname()

  return (
    <nav className="mb-8 flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === PATHS.profile ? 'default' : 'outline'}
        >
          <Link href={PATHS.profile}>Profile</Link>
        </Button>

        <Button
          asChild
          variant={pathname === '/admin' ? 'default' : 'outline'}
        >
          <Link href="/admin">Admin</Link>
        </Button>

        <Button
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
