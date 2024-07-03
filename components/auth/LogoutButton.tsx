'use client'

import { logOut } from '~/actions/logout'

interface ILogoutButtonProps {
  children?: React.ReactNode
}
const LogoutButton: React.FC<ILogoutButtonProps> = ({ children }) => {
  const handleClick = () => {
    logOut()
  }

  return (
    <span
      onClick={handleClick}
      onKeyUp={handleClick}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
    >
      {children}
    </span>
  )
}

export default LogoutButton
