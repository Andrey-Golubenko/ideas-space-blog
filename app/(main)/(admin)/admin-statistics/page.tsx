import { type Metadata } from 'next'

import AdminPageView from '~/views/AdminPageView'

export const metadata: Metadata = {
  title: 'Ideas space : Admin : statistics',
  description: 'Displaying users statistic in the blog admin panel'
}

const AdminPage = () => {
  return <AdminPageView />
}

export default AdminPage
