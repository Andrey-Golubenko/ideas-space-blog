import { type FormHTMLAttributes } from 'react'

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { MultiSelect } from '~/components/ui/multi-select'
import { IMultiSelectProps } from '~/types/types'

interface IMultiSelectFieldProps {
  name: string
  label: string
  placeholder: string
  control: any
  options: IMultiSelectProps['options']
  isPending: boolean
}

const MultiSelectField = ({
  name,
  label,
  placeholder,
  control,
  options,
  isPending,
  ...props
}: IMultiSelectFieldProps &
  FormHTMLAttributes<HTMLSelectElement> &
  Omit<IMultiSelectProps, 'onValueChange'>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <MultiSelect
              options={options}
              disabled={isPending}
              onValueChange={field.onChange}
              fieldValue={field.value}
              placeholder={placeholder}
              {...props}
            />

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default MultiSelectField
