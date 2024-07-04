'use client'

import { UserRole } from '@prisma/client'
import { toast } from 'sonner'

import FormSuccess from '~/components/FormSuccess'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import RoleGate from '~/components/auth/RoleGate'
import AdminCardItem from '~/components/auth/AdminCardItem'
import { PATHS } from '~/utils/constants/constants'
import { admin } from '~/actions/admin'

const AdminCard = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success)
      }

      if (data.error) {
        toast.error(data.error)
      }
    })
  }

  const onApiRouteClick = () => {
    fetch(PATHS.apiAdmin).then((response) => {
      if (response.ok) {
        toast.success('Allowed API Route!')
      } else {
        toast.error('Forbidden API Route!')
      }
    })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <AdminCardItem
          label="Admin-only API Route"
          handleClick={onApiRouteClick}
        />
        <AdminCardItem
          label="Admin-only Server Action"
          handleClick={onServerActionClick}
        />
      </CardContent>
    </Card>
  )
}

export default AdminCard
