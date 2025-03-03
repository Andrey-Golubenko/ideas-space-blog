import { type Metadata } from 'next'

import CategoriesPageView from '~/views/CategoriesPageView'

export const metadata: Metadata = {
  title: 'Ideas space : Blog Categories',
  description: 'Displaying blog categories',
  robots: { index: true, follow: true }
}

const CategoriesPage = () => {
  return <CategoriesPageView />
}

export default CategoriesPage
