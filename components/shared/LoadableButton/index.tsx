'use client'

import { type ButtonHTMLAttributes } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button, type ButtonProps } from '~/components/ui/button'

interface ILoadableButtonProps extends ButtonProps {
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
  isDisabled: boolean
  label: string
  buttonClassName?: string
}

const LoadableButton = ({
  type,
  isDisabled,
  label,
  buttonClassName,
  ...props
}: ILoadableButtonProps) => {
  return (
    <Button
      type={type}
      disabled={isDisabled}
      className={`${buttonClassName} w-full`}
      {...props}
    >
      {isDisabled ? (
        <div className="flex items-center">
          <ReloadIcon className="mr-4 h-5 w-5 animate-spin" />
          <span>Plese wait</span>
        </div>
      ) : (
        label
      )}
    </Button>
  )
}

export default LoadableButton
