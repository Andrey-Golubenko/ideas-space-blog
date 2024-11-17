'use client'

import { Card } from '~/components/ui/card'
import AdminCardHeader from '~/components/admin/AdminCard/AdminCardHeader'
import UsersVisitsGraph from '~/components/admin/UsersVisitsGraph'

const AdminCard = () => {
  return (
    <Card className="mb-12 flex min-h-[420px] w-full flex-col p-2 xs:p-4 sm:p-6">
      <AdminCardHeader />

      <UsersVisitsGraph />
    </Card>
  )
}

export default AdminCard
