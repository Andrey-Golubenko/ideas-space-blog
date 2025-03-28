import * as React from 'react'

import { cn } from '~/libs/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputAdornment?: React.ReactNode
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & { containerClassName?: string }
>(
  (
    { inputAdornment, containerClassName, className, type, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          'relative flex items-center gap-2',
          containerClassName
        )}
      >
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {inputAdornment}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
