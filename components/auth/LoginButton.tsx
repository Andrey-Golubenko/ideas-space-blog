'use client'

import { useRouter } from 'next/navigation'
import { PATHS } from '~/constants'

interface ILoginbuttonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton: React.FC<ILoginbuttonProps> = ({
  children,
  mode = 'redirect',
  asChild
}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(PATHS.logIn)
    console.log('LOGIN BUTTON CLICKED :>> ')
  }

  if (mode === 'modal') {
    return <span>TODO: Implement modal</span>
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

export default LoginButton
