import { type Metadata } from 'next'
import SingleCategoryPageView from '~/views/SingleCategoryPageView'
import { toUpperCaseFirstChar } from '~/utils/helpers'

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
  return <SingleCategoryPageView categorySlug={slug} />
}

export default SingleCategoryPage
