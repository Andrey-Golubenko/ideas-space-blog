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
  control: any
  isPending: boolean
}

const SwitchField = ({
  name,
  label,
  control,
  isPending
}: ISwitchFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>{label}</FormLabel>
              <FormDescription>
                Enabled two factor authentication for your account
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                disabled={isPending}
                checked={field.value}
                onCheckedChange={field.onChange}
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
