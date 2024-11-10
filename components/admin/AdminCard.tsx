'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'

import { Card, CardHeader, CardContent } from '~/components/ui/card'
import WithRole from '~/components/hoc/WithRole'

import AdminCardItem from '~/components/admin/AdminCardItem'
import FormSuccess from '~/components/FormSuccess'

import CalendarDateRangePicker from '~/components/shared/CalendarDateRangePicker'
import { admin } from '~/actions/admin'
import { PATHS } from '~/utils/constants/constants'

const AdminCard = () => {
  return (
    <Card className="mb-12 flex min-h-[420px] w-full flex-col p-6">
      <section className="flex w-full space-y-2">
        <div className="flex w-full flex-row items-center justify-between space-y-2">
          <h2 className="flex text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
          </div>
        </div>
      </section>

      {/* <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-evenly space-y-4">
        <WithRole allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </WithRole>
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
      </CardContent> */}
    </Card>
  )
}

export default AdminCard
