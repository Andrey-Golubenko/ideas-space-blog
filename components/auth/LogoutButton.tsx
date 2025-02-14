'use client'

import { ButtonHTMLAttributes } from 'react'
import { logOut } from '~/actions/logout'

interface ILogoutButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

const LogoutButton: React.FC<ILogoutButtonProps> = ({
  children,
  ...props
}) => {
  const handleClick = () => {
    logOut()
  }

  return (
    <span
      onClick={handleClick}
      onKeyUp={handleClick}
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </span>
  )
}

export default LogoutButton
