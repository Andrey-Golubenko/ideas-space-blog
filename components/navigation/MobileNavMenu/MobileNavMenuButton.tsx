'use client'

import {
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction
} from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { Button } from '~/components/ui/button'
import IconOpen from '~/public/icons/icon-open.svg'
import IconClose from '~/public/icons/icon-close.svg'

interface IMobileNavMenuButtonProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  buttonClassNames?: string
}
const MobileNavMenuButton = ({
  isOpen,
  setIsOpen,
  buttonClassNames
}: IMobileNavMenuButtonProps) => {
  const [autoAnimateRef] = useAutoAnimate()

  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const navMenu = document.getElementById('nav-menu')
      const navMenuButton = document.getElementById('nav-menu-button')
      const userAvatar = document.getElementById('user-avatar')

      const targetNameLink = target.tagName === 'A'
      const targetNameSVG = target.tagName === 'path'
      const targetNameHeading = target.tagName === 'H1'

      if (userAvatar && userAvatar.contains(target)) {
        return
      }

      if (
        navMenu &&
        navMenu.contains(target) &&
        targetNameLink &&
        (targetNameLink || targetNameSVG || targetNameHeading)
      ) {
        setIsOpen(false)
        return
      }

      if (
        navMenu &&
        !navMenu.contains(target) &&
        navMenuButton &&
        !navMenuButton.contains(target)
      ) {
        setIsOpen(false)
      }
    },
    [setIsOpen]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleDocumentClick)
    } else {
      document.removeEventListener('click', handleDocumentClick)
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isOpen, handleDocumentClick])

  const handleClick = () => {
    setIsOpen((prev) => {
      return !prev
    })
  }
  return (
    <Button
      id="nav-menu-button"
      className={`${buttonClassNames ?? ''} ml-4 p-0`}
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
