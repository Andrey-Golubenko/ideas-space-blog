import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button, ButtonProps } from '~/components/ui/button'

interface IAddNewItemButtonProps
  extends ButtonProps,
    React.HTMLAttributes<HTMLButtonElement> {
  label: string
  path: string
  withIcon?: boolean
}

const AddNewItemButton = ({
  label,
  path,
  withIcon = false,
  ...props
}: IAddNewItemButtonProps) => {
  return (
    <Button
      size="sm"
      asChild
      {...props}
    >
      <Link href={path}>
        {withIcon && <Plus className="mr-2 h-4 w-4" />} {label}
      </Link>
    </Button>
  )
}

export default AddNewItemButton
