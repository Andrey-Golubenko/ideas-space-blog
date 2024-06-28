import { useState } from 'react'
import Link from 'next/link'

import { PATHS } from '~/utils/constants/constants'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import PasswordIcon from '~/components/shared/passwordField/PasswordIcon'
import { Button } from '~/components/ui/button'

interface IPasswordFieldProps {
  control: any
  isPending: boolean
  withLink?: boolean
}

const PasswordField: React.FC<IPasswordFieldProps> = ({
  control,
  isPending,
  withLink
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleIconClick = () => setShowPassword((previous) => !previous)

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isPending}
              placeholder="*****"
              type={showPassword ? 'text' : 'password'}
              inputAdornment={
                <PasswordIcon
                  showPassword={showPassword}
                  iconClick={handleIconClick}
                />
              }
            />
          </FormControl>
          {withLink && (
            <Button
              variant="link"
              size="sm"
              asChild
              className="px-0 font-normal"
            >
              <Link href={PATHS.resetPassword}>Forgot password?</Link>
            </Button>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PasswordField
