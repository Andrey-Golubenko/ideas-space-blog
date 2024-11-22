import AdminUsers from '~/components/admin/AdminUsers'
import { fetchAllUser } from '~/services/user'

const AdminUsersPageView = async () => {
  const users = (await fetchAllUser()) ?? []

  return <AdminUsers users={users} />
}

export default AdminUsersPageView
