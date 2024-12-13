'use client'

import { useEffect, useState } from 'react'

import NavLinks from '~/components/navigation/NavLinks'
import MobileNavMenuButton from '~/components/navigation/MobileNavMenuButton'
import LogoItem from '~/components/navigation/LogoItem'

const MobileNavMenu = ({ isLoggedIn, isMobile }: INavMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
    }

    return () => {
      document.body.classList.remove('scroll-locked')
    }
  }, [isOpen])

  return (
    <div className="w-full">
      <div className="flex items-center">
        <MobileNavMenuButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="flex grow items-center justify-center">
          <LogoItem />
        </div>
      </div>

      <div
        className={`z-45 duration-400 fixed inset-0 h-screen w-screen bg-black/70 transition-opacity ease-in-out ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <nav
        id="nav-menu"
        className={`fixed inset-y-0 -right-1 z-50 h-screen w-[50%] transform rounded-none  border-l-[3px] border-white shadow-[-2px_0_0_0_#000] transition-transform duration-500 ease-in-out ${isOpen ? '-translate-x-[25%]' : 'translate-x-full'}`}
      >
        <ul className=" flex h-screen w-[60vw] flex-col items-start space-y-10 bg-[#2C2C32] pl-10 pt-28 text-[15px]">
          <NavLinks
            isLoggedIn={isLoggedIn}
            isMobile={isMobile}
          />
        </ul>
      </nav>
    </div>
  )
}

export default MobileNavMenu
