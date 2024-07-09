import { UserRole } from '@prisma/client'
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
  isPending
}: ISelectFieldProps) => {
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
