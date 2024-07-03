import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

interface IEmailFieldProps {
  control: any
  isPending: boolean
}

const EmailField: React.FC<IEmailFieldProps> = ({
  control,
  isPending
}) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={isPending}
                placeholder="email@example.com"
                type="email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default EmailField
