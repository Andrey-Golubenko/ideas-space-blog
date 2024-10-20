import { type Metadata } from 'next'
import SingleCategoryPageView from '~/views/SingleCategoryPageView'
import { fetchSingleCategoryById } from '~/services/categories'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'

interface ISingleCategoryPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params: { slug }
}: ISingleCategoryPageProps): Promise<Metadata> {
  const categoryName = toUpperCaseFirstChar(slug.split('-').join(' '))

  return {
    title: categoryName
  }
}

const SingleCategoryPage = ({
  params: { slug }
}: ISingleCategoryPageProps) => {
  return <SingleCategoryPageView categoryName={slug} />
}

export default SingleCategoryPage
