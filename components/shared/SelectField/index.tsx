import { type FormHTMLAttributes } from 'react'
import { UserRole } from '@prisma/client'
import { type SelectProps } from '@radix-ui/react-select'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '~/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'

interface ISelectFieldProps {
  name: string
  label: string
  placeholder: string
  control: any
  isPending: boolean
}

const SelectField = ({
  name,
  label,
  placeholder,
  control,
  isPending,
  ...props
}: ISelectFieldProps &
  FormHTMLAttributes<HTMLSelectElement> &
  SelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <Select
              disabled={isPending}
              onValueChange={field.onChange}
              defaultValue={field.value}
              {...props}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                <SelectItem value={UserRole.USER}>User</SelectItem>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default SelectField
