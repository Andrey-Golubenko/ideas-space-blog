import { useEffect, type Dispatch, type SetStateAction } from 'react'

import { Button } from '~/components/ui/button'

interface IMobileNavMenuButtonProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
const MobileNavMenuButton = ({
  isOpen,
  setIsOpen
}: IMobileNavMenuButtonProps) => {
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
    <Button
      id="nav-menu-button"
      className="ml-4 p-0"
      variant="outline"
      onClick={handleClick}
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.25"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.5 5.5l13 13M5.5 18.5L18.5 5.5"
          />
        </svg>
      ) : (
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
      )}
    </Button>
  )
}

export default MobileNavMenuButton
