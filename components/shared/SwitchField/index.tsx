import { type FormHTMLAttributes } from 'react'
import { type SwitchProps } from '@radix-ui/react-switch'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '~/components/ui/form'
import { Switch } from '~/components/ui/switch'

interface ISwitchFieldProps {
  name: string
  label: string
  description: string
  control: any
  isPending: boolean
}

const SwitchField = ({
  name,
  label,
  description,
  control,
  isPending,
  ...props
}: ISwitchFieldProps &
  FormHTMLAttributes<HTMLInputElement> &
  SwitchProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>

            <FormControl>
              <Switch
                disabled={isPending}
                checked={field.value}
                onCheckedChange={field.onChange}
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

export default SwitchField
