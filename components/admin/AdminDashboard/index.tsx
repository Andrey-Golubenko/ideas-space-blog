'use client'

import { Card } from '~/components/ui/card'
import AdminDashboardHeader from '~/components/admin/AdminDashboard/AdminDashboardHeader'
import UsersVisitsGraph from '~/components/admin/AdminDashboard/UsersVisitsGraph'
import UsersAgentsGraph from '~/components/admin/AdminDashboard/UsersAgentsGraph'

const AdminDashboard = () => {
  return (
    <Card className="mb-12 flex min-h-[420px] w-full flex-col gap-y-6 p-2 xs:p-4 sm:p-6">
      <AdminDashboardHeader />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-7">
        <UsersVisitsGraph />

        <UsersAgentsGraph />
      </div>
    </Card>
  )
}

export default AdminDashboard
