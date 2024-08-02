import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { Textarea } from '~/components/ui/textarea'

interface ITextAreaFieldProps {
  name: string
  type?: string
  label: string
  placeholder?: string
  control: any
  isPending: boolean
}

const TextAreaField: React.FC<ITextAreaFieldProps> = ({
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
              <Textarea
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

export default TextAreaField
