import { Heading } from '~/components/ui/heading'
import { Separator } from '~/components/ui/separator'
import UsersTable from '~/components/admin/AdminUsers/UsersTable'
import { TDeserializedUser } from '~/types'

interface IAdminUsersProps {
  users: TDeserializedUser[]
}

const AdminUsers = ({ users }: IAdminUsersProps) => {
  const totalUsers = users?.length ?? 0

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${totalUsers})`}
          description="Manage users"
        />
      </div>

      <Separator />

      <UsersTable
        users={users}
        totalUsers={totalUsers}
      />
    </div>
  )
}

export default AdminUsers
