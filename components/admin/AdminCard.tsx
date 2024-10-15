'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'

import { Card, CardHeader, CardContent } from '~/components/ui/card'
import RoleGate from '~/components/auth/RoleGate'

import AdminCardItem from '~/components/admin/AdminCardItem'
import FormSuccess from '~/components/FormSuccess'

import { PATHS } from '~/utils/constants/constants'
import { admin } from '~/actions/admin'

const AdminCard = () => {
  const router = useRouter()

  const handleOnCreateCategory = () => {
    router.push(PATHS.newCategory)
  }

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success, {
          richColors: true,
          closeButton: true
        })
      }

      if (data.error) {
        toast.error(data.error, {
          richColors: true,
          closeButton: true
        })
      }
    })
  }

  const onApiRouteClick = () => {
    fetch(PATHS.apiAdmin).then((response) => {
      if (response.ok) {
        toast.success('Allowed API Route!', {
          richColors: true,
          closeButton: true
        })
      } else {
        toast.error('Forbidden API Route!', {
          richColors: true,
          closeButton: true
        })
      }
    })
  }

  return (
    <Card className="mb-12 flex min-h-[420px] flex-col">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-evenly space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <AdminCardItem
          label="Admin-only API Route"
          buttonLabel="Click to test"
          handleClick={onApiRouteClick}
        />
        <AdminCardItem
          label="Admin-only Server Action"
          buttonLabel="Click to test"
          handleClick={onServerActionClick}
        />
        <AdminCardItem
          label="Create a new post category"
          buttonLabel="Click to create"
          handleClick={handleOnCreateCategory}
        />
      </CardContent>
    </Card>
  )
}

export default AdminCard
