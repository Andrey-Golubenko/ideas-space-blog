'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from '~/components/ui/dialog'
import LoginForm from '~/components/auth/LoginForm'
import { PATHS } from '~/utils/constants'

interface ILoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton: React.FC<ILoginButtonProps> = ({
  children,
  mode = 'redirect',
  asChild
}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(PATHS.logIn)
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="border-none bg-transparent p-0 xs:w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%]">
          <DialogTitle hidden>Sign in</DialogTitle>
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
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
