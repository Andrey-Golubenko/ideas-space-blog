'use client'

import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import NavLinks from '~/components/navigation/NavLinks'

const MobileNavMenu = ({ isLoggedIn, isMobile }: INavMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const navMenu = document.getElementById('nav-menu')
    const navMenuButton = document.getElementById('nav-menu-button')

    if (
      navMenu &&
      !navMenu.contains(target) &&
      navMenuButton &&
      !navMenuButton.contains(target)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleDocumentClick)
    } else {
      document.removeEventListener('click', handleDocumentClick)
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isOpen])

  const handleClick = () => {
    setIsOpen((prev) => {
      return !prev
    })
  }

  return (
    <div className="w-full">
      <Button
        id="nav-menu-button"
        className="ml-4 p-0"
        variant="outline"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </Button>

      <nav
        id="nav-menu"
        className={`fixed inset-y-0 right-0 z-10 h-screen w-[50%] transform rounded-none ${isOpen ? '-translate-x-0' : 'translate-x-full'} border-l-[5px] border-white transition-transform duration-500 ease-in-out`}
      >
        <ul className=" flex h-screen flex-col items-start space-y-10 bg-[#2C2C32] pl-10 pt-28 text-xl">
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
