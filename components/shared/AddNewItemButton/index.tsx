import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'

interface IAddNewItemButtonProps {
  label: string
  path: string
}

const AddNewItemButton = ({ label, path }: IAddNewItemButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      asChild
      className="ml-auto border border-black/20 bg-blue-200 hover:bg-blue-200/70 sm:px-4 sm:py-2"
    >
      <Link href={path}>
        <Plus className="mr-2 h-4 w-4" /> {label}
      </Link>
    </Button>
  )
}

export default AddNewItemButton
