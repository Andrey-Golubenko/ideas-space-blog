import { type Metadata } from 'next'

import { searchParamsCache, serialize } from '~/libs/searchparams'
import AdminCategoriesPageView from '~/views/AdminCategoriesPageView'
import { type IPageWithSearchParamsProps } from '~/types'

export const metadata: Metadata = {
  title: 'Ideas space : Admin : Categories',
  description: 'Manage categories in the blog admin panel'
}

const AdminCategoriesPage = ({
  searchParams
}: IPageWithSearchParamsProps) => {
  searchParamsCache.parse(searchParams)

  const searchParamsKey = serialize({ ...searchParams })

  return <AdminCategoriesPageView searchParamsKey={searchParamsKey} />
}

export default AdminCategoriesPage
