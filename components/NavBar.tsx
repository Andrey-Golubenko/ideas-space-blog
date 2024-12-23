'use client'

import UserButton from '~/components/auth/UserButton'

const NavBar = () => {
  return (
    <nav className="mt-8 flex flex-wrap items-center justify-around gap-x-2 gap-y-3 rounded-xl bg-secondary p-4 shadow-sm xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
      <UserButton />
    </nav>
  )
}

export default NavBar
