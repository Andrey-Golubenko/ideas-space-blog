import { Metadata } from 'next'
import AdminUsersPageView from '~/views/AdminUsersPageView'

export const metadata: Metadata = {
  title: 'Admin : Users'
}

const AdminUsersPage = () => {
  return <AdminUsersPageView />
}

export default AdminUsersPage
