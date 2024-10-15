'use client'

import { Button } from '~/components/ui/button'

interface IAdminCardItemProps {
  label: string
  buttonLabel: string
  handleClick: () => void
}

const AdminCardItem = ({
  label,
  buttonLabel,
  handleClick
}: IAdminCardItemProps) => {
  return (
    <div className="rouded-lg flex flex-row items-center justify-between border p-3 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      <Button onClick={handleClick}>{buttonLabel}</Button>
    </div>
  )
}

export default AdminCardItem
