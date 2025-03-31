import { Button, ButtonProps } from '~/components/ui/button'
import LinkWithReferrer from '~/components/shared/LinkWithReferrer'

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
  className,
  ...props
}: IAddNewItemButtonProps) => {
  return (
    <Button
      size="sm"
      asChild
      className={className}
      {...props}
    >
      <LinkWithReferrer
        path={path}
        label={label}
        withIcon={withIcon}
        className={className}
      />
    </Button>
  )
}

export default AddNewItemButton
