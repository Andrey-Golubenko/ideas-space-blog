'use client'

import { useEffect, useState } from 'react'

import { ScrollArea } from '~/components/ui/scroll-area'
import NavLinks from '~/components/navigation/NavLinks'
import MobileNavMenuButton from '~/components/navigation/MobileNavMenu/MobileNavMenuButton'
import LogoItem from '~/components/navigation/LogoItem'
import { Separator } from '~/components/ui/separator'
import MobileNavMenuHeader from '~/components/navigation/MobileNavMenu/MobileNavMenuHeader'
import AddNewItemButton from '~/components/shared/AddNewItemButton'
import { cn } from '~/libs/utils'
import { PATHS } from '~/utils/constants'

const MobileNavMenu = ({ user, isMobile, isAdmin }: INavMenuProps) => {
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
      <div className="grid grid-cols-3 items-center">
        <MobileNavMenuButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          buttonClassNames="col-start-1 justify-self-start"
        />

        <LogoItem logoClassNames="col-start-2 justify-self-center" />

        <AddNewItemButton
          label="Add Post"
          path={PATHS.blogNewPost}
          variant="outline"
          size="sm"
          className="col-start-3 ml-auto mr-4 w-8/12 rounded-full border border-[hsl(var(--logo-color))] bg-[hsl(var(--layout-button))] text-[hsl(var(--logo-color))] hover:bg-[hsl(var(--logo-color))] sm:py-2"
        />
      </div>

      <div
        className={cn(
          'fixed inset-0 z-[9999999999] h-full w-full bg-black/70 transition-opacity duration-500 ease-in-out',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      />

      <nav
        id="nav-menu"
        className={cn(
          'fixed inset-y-0 -right-1 z-[9999999999] flex h-full w-[65%] transform flex-col items-center rounded-none  border-l-[3px] border-white bg-[#2C2C32] shadow-[-2px_0_0_0_#000] transition-transform duration-500 ease-in-out',
          isOpen ? '-translate-x-0' : 'translate-x-full'
        )}
      >
        <MobileNavMenuHeader user={user} />

        <Separator className="w-full" />

        <ScrollArea className="h-screen">
          <ul className="flex h-screen w-[60vw] flex-col items-start space-y-10 pl-10 pt-10 text-[15px]">
            <NavLinks
              isLoggedIn={!!user}
              isMobile={isMobile}
              isAdmin={isAdmin}
            />
          </ul>
        </ScrollArea>
      </nav>
    </div>
  )
}

export default MobileNavMenu
