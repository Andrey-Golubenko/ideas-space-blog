'use client'

import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { Button } from '~/components/ui/button'
import IconOpen from '~/public/icons/icon-open.svg'
import IconClose from '~/public/icons/icon-close.svg'

interface IMobileNavMenuButtonProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
const MobileNavMenuButton = ({
  isOpen,
  setIsOpen
}: IMobileNavMenuButtonProps) => {
  const [autoAnimateRef] = useAutoAnimate()

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
      ref={autoAnimateRef}
    >
      {isOpen ? (
        <IconOpen className="h-8 w-8" />
      ) : (
        <IconClose className="h-8 w-8" />
      )}
    </Button>
  )
}

export default MobileNavMenuButton
