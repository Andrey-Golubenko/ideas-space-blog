'use client'

import { Button } from '~/components/ui/button'

interface IAdminCardItemProps {
  label: string
  handleClick: () => void
}

const AdminCardItem = ({ label, handleClick }: IAdminCardItemProps) => {
  return (
    <div className="rouded-lg flex flex-row items-center justify-between border p-3 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      <Button onClick={handleClick}>Click to test</Button>
    </div>
  )
}

export default AdminCardItem
