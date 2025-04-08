import { type Metadata } from 'next/types'

import { searchParamsCache, serialize } from '~/libs/searchparams'
import AdminPostsPageView from '~/views/AdminPostsPageView'
import { type IPageWithSearchParamsProps } from '~/types'

export const metadata: Metadata = {
  title: 'Ideas space: Admin : Posts',
  description: 'Manage posts in the blog admin panel'
}

const AdminPostsPage = ({ searchParams }: IPageWithSearchParamsProps) => {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke in nested components suspense if any of the search params changed (used for filters).
  const searchParamsKey = serialize({ ...searchParams })

  return <AdminPostsPageView searchParamsKey={searchParamsKey} />
}

export default AdminPostsPage
