import { Heading } from '~/components/ui/heading'
import { Separator } from '~/components/ui/separator'
import UsersTable from '~/components/admin/AdminUsers/UsersTable'

const AdminUsersPageView = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading
          title="Users"
          description="Manage users"
        />
      </div>

      <Separator />

      <UsersTable />
    </div>
  )
}

export default AdminUsersPageView
