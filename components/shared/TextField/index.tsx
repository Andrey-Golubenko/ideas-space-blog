import { type FormHTMLAttributes } from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

interface ITextFieldProps {
  name: string
  type?: string
  label: string
  placeholder?: string
  control: any
  isPending: boolean
}

const TextField = ({
  name,
  label,
  placeholder,
  control,
  isPending,
  ...props
}: ITextFieldProps & FormHTMLAttributes<HTMLInputElement>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>

            <FormControl>
              <Input
                {...field}
                disabled={isPending}
                placeholder={placeholder}
                {...props}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default TextField
