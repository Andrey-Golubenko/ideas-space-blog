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

const TextField: React.FC<ITextFieldProps> = ({
  name,
  label,
  placeholder,
  control,
  isPending
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={isPending}
                placeholder={placeholder}
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
